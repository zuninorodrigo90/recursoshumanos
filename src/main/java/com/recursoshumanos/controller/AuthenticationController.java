package com.recursoshumanos.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.recursoshumanos.annotation.DescriptionClass;
import com.recursoshumanos.entity.Permission;
import com.recursoshumanos.entity.Role;
import com.recursoshumanos.entity.User;
import com.recursoshumanos.service.UserServiceImpl;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

@DescriptionClass(value = "Inicio Sesión")
@Controller
public class AuthenticationController {

    @Autowired
    private UserServiceImpl userService;

    /**
     * Método que retorna la pagina del inicio.
     *
     * @param principal
     * @return "home"
     */
    @RequestMapping(value = "/home")
    public String home(Principal principal) {
        @SuppressWarnings("unchecked")
        Collection<SimpleGrantedAuthority> oldAuthorities = (Collection<SimpleGrantedAuthority>) SecurityContextHolder
                .getContext().getAuthentication().getAuthorities();
//        if (oldAuthorities.isEmpty()) {
            User user = userService.findByName(principal.getName());
            List<SimpleGrantedAuthority> updatedAuthorities = new ArrayList<>();
            for (Role role : user.getRoles()) {
                for (Permission permission : role.getPermissions()) {
                    SimpleGrantedAuthority authority = new SimpleGrantedAuthority(permission.getAuthority());
                    updatedAuthorities.add(authority);
                }
            }
            updatedAuthorities.addAll(oldAuthorities);
            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
                    SecurityContextHolder.getContext().getAuthentication().getPrincipal(),
                    SecurityContextHolder.getContext().getAuthentication().getCredentials(), updatedAuthorities));
//        }
        return "home";
    }

    /**
     * Método que carga la pagina de login.
     *
     * @return "login"
     */
    @RequestMapping(value = "/login")
    public String login() {
        return "login";
    }

    /**
     * Método que retorna la pagina de error 403
     *
     * @return "403"
     */
    @RequestMapping(value = "/403")
    public String accesoDenegado() {
        return "403";
    }

    /**
     * Método que identifica si hay algún error en el inicio de sesión y lo
     * asigna al model de la página.
     *
     * @param model
     * @param error
     * @return "login"
     */
    @RequestMapping(value = "/{error}", method = RequestMethod.GET)
    public final String displayLoginform(Model model, @PathVariable final String error) {
        if (error.equals("badCredentials")) {
            model.addAttribute("error", "Usuario o contraseña inválidos");
        } else {
            model.addAttribute("error", "");
        }
        return "login";
    }

    /**
     * Método que retorna la pagina de login.
     *
     * @return "login"
     */
    @RequestMapping(value = "/")
    public String main() {
        return "login";
    }
}
