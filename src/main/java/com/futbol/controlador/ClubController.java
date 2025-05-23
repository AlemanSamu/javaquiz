package com.futbol.controlador;

import com.futbol.entidades.Club;
import com.futbol.servicio.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clubes")
@CrossOrigin(origins = "*")
public class ClubController {

    @Autowired
    private ClubService clubService;

    @GetMapping
    public List<Club> listarTodos() {
        return clubService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Club> buscarPorId(@PathVariable Long id) {
        return clubService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Club guardar(@RequestBody Club club) {
        return clubService.guardar(club);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Club> actualizar(@PathVariable Long id, @RequestBody Club actualizado) {
        return clubService.buscarPorId(id).map(club -> {
            club.setNombre(actualizado.getNombre());
            club.setEntrenador(actualizado.getEntrenador());
            club.setAsociacion(actualizado.getAsociacion());
            club.setJugadores(actualizado.getJugadores());
            club.setCompeticiones(actualizado.getCompeticiones());
            return ResponseEntity.ok(clubService.guardar(club));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        clubService.eliminar(id);
        return ResponseEntity.ok().build();
    }
}
