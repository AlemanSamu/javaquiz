package com.futbol.servicio;

import com.futbol.entidades.Entrenador;
import com.futbol.repositorio.EntrenadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntrenadorService {

    @Autowired
    private EntrenadorRepository entrenadorRepository;

    public List<Entrenador> obtenerTodos() {
        return entrenadorRepository.findAll();
    }

    public Entrenador guardar(Entrenador entrenador) {
        return entrenadorRepository.save(entrenador);
    }

    public Optional<Entrenador> buscarPorId(Long id) {
        return entrenadorRepository.findById(id);
    }

    public void eliminar(Long id) {
        entrenadorRepository.deleteById(id);
    }
}
