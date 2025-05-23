package com.futbol.controlador;

import com.futbol.entidades.Jugador;
import com.futbol.servicio.JugadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jugadores")
@CrossOrigin(origins = "*")
public class JugadorController {

    @Autowired
    private JugadorService jugadorService;

    @GetMapping
    public List<Jugador> listarTodos() {
        return jugadorService.obtenerTodos();
    }

    @PostMapping
    public Jugador guardar(@RequestBody Jugador jugador) {
        return jugadorService.guardar(jugador);
    }

    @GetMapping("/{id}")
    public Jugador buscarPorId(@PathVariable Long id) {
        return jugadorService.buscarPorId(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Jugador actualizar(@PathVariable Long id, @RequestBody Jugador actualizado) {
        actualizado.setId(id);
        return jugadorService.guardar(actualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        jugadorService.eliminar(id);
    }
}
