package com.futbol.servicio;

import com.futbol.entidades.Club;
import com.futbol.repositorio.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClubService {

    @Autowired
    private ClubRepository clubRepository;

    public List<Club> obtenerTodos() {
        return clubRepository.findAll();
    }

    public Club guardar(Club club) {
        return clubRepository.save(club);
    }

    public Optional<Club> buscarPorId(Long id) {
        return clubRepository.findById(id);
    }

    public void eliminar(Long id) {
        clubRepository.deleteById(id);
    }
}
