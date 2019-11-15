//package com.recursoshumanos.controller;
//
//import com.recursoshumanos.annotation.Description;
//import javax.mail.MessagingException;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.dao.DataIntegrityViolationException;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.validation.BindingResult;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.ModelAttribute;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//
//import com.recursoshumanos.annotation.DescriptionClass;
//import com.recursoshumanos.entity.SistemaArmas;
//import com.recursoshumanos.service.SistemaArmasServiceImpl;
//import org.springframework.security.access.prepost.PreAuthorize;
//
//@DescriptionClass(value = "Sistemas de Armas")
//@Controller
//public class SistemaArmasController {
//
//    @Autowired
//    private SistemaArmasServiceImpl sistemaArmasService;
//
//    @ModelAttribute("sistemaArmas")
//    public SistemaArmas sistemaArmas() {
//        return new SistemaArmas();
//    }
//
//    /**
//     * Carga la página sistemaArmas con todos los Sistema de Armas que se
//     * encuentran registrados
//     *
//     * @param model Contiene todos los Sistemas de Armas registrados
//     * @return "sistemaArmas"
//     * @throws MessagingException
//     */
//    @RequestMapping("/sistemaArmas")
//    @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or hasRole('ROLE_SISTEMA_ARMAS'))")
//    @Description(value = "Visualizar Pantalla", permission = "ROLE_SISTEMA_ARMAS", description = "Permite visualizar los Sistemas de Armas registrados en la base de datos")
//    public String registration(Model model) throws MessagingException {
//        model.addAttribute("sistemasArmas", sistemaArmasService.findAll());
//        return "sistemaArmas";
//    }
//
//    /**
//     * Registra un Sistema de Armas
//     *
//     * @param model Contiene todos los Sistemas de Armas registrados
//     * @param sistemaArmas El Sistema de Armas a registrar
//     * @param result Realiza la validación de que no exista el Sistema de Armas
//     * registrado
//     * @param idSistemaArmas
//     * @return "sistemaArmas"
//     */
//    @RequestMapping(value = "/sistemaArmas", method = RequestMethod.POST)
//    @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or hasRole('ROLE_SISTEMA_ARMAS_SAVE'))")
//    @Description(value = "Registrar", permission = "ROLE_SISTEMA_ARMAS_SAVE", description = "Permite registrar un Sistema de Armas en la base de datos. El permiso Visualizar Pantalla debe estar habilitado")
//    public String register(Model model, @ModelAttribute("sistemaArmas") @Validated SistemaArmas sistemaArmas,
//            BindingResult result, @RequestParam("id") Integer idSistemaArmas) {
//        if (idSistemaArmas != null) { // Es un modificar
//            sistemaArmasService.save(sistemaArmas);
//            return "redirect:/sistemaArmas";
//        } else { // Es uno nuevo
//            sistemaArmas.setVigente(true);
//            sistemaArmasService.save(sistemaArmas);
//            return "redirect:/sistemaArmas";
//        }
//    }
//
//    /**
//     * Borra un Sistema de Armas
//     *
//     * @param id El id del Sistema de Armas a borrar
//     * @return "sistemaArmas"
//     */
//    @RequestMapping("/sistemaArmas/eliminar/{id}")
//    @PreAuthorize("isAuthenticated() and (hasRole('ROLE_ADMIN') or hasRole('ROLE_SISTEMA_ARMAS_DELETE'))")
//    @Description(value = "Eliminar", permission = "ROLE_SISTEMA_ARMAS_DELETE", description = "Permite eliminar un Sistema de Armas de la base de datos. El permiso Visualizar Pantalla debe estar habilitado")
//    public String delete(@PathVariable Integer id) {
//        try {
//            sistemaArmasService.delete(id);
//        } catch (DataIntegrityViolationException ex) {
//            if (ex.getCause().getClass().getName() == "org.hibernate.exception.ConstraintViolationException") {
//                SistemaArmas saToDelete = sistemaArmasService.findById(id);
//                saToDelete.setVigente(false);
//                sistemaArmasService.save(saToDelete);
//            }
//        }
//        return "redirect:/sistemaArmas";
//    }
//}
