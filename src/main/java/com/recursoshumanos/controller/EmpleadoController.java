package com.recursoshumanos.controller;

import com.recursoshumanos.annotation.Description;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.recursoshumanos.annotation.DescriptionClass;
import org.springframework.security.access.prepost.PreAuthorize;

@DescriptionClass(value = "Empleado")
@Controller
public class EmpleadoController {

    /**
     * Método que carga la pagina de alta empleado.
     *
     * @return "altaEmpleado"
     */
    @RequestMapping(value = "/empleado/alta")
    @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or hasRole('ROLE_EMPLEADO'))")
    @Description(value = "Visualizar Pantalla", permission = "ROLE_EMPLEADO", description = "Permite visualizar los empleados registrados en la base de datos")
    public String cargar() {
        return "altaEmpleado";
    }

}
