/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.recursoshumanos.controller;

import com.recursoshumanos.entity.User;
import com.recursoshumanos.service.UserServiceImpl;
import com.recursoshumanos.annotation.Description;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import com.recursoshumanos.annotation.DescriptionClass;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author Rodrigo
 */
@Controller
@DescriptionClass(value = "Usuario")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    @ModelAttribute("usuario")
    public User user() {
        return new User();
    }

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

    //**Metodo Alta de usuario
    @RequestMapping(value = "/usuario", method = RequestMethod.POST)
    @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or hasRole('ROLE_USUARIO_SAVE'))")
    @Description(value = "Registrar", permission = "ROLE_ADMIN", description = "Permite crear un nuevo usuario y guardarlo en la base de datos")
    public String register(Model model, @ModelAttribute("User") User user,
            BindingResult result, @RequestParam("id") Integer idUser) {
        if (idUser != null) {
            userService.save(user);
            return "redirect:/usuario";
        } else {
            user.setEnabled(true);

            userService.save(user);
            return "redirect:/usuario";
        }
    }

    /**
     * metodo eliminar usuario
     *
     * @RequestMapping("/usuario/eliminar/{id}")
     * @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN')")
     * @Description(value = "Eliminar", permission = "ROLE_ADMIN", description =
     * " Elimina un usuario del sistema") public String delete(@PathVariable
     * Integer id) { try { userService.delete(id); } catch
     * (DataIntegrityViolationException ex) { if
     * (ex.getCause().getClass().getName() ==
     * "org.hibernate.exception.ConstraintViolationException") { User saToDelete
     * = userService.findById(id); saToDelete.setEnabled(false);
     * userService.save(saToDelete); } } return "redirect:/usuario"; }
     */
    /**
     * @RequestMapping(value = "/sistemaArmas", method = RequestMethod.POST)
     * @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or
     * hasRole('ROLE_SISTEMA_ARMAS_SAVE'))")
     * @Description(value = "Registrar", permission = "ROLE_SISTEMA_ARMAS_SAVE",
     * description = "Permite registrar un Sistema de Armas en la base de datos.
     * El permiso Visualizar Pantalla debe estar habilitado") public String
     * register(Model model, @ModelAttribute("sistemaArmas") @Validated
     * SistemaArmas sistemaArmas, BindingResult result, @RequestParam("id")
     * Integer idSistemaArmas) { if (idSistemaArmas != null) { // Es un
     * modificar sistemaArmasService.save(sistemaArmas); return
     * "redirect:/sistemaArmas"; } else { // Es uno nuevo
     * sistemaArmas.setVigente(true); sistemaArmasService.save(sistemaArmas);
     * return "redirect:/sistemaArmas"; } }
     */
}
