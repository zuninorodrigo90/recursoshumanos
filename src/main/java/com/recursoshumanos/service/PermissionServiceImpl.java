package com.recursoshumanos.service;

import java.util.Iterator;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.recursoshumanos.entity.Permission;
import com.recursoshumanos.entity.Role;
import com.recursoshumanos.serviceInterface.PermissionService;

@Service
public class PermissionServiceImpl implements PermissionService {

	
	@Override
	public String grantOrRevokePermission(Role role, String permisoBuscar) {
		Set<Permission> s=role.getPermissions();
		// El grupo puede no tener ningun permiso, si o si hay que agregar.
		if(s!=null && !s.isEmpty())
		{
			Iterator<Permission> i=s.iterator();
			boolean encontradoPermiso=false;
			Permission pp=null;
			while(i.hasNext() && !encontradoPermiso)
			{
				pp=i.next();
				if(pp.getAuthority().equals(permisoBuscar))
				{
					encontradoPermiso=true;
				}
			}
//			if(encontradoPermiso && pp!=null)
//			{
//				this.removerPermiso(role, pp);
				return "false";
//			}
//			else
//			{
//				this.agregarPermiso(role, permisoBuscar);
//				return "true";
//			}
		}
		else
		{
//			if(s==null)
//				s=new HashSet<Permission>();
//			g.setPermissions(s);
//			this.agregarPermiso(role, permisoBuscar);
			return "true";
		}
	}
	
//	private void agregarPermiso(Role g,String permission)
//	{
//		// Hay que otorgar el permiso!!!
//		// Eso es grabando en la base de datos un permiso.
//		Permission permisoNuevo=new Permission();
//		permisoNuevo.setAuthority(permission);
//		g.getPermissions().add(permisoNuevo);
//		groupRepository.save(g);
//	}
//	private void removerPermiso(Role g,Permission permission)
//	{
//		// Si tiene el permiso, lo tengo que sacar.
//		g.getPermissions().remove(permission);
//		groupRepository.save(g);
//	}


}
