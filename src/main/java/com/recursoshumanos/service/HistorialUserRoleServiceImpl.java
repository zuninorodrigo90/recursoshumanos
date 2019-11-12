package com.recursoshumanos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recursoshumanos.entity.HistorialUserRole;
import com.recursoshumanos.entity.User;
import com.recursoshumanos.repository.HistorialUserRoleRepository;

@Service
public class HistorialUserRoleServiceImpl {

    @Autowired
    private HistorialUserRoleRepository repository;

    public List<HistorialUserRole> findAll() {
        return repository.findAll();
    }

    public HistorialUserRole findById(Integer id) {
        return repository.findById(id);
    }

    public void save(HistorialUserRole historial) {
        repository.save(historial);
    }

    public List<HistorialUserRole> findByUserModified(User u) {
        return repository.findByUserModified(u);
    }
}
