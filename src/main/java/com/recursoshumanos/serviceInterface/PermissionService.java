package com.recursoshumanos.serviceInterface;

import com.recursoshumanos.entity.Role;

public interface PermissionService {
	
	String grantOrRevokePermission(Role role, String permisoBuscar);

}
