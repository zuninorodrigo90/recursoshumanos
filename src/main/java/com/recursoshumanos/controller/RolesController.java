package com.recursoshumanos.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.recursoshumanos.annotation.Description;
import com.recursoshumanos.annotation.DescriptionClass;
import com.recursoshumanos.entity.HistorialUserRole;
import com.recursoshumanos.entity.Permission;
import com.recursoshumanos.entity.Role;
import com.recursoshumanos.entity.User;
import com.recursoshumanos.service.HistorialUserRoleServiceImpl;
import com.recursoshumanos.service.RoleServiceImpl;
import com.recursoshumanos.service.UserServiceImpl;

@DescriptionClass(value = "Roles")
@RequestMapping("/administracion")
@Controller
public class RolesController {

    @Autowired
    private RoleServiceImpl roleService;

    @Autowired
    private UserServiceImpl userService;
    
    @Autowired
    private HistorialUserRoleServiceImpl historialUserRoleService;

    @ModelAttribute("role")
    public Role role() {
        return new Role();
    }

    private List<Role> roles;

    /**
     * Carga la página roles con todos los Roles que se encuentran registrados
     *
     * @param model Contiene todos los Roles registrados
     * @return "roles"
     */
    @RequestMapping("/roles")
    @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or hasRole('ROLE_ROLES'))")
    @Description(value = "Visualizar Pantalla", permission = "ROLE_ROLES", description = "Permite visualizar los roles registrados en la base de datos")
    public String registration(Model model) {
        roles = roleService.findAll();
        model.addAttribute("roles", roles);
        return "roles";
    }

    /**
     * Registra un Role
     *
     * @param model Contiene todos los roles registrados
     * @param Role El rol a registrar
     * @param result Realiza la validación de que no exista el role registrado
     * @return "roles"
     */
    @RequestMapping(value = "/roles", method = RequestMethod.POST)
    @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or hasRole('ROLE_ROLES_SAVE'))")
    @Description(value = "Registrar", permission = "ROLE_ROLE_SAVE", description = "Permite registrar un rol en la base de datos. El permiso Visualizar Pantalla debe estar habilitado")
    public String register(Model model, @ModelAttribute("role") Role role, BindingResult result) {
        try {
            if (role.getId() != null) { // Es un modificar
                role.setPermissions(roleService.findById(role.getId()).getPermissions());
                roleService.save(role);
            } else { // Es uno nuevo
                role.setPermissions(new HashSet<Permission>());
                roleService.save(role);
                Permission userPermission = new Permission();
                userPermission.setAuthority("ROLE_USER");
                userPermission.setRole(role);
                role.getPermissions().add(userPermission);
                roleService.save(role);
            }
            return "redirect:/administracion/roles";
        } catch (Exception ex) {
            return "redirect:/administracion/roles";
        }
    }

    /**
     * Borra un Rol
     *
     * @param id El id del rol a borrar
     * @return "roles"
     */
    @RequestMapping("/roles/eliminar/{id}")
    @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or hasRole('ROLE_ROLES_DELETE'))")
    @Description(value = "Eliminar", permission = "ROLE_ROLE_DELETE", description = "Permite eliminar un rol de la base de datos. El permiso Visualizar Pantalla debe estar habilitado ")
    public @ResponseBody
    String delete(@PathVariable Integer id) {
        try {
            roleService.delete(id);
            return "redirect:/administracion/roles";
        } catch (DataIntegrityViolationException ex) {
            return "";
        }
    }

    @Description(value = "Asignar roles", permission = "ROLE_PER_USER", description = "Permite asignar roles a los usuarios")
    @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or hasRole('ROLE_PER_USER') or hasRole('ROLE_PER_USER'))")
    @RequestMapping("asignarRoles")
    public String loadAssingRoles(Model model) {
        model.addAttribute("users", userService.findAll());
        model.addAttribute("roles", roleService.findAll());
        return "asignarRoles";
    }

    @RequestMapping(value = "/asignarRoles/findRoles/{id}", method = RequestMethod.POST)
    public @ResponseBody
    Set<Role> findeRoles(@PathVariable Integer id) {
        try {
            User roles = userService.findById(id);

            for (Role i : roles.getRoles()) {
                i.setPermissions(null);
            }

            return roles.getRoles();

        } catch (Exception ex) {
            return null;
        }
    }

    @RequestMapping(value = "/asignarRoles/assingRole", method = RequestMethod.POST)
    public @ResponseBody
    Integer assingRole(@RequestBody User user, Principal principal) {
        Integer i = 0;
        try {
            User userToAssing = userService.findById(user.getId());
            User userActuator = userService.findByName(principal.getName());
            for (Role aux : user.getRoles()) {
                Role roleToAssing = roleService.findById(aux.getId());
                String accion = "Asignado";
                if (!userToAssing.getRoles().add(roleToAssing)) {
                    i = 1;
                    accion = "Quitado";
                    userToAssing.getRoles().remove(roleToAssing);
                }
                userService.saveWithHistorial(userToAssing, userActuator, 1, roleToAssing, accion);
            }
            return i;
        } catch (Exception ex) {
            return 2;
        }
    }

    @RequestMapping(value = "/asignarRoles/showHistorial", method = RequestMethod.POST)
    public @ResponseBody
    List<HistorialUserRole> showHistorial(@RequestBody Integer idUser, Principal principal) {
        try {
            User user = userService.findById(idUser);
            return historialUserRoleService.findByUserModified(user);
        } catch (Exception ex) {
            return new ArrayList<>();
        }
    }

}
