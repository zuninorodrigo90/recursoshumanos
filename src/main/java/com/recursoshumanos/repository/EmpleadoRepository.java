package com.recursoshumanos.repository;
import com.recursoshumanos.entity.Empleado;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpleadoRepository extends JpaRepository<Empleado, Integer> {
    
    public Empleado findByName(String name);

    public List<Empleado> findByNameStartingWith(String name);
    
}
