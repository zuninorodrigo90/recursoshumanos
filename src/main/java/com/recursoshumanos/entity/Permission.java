package com.recursoshumanos.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;

/**
 * Permiso en la base de datos. Corresponde a los permisos efectivamente
 * otorgados al usuario. Para asignar un permiso, se creara una entidad de esta
 * clase para almacenar en la base de datos.
 *
 *
 */
@Entity
@Table(name = "permission")
public class Permission implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    private String authority;

    @ManyToOne
    @JoinColumn(name = "role_id")
    @JsonIgnore
    private Role role;

    /**
     * @return the authority
     */
    public String getAuthority() {
        return authority;
    }

    /**
     * @param authority the authority to set
     */
    public void setAuthority(String authority) {
        this.authority = authority;
    }

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
