package com.recursoshumanos.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.recursoshumanos.annotation.DescriptionClass;

@DescriptionClass(value = "Empleado")
@Controller
public class EmpleadoController {

    /**
     * Método que carga la pagina de alta empleado.
     *
     * @return "altaEmpleado"
     */
    @RequestMapping(value = "/empleado/alta")
    public String cargar() {
        return "altaEmpleado";
    }

}
