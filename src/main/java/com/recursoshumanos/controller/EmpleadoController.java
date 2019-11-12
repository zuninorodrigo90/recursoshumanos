package com.recursoshumanos.controller;

import com.recursoshumanos.annotation.Description;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.recursoshumanos.annotation.DescriptionClass;
import com.recursoshumanos.entity.Empleado;
import com.recursoshumanos.service.EmpleadoServiceImpl;
import com.recursoshumanos.serviceInterface.EmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@DescriptionClass(value = "Empleado")
@Controller
public class EmpleadoController {
    
    @Autowired
    private EmpleadoServiceImpl empleadoService;
    
    @RequestMapping(value = "/empleado")
    @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or hasRole('ROLE_EMPLEADO'))")
    @Description(value = "Visualizar Pantalla", permission = "ROLE_EMPLEADO", description = "Permite visualizar los empleados registrados en la base de datos")
    public String cargar() {
        return "empleado";
    }
    
    //ALTA EMPLEADO
    @RequestMapping(value = "/empleado", method = RequestMethod.POST)
    @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or hasRole('ROLE_SISTEMA_ARMAS_SAVE'))")
    @Description(value = "Registrar", permission = "ROLE_ADMIN", description = "Permite registrar un empleado en la base de datos. El permiso Visualizar Pantalla debe estar habilitado")
    public String register(Model model, @ModelAttribute("Empleado") Empleado empleado,
            BindingResult result, @RequestParam("id") Integer idEmpleado) {
        if (idEmpleado != null) { // Para modificar
            empleadoService.save(empleado);
            return "redirect:/empleado";
        } else { // Es uno nuevo
            empleado.setVigente(true);
            empleadoService.save(empleado);
            return "redirect:/empleado";
        }
    }

}
