package com.recursoshumanos.serviceInterface;
import com.recursoshumanos.entity.Empleado;
import java.util.List;

public interface EmpleadoService {
    
	public List<Empleado> findAll();
	
	public void save(List<Empleado> empleado);

	public void save(Empleado empleado);
        
        public double calcularSalarioEfectivo();
        
        public double calcularSalarioContratado();
        
}
