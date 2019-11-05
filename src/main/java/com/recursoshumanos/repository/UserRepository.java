package com.recursoshumanos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recursoshumanos.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    public User findByName(String name);

    public List<User> findByNameStartingWith(String name);

}
