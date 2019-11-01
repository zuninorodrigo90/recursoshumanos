package com.recursoshumanos.serviceInterface;

import java.util.List;

import com.recursoshumanos.entity.SistemaArmas;

public interface SistemaArmasService {

	/**
	 * M�todo que busca todos los Sistemas de Armas
	 * @return Lista de los Sistemas de Armas encontrados
	 */
	public List<SistemaArmas> findAll();

	/**
	 * M�todo que guarda un Sistema de Armas
	 * @param sistemaArmas El Sistema de Armas a guardar
	 */
	public void save(SistemaArmas sistemaArmas);

	/**
	 * M�todo que borra un Sistema de Armas dado su id
	 * @param id El id del Sistema de Armas a borrar
	 */
	public void delete(Integer id);

	/**
	 * M�todo que busca un Sistema de Armas por su id
	 * @param id El id del Sistema de Armas a buscar
	 * @return El Sistema de Armas encontrado
	 */
	public SistemaArmas findById(int id);

	/**
	 * Busca un Sistema de Armas con el c�digo pasado como par�metro
	 * @param code El c�digo del Sistema de Armas a buscar
	 * @return true si existe y false en caso contrario
	 */
	public boolean existsCode(String code);
}
