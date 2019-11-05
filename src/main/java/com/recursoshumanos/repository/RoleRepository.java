package com.recursoshumanos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recursoshumanos.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    public Role findByName(String name);
}
