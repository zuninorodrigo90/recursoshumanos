package com.recursoshumanos.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "historial_usuario_role")
public class HistorialUserRole {

	@Id
	@GeneratedValue
	private Integer id;
	@ManyToOne
	@JoinColumn(name = "role_id")
	private Role role;
	@ManyToOne
	@JoinColumn(name = "user_modified_id")
	private User userModified;
	@ManyToOne
	@JoinColumn(name = "user_actuator_id")
	private User userActuator;
	private Date date;
	@Column(columnDefinition = "varchar(10)")
	private String accion;

	public HistorialUserRole() {
		// TODO Auto-generated constructor stub
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public User getUserModified() {
		return userModified;
	}

	public void setUserModified(User userModified) {
		this.userModified = userModified;
	}

	public User getUserActuator() {
		return userActuator;
	}

	public void setUserActuator(User userActuator) {
		this.userActuator = userActuator;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getAccion() {
		return accion;
	}

	public void setAccion(String accion) {
		this.accion = accion;
	}
	
}
