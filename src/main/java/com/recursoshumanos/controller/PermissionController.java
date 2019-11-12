package com.recursoshumanos.controller;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.StringTokenizer;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;
import com.recursoshumanos.annotation.ClassName;
import com.recursoshumanos.annotation.Description;
import com.recursoshumanos.annotation.DescriptionClass;
import com.recursoshumanos.entity.Permission;
import com.recursoshumanos.entity.Role;
import com.recursoshumanos.service.RoleServiceImpl;
import com.recursoshumanos.view.PermissionView;

@Controller
@RequestMapping("/administracion")
@DescriptionClass(value = "Administrar Permisos")
public class PermissionController {

    public PermissionController() {
        // TODO Auto-generated constructor stub
    }

    static Logger log = Logger.getLogger(PermissionController.class);
    private RequestMappingHandlerMapping handlerMapping;

    @Autowired
    private RoleServiceImpl permissionService;

    @Autowired
    public void setRequestHandlerMapping(RequestMappingHandlerMapping handlerMapping) {
        this.handlerMapping = handlerMapping;
    }

    @Description(value = "Modificar permisos", permission = "ROLE_PERMISOS_MODIFICAR", description = "Permite modificar los permisos de acceso de todo el sistema.")
    @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or hasRole('ROLE_PERMISOS_MODIFICAR'))")
    @RequestMapping(value = "/permisos")
    public String listarPermisos(Model model) {

        // Por reflection, voy a obtener todos los controllers, todos
        // los mappings, y mandarlos a la vista. Despues un javascript
        // va a invocar, para cada uno de los permisos, un metodo para pedir
        // el permiso especifico y poner un grafiquito de tilde o de equis
        Map<ClassName, List<PermissionView>> controllers = new LinkedHashMap<ClassName, List<PermissionView>>();
        Map<RequestMappingInfo, HandlerMethod> p = this.handlerMapping.getHandlerMethods();
        for (Map.Entry<RequestMappingInfo, HandlerMethod> entry : p.entrySet()) {
            // Ahora para cada metodo averiguo el nombre del controller, del
            // metodo y el tipo de request.
            String controllerName = entry.getValue().getMethod().getDeclaringClass().getName();
            ClassName controllerMethods = new ClassName();
            controllerMethods.setClassName(controllerName);
            if (!controllers.containsKey(controllerMethods)) {
                // Si en el mapa Controller ya tengo una clave cuyo nombre
                // es el nombre de esta clase, pido la lista que el mapa
                // controllers
                // tiene y agrego un item.
                List<PermissionView> metodos = new LinkedList<PermissionView>();
                // Pero en vez del nombre del Controller, quiero el valor
                // de la anotacion DescripcionClase.
                DescriptionClass controller = entry.getValue().getMethod().getDeclaringClass()
                        .getAnnotation(DescriptionClass.class);
                if (controller != null) {
                    controllerMethods.setDescriptionClass(controller.value());
                } else {
                    controllerMethods.setDescriptionClass(controllerName);
                }
                controllers.put(controllerMethods, metodos);
            }
            // Si el metodo que encontre tiene la anotacion @Description,
            // escribo su valor y conservo el nombre del rol.
            Description d = entry.getValue().getMethod().getAnnotation(Description.class);
            if (d != null) {
                PermissionView permiso = new PermissionView();
                permiso.setDescripcionPermiso(d.description());
                permiso.setNombrePermiso(d.value());
                permiso.setRole(d.permission());
                controllers.get(controllerMethods).add(permiso);
            }
        }
        model.addAttribute("controllers", controllers);
        // Ahora vamos a buscar los grupos que se hayan creado.
        List<Role> roles = permissionService.findAll();
        model.addAttribute("roles", roles);
        return "permisos";
    }

    @RequestMapping(value = "/informar")
    @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or hasRole('ROLE_PERMISOS_MODIFICAR'))")
    public @ResponseBody
    boolean informarPermiso(@RequestParam("permiso") String permiso) {
        // Informa si el permiso que me dan existe.
        // Ahora consulto la base de datos.
        try {
            log.trace("Me llamaron con el permiso " + permiso);
            StringTokenizer t = new StringTokenizer(permiso, "-");
            String id = t.nextToken();
            log.trace("Tengo el id? " + id);
            String permisoBuscar = t.nextToken();
            log.trace("Me llamaron, tengo que buscar el permiso " + permisoBuscar + " del grupo " + id);
            // Primero busco el grupo
            Role grupo = permissionService.findById(Integer.parseInt(id));
            if (grupo != null) {
                log.trace("Encontre el grupo, averiguo si tiene el permiso");
                Set<Permission> s = grupo.getPermissions();
                for (Permission pp : s) {
                    if (pp.getAuthority().equals(permisoBuscar)) {
                        return true;
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    @RequestMapping(value = "/modificar")
    @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or hasRole('ROLE_PERMISOS_MODIFICAR'))")
    public @ResponseBody
    String modificarPermiso(@RequestParam("permiso") String permiso) {
        // Informa si el permiso que me dan existe.
        // Ahora consulto la base de datos.
        try {
            StringTokenizer t = new StringTokenizer(permiso, "-");
            String id = t.nextToken();
            String permisoBuscar = t.nextToken();
            Role grupo = permissionService.findById(Integer.parseInt(id));
            if (grupo != null) {
                Boolean resultado = permissionService.grantOrRevokePermission(grupo, permisoBuscar);
                return resultado.toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "error";
    }
}
