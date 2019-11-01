package com.recursoshumanos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recursoshumanos.entity.SistemaArmas;

public interface SistemaArmasRepository extends JpaRepository<SistemaArmas, Integer> {

	public SistemaArmas findByCode(String code);

	public List<SistemaArmas> findByVigente(Boolean vigente);

}
