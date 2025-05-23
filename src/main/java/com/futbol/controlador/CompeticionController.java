package com.futbol.controlador;

import com.futbol.entidades.Competicion;
import com.futbol.servicio.CompeticionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/competiciones")
@CrossOrigin(origins = "*")
public class CompeticionController {

    @Autowired
    private CompeticionService competicionService;

    @GetMapping
    public List<Competicion> listarTodos() {
        return competicionService.obtenerTodos();
    }

    @PostMapping
    public Competicion guardar(@RequestBody Competicion competicion) {
        return competicionService.guardar(competicion);
    }

    @GetMapping("/{id}")
    public Competicion buscarPorId(@PathVariable Long id) {
        return competicionService.buscarPorId(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Competicion actualizar(@PathVariable Long id, @RequestBody Competicion actualizado) {
        actualizado.setId(id);
        return competicionService.guardar(actualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        competicionService.eliminar(id);
    }
}
