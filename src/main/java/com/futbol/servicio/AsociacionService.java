package com.futbol.servicio;

import com.futbol.entidades.Asociacion;
import com.futbol.repositorio.AsociacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AsociacionService {

    @Autowired
    private AsociacionRepository asociacionRepository;

    public List<Asociacion> obtenerTodos() {
        return asociacionRepository.findAll();
    }

    public Asociacion guardar(Asociacion asociacion) {
        return asociacionRepository.save(asociacion);
    }

    public Optional<Asociacion> buscarPorId(Long id) {
        return asociacionRepository.findById(id);
    }

    public void eliminar(Long id) {
        asociacionRepository.deleteById(id);
    }
}
