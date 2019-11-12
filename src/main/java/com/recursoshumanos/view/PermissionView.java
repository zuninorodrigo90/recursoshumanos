package com.recursoshumanos.view;

/**
 * Contiene el nombre y la descripcion del permiso que hay que mostrar en la
 * vista, corresponde al permiso obtenido de leer la Annotation en el Controller
 *
 */
public class PermissionView {

    private String nombrePermiso;
    private String descripcionPermiso;
    private String role;

    public String getNombrePermiso() {
        return nombrePermiso;
    }

    public void setNombrePermiso(String nombrePermiso) {
        this.nombrePermiso = nombrePermiso;
    }

    public String getDescripcionPermiso() {
        return descripcionPermiso;
    }

    public void setDescripcionPermiso(String descripcionPermiso) {
        this.descripcionPermiso = descripcionPermiso;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
