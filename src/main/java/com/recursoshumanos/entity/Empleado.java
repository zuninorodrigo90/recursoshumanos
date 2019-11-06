package com.recursoshumanos.entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "empleado")
public class Empleado implements Serializable {

    @Id
    @GeneratedValue
    private Integer id;
    private String apellido;
    private String nombre;
    private String tel�fono;
    private String direcci�n;
    private Boolean vigente;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTel�fono() {
        return tel�fono;
    }

    public void setTel�fono(String tel�fono) {
        this.tel�fono = tel�fono;
    }

    public String getDirecci�n() {
        return direcci�n;
    }

    public void setDirecci�n(String direcci�n) {
        this.direcci�n = direcci�n;
    }

    public Boolean getVigente() {
        return vigente;
    }

    public void setVigente(Boolean vigente) {
        this.vigente = vigente;
    }
}
