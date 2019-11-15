package com.recursoshumanos.service;

import com.recursoshumanos.entity.Categoria;
import com.recursoshumanos.entity.Empleado;
import com.recursoshumanos.repository.EmpleadoRepository;
import com.recursoshumanos.serviceInterface.CategoriaService;
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

        public double calcularSalarioEfectivo(Empleado empleadoEfectivo) {
            
            Integer anhos = empleadoEfectivo.getAntiguedad();
            Double salario = empleadoEfectivo.getSalario();
            
            salario = (empleadoEfectivo.getBasico() * (anhos * 0.5));
            if (empleadoEfectivo.getReparto()!= null) {
                salario = salario * 0.8;
                return salario;
            }
                return salario;
        }
        
        public double calcularSalarioContratado(Empleado empleadoContratado) {
                      
            Double salario = empleadoContratado.getSalario();
            
                salario = empleadoContratado.getHoras() * CategoriaService.findByCodigo(empleadoContratado.getCategoria().getCodigo());
                return salario;
            }

   
            
    
}
        
        
        

