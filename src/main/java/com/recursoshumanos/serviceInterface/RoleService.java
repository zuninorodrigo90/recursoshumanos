package com.recursoshumanos.serviceInterface;

import java.util.List;

import com.recursoshumanos.entity.Role;

public interface RoleService {

	/**
	 * M�todo que retorna todos los Roles registrados
	 * @return Lista de los Roles registrados
	 */
	public List<Role> findAll();

	/**
	 * M�todo que guarda un rol en la BD
	 * @param role el role a guardar
	 */
	public void save(Role role);

	/**
	 * M�todo que borra un rol de la base de datos
	 * @param id El id del rol a borrar
	 */
	public void delete(Integer id);

	/**
	 * M�todo que busca un rol por el nombre
	 * @param name el nombre del rol a buscar
	 * @return el rol encontrado con ese nombre
	 */
	public Role findByName(String name);

	/**
	 * M�todo que buscar un rol por su id
	 * @param id El id del rol a buscar
	 * @return El rol buscado
	 */
	public Role findById(Integer id);
	
	Boolean grantOrRevokePermission(Role role, String permisoBuscar);
}
