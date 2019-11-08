/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.recursoshumanos.controller;

import com.recursoshumanos.annotation.Description;
import com.recursoshumanos.annotation.DescriptionClass;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Rodrigo
 */
@Controller
@DescriptionClass(value = "Usuario")
public class UserController {

    /**
     * Método que carga la pagina de alta usuario.
     *
     * @return "altaUsuario"
     */
    @RequestMapping(value = "/usuario")
    @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or hasRole('ROLE_USUARIO'))")
    @Description(value = "Visualizar Pantalla", permission = "ROLE_USUARIO", description = "Permite visualizar los usuario registrados en la base de datos")
    public String cargar() {
        return "usuario";
    }

}
