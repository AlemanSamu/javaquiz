package com.futbol.repositorio;

import com.futbol.entidades.Competicion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompeticionRepository extends JpaRepository<Competicion, Long> {
}
