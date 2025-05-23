package com.futbol.servicio;

import com.futbol.entidades.Competicion;
import com.futbol.repositorio.CompeticionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompeticionService {

    @Autowired
    private CompeticionRepository competicionRepository;

    public List<Competicion> obtenerTodos() {
        return competicionRepository.findAll();
    }

    public Competicion guardar(Competicion competicion) {
        return competicionRepository.save(competicion);
    }

    public Optional<Competicion> buscarPorId(Long id) {
        return competicionRepository.findById(id);
    }

    public void eliminar(Long id) {
        competicionRepository.deleteById(id);
    }
}
