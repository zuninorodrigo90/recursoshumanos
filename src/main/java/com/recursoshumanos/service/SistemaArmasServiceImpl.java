package com.recursoshumanos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recursoshumanos.entity.SistemaArmas;
import com.recursoshumanos.repository.SistemaArmasRepository;
import com.recursoshumanos.serviceInterface.SistemaArmasService;

@Service
public class SistemaArmasServiceImpl implements SistemaArmasService {

	@Autowired
	private SistemaArmasRepository repository;

	@Override
	public void save(SistemaArmas sistemaArmas) {
		repository.save(sistemaArmas);
	}

	@Override
	public List<SistemaArmas> findAll() {
		return repository.findAll();
	}

	@Override
	public void delete(Integer id) {
		repository.delete(id);
	}

	@Override
	public SistemaArmas findById(int id) {
		return repository.findOne(id);
	}

	@Override
	public boolean existsCode(String code) {
		return repository.findByCode(code) != null;
	}

	public List<SistemaArmas> findByVigente(Boolean vigente) {
		return repository.findByVigente(vigente);
	}
}
