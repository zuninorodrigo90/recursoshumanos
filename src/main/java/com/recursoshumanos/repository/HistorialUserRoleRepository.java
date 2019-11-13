package com.recursoshumanos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recursoshumanos.entity.HistorialUserRole;
import com.recursoshumanos.entity.User;

public interface HistorialUserRoleRepository extends JpaRepository<HistorialUserRole, Integer> {

    public HistorialUserRole findById(Integer id);

    public List<HistorialUserRole> findByUserModified(User u);

}
