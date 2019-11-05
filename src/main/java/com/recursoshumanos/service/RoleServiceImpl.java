package com.recursoshumanos.service;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recursoshumanos.entity.Permission;
import com.recursoshumanos.entity.Role;
import com.recursoshumanos.repository.RoleRepository;
import com.recursoshumanos.serviceInterface.RoleService;

@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleRepository repository;

	@Override
	public List<Role> findAll() {
		return repository.findAll();
	}

	@Override
	public void save(Role role) {
		repository.save(role);
	}

	@Transactional
	@Override
	public void delete(Integer id) {
		repository.delete(id);
	}

	@Override
	public Role findByName(String name) {
		return repository.findByName(name);
	}

	@Override
	public Role findById(Integer id) {
		return repository.findOne(id);
	}

	@Override
	public Boolean grantOrRevokePermission(Role role, String permisoBuscar) {
		Set<Permission> s = role.getPermissions();
		// El grupo puede no tener ningun permiso, si o si hay que agregar.
		if (s != null && !s.isEmpty()) {
			Iterator<Permission> i = s.iterator();
			boolean encontradoPermiso = false;
			Permission pp = null;
			while (i.hasNext() && !encontradoPermiso) {
				pp = i.next();
				if (pp.getAuthority().equals(permisoBuscar)) {
					encontradoPermiso = true;
				}
			}
			if (encontradoPermiso && pp != null) {
				this.removerPermiso(role, pp);
				return false;
			} else {
				this.agregarPermiso(role, permisoBuscar);
				return true;
			}
		} else {
			if (s == null)
				s = new HashSet<Permission>();
			role.setPermissions(s);
			this.agregarPermiso(role, permisoBuscar);
			return true;
		}
	}

	private void agregarPermiso(Role g, String permission) {
		// Hay que otorgar el permiso!!!
		// Eso es grabando en la base de datos un permiso.
		Permission permisoNuevo = new Permission();
		permisoNuevo.setAuthority(permission);
		permisoNuevo.setRole(g);
		g.getPermissions().add(permisoNuevo);
		repository.save(g);
	}

	private void removerPermiso(Role g, Permission permission) {
		// Si tiene el permiso, lo tengo que sacar.
		g.getPermissions().remove(permission);
		repository.save(g);
	}
}
