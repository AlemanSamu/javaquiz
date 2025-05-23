package com.futbol.repositorio;

import com.futbol.entidades.Entrenador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntrenadorRepository extends JpaRepository<Entrenador, Long> {
}
