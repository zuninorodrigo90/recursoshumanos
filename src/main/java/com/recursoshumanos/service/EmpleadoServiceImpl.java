package com.recursoshumanos.service;

import com.recursoshumanos.entity.Empleado;
import com.recursoshumanos.repository.EmpleadoRepository;
import com.recursoshumanos.serviceInterface.EmpleadoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmpleadoServiceImpl implements EmpleadoService {
    
        @Autowired
	private EmpleadoRepository repository;

        @Override
        public List<Empleado> findAll() {
            return repository.findAll();
        }

        @Override
        public void save(List<Empleado> empleados) {
            repository.save(empleados);
        }

        @Override
        public void save(Empleado empleado) {
            repository.save(empleado);
    
    }
        
}
