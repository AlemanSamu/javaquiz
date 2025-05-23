package com.futbol.servicio;

import com.futbol.entidades.Jugador;
import com.futbol.repositorio.JugadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JugadorService {

    @Autowired
    private JugadorRepository jugadorRepository;

    public List<Jugador> obtenerTodos() {
        return jugadorRepository.findAll();
    }

    public Jugador guardar(Jugador jugador) {
        return jugadorRepository.save(jugador);
    }

    public Optional<Jugador> buscarPorId(Long id) {
        return jugadorRepository.findById(id);
    }

    public void eliminar(Long id) {
        jugadorRepository.deleteById(id);
    }
}
