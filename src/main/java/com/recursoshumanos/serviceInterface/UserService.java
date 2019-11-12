package com.recursoshumanos.serviceInterface;

import com.recursoshumanos.entity.Role;
import java.util.List;

import com.recursoshumanos.entity.User;

public interface UserService {

	/**
	 * M�todo que retorna todos los Usuarios registrados
	 * 
	 * @return Lista de los Usuarios registrados
	 */
	public List<User> findAll();

	/**
	 * M�todo que guarda o actualiza una lista de usuarios
	 * 
	 * @param users
	 *            Los usuarios a guardar o actualizar
	 */
	public void save(List<User> users);

	/**
	 * M�todo que busca un usuario por su id
	 * 
	 * @param id
	 * @return El usuario encontrado
	 */
	public User findById(Integer id);

	/**
	 * M�todo que busca a un usuario por su nombre
	 * 
	 * @param name
	 *            El nombre del usuario a buscar
	 * @return El usuario encontrado
	 */
	public User findByName(String name);

	/**
	 * M�todo que busca a los usuarios que comiencen con ese nombre
	 * 
	 * @param name
	 *            El nombre de los usuarios a buscar
	 * @return Lista de usuarios que comiencen con ese nombre
	 */
	public List<User> findByNameStartingWith(String name);
	
	public void save(User user);
        
        public void saveWithHistorial(User userModified, User userActuator, int email, Role role, String accion);
	
}
