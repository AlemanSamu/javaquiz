package com.futbol.controlador;

import com.futbol.entidades.Entrenador;
import com.futbol.servicio.EntrenadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entrenadores")
@CrossOrigin(origins = "*")
public class EntrenadorController {

    @Autowired
    private EntrenadorService entrenadorService;

    @GetMapping
    public List<Entrenador> listarTodos() {
        return entrenadorService.obtenerTodos();
    }

    @PostMapping
    public Entrenador guardar(@RequestBody Entrenador entrenador) {
        return entrenadorService.guardar(entrenador);
    }

    @GetMapping("/{id}")
    public Entrenador buscarPorId(@PathVariable Long id) {
        return entrenadorService.buscarPorId(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Entrenador actualizar(@PathVariable Long id, @RequestBody Entrenador actualizado) {
        actualizado.setId(id);
        return entrenadorService.guardar(actualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        entrenadorService.eliminar(id);
    }
}
