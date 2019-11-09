package com.recursoshumanos.controller;

import com.recursoshumanos.annotation.Description;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.recursoshumanos.annotation.DescriptionClass;
import javax.mail.MessagingException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;

@DescriptionClass(value = "Empleado")
@Controller
public class EmpleadoController {

    /**
     * Método que carga la pagina de alta empleado.
     *
     * @return "altaEmpleado"
     */
//    @RequestMapping(value = "/empleado/alta")
//    public String cargar() {
//        return "altaEmpleado";
//    }
    
    /**
     * Carga la página sistemaArmas con todos los Sistema de Armas que se
     * encuentran registrados
     *
     * @param model Contiene todos los Sistemas de Armas registrados
     * @return "sistemaArmas"
     * @throws MessagingException
     */
//    @RequestMapping("/empleado")
//    @PreAuthorize("isAuthenticated()")
//    @Description(value = "Visualizar Pantalla", permission = "ROLE_EMPLEADO", description = "Permite visualizar el Listado de Empleados registrados en la base de datos")
//    public String registration(Model model) throws MessagingException {
////        model.addAttribute("empleado", empleadoService.findAll());
//        return "empleado";
//    }
    
    @RequestMapping(value = "/empleado")
    public String cargar() {
        return "empleado";
    }
}
