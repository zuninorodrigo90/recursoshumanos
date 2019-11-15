package com.recursoshumanos.service;

import com.recursoshumanos.entity.Categoria;
import com.recursoshumanos.repository.CategoriaRepository;
import com.recursoshumanos.serviceInterface.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaServiceImpl implements CategoriaService {
    
    @Autowired
    private CategoriaRepository repository;

    @Override
    public Categoria findByCodigo(Integer codigo) {
       return repository.findOne(codigo);
    }
}
