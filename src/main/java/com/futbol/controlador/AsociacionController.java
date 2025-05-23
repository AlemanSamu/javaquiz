package com.futbol.controlador;

import com.futbol.entidades.Asociacion;
import com.futbol.servicio.AsociacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asociaciones")
@CrossOrigin(origins = "*")
public class AsociacionController {

    @Autowired
    private AsociacionService asociacionService;

    @GetMapping
    public List<Asociacion> listarTodos() {
        return asociacionService.obtenerTodos();
    }

    @PostMapping
    public Asociacion guardar(@RequestBody Asociacion asociacion) {
        return asociacionService.guardar(asociacion);
    }

    @GetMapping("/{id}")
    public Asociacion buscarPorId(@PathVariable Long id) {
        return asociacionService.buscarPorId(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Asociacion actualizar(@PathVariable Long id, @RequestBody Asociacion actualizado) {
        actualizado.setId(id);
        return asociacionService.guardar(actualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        asociacionService.eliminar(id);
    }
}
