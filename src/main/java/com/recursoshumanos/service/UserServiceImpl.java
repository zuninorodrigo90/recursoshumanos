package com.recursoshumanos.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.recursoshumanos.entity.User;
import com.recursoshumanos.repository.UserRepository;
import com.recursoshumanos.serviceInterface.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository repository;

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
        @Override
	public void delete(Integer id) {
		repository.delete(id);
	}
}
