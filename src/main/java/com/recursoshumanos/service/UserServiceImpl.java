package com.recursoshumanos.service;

import com.recursoshumanos.entity.HistorialUserRole;
import com.recursoshumanos.entity.Role;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.recursoshumanos.entity.User;
import com.recursoshumanos.repository.HistorialUserRoleRepository;
import com.recursoshumanos.repository.UserRepository;
import com.recursoshumanos.serviceInterface.UserService;
import java.util.Date;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;
    
    @Autowired
    private HistorialUserRoleRepository historialRepository;

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public void save(List<User> users) {
        repository.save(users);
    }

    @Override
    public User findById(Integer id) {
        return repository.findOne(id);
    }

    @Override
    public User findByName(String name) {
        return repository.findByName(name);
    }

    @Override
    public List<User> findByNameStartingWith(String name) {
        return repository.findByNameStartingWith(name);
    }

    @Override
    public void save(User user) {
        repository.save(user);
    }

    @Transactional
    @Override
    public void saveWithHistorial(User userModified, User userActuator, int email, Role role, String accion) {
        HistorialUserRole historial = new HistorialUserRole();
        historial.setUserModified(userModified);
        historial.setUserActuator(userActuator);
        historial.setDate(new Date());
        historial.setRole(role);
        historial.setAccion(accion);
        repository.save(userModified);
        historialRepository.save(historial);
    }
}
