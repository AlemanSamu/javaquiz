package com.futbol.entidades;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "clubes")
public class Club {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String nombre;
    
    @ManyToOne
    @JoinColumn(name = "asociacion_id")
    @JsonBackReference("asociacion-clubes")
    private Asociacion asociacion;
    
    @OneToOne
    private Entrenador entrenador;
    
    @OneToMany
    @JoinColumn(name = "id_club")
    @JsonIgnore // Evita referencias circulares con jugadores
    private List<Jugador> jugadores = new ArrayList<>();
    
    @ManyToMany
    @JoinTable(
        name = "club_competicion",
        joinColumns = @JoinColumn(name = "club_id"),
        inverseJoinColumns = @JoinColumn(name = "competicion_id")
    )
    @JsonIgnore // Evita referencias circulares con competiciones
    private List<Competicion> competiciones = new ArrayList<>();
    
    // Getters y Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public Asociacion getAsociacion() {
        return asociacion;
    }
    
    public void setAsociacion(Asociacion asociacion) {
        this.asociacion = asociacion;
    }
    
    public Entrenador getEntrenador() {
        return entrenador;
    }
    
    public void setEntrenador(Entrenador entrenador) {
        this.entrenador = entrenador;
    }
    
    public List<Jugador> getJugadores() {
        return jugadores;
    }
    
    public void setJugadores(List<Jugador> jugadores) {
        this.jugadores = jugadores;
    }
    
    public List<Competicion> getCompeticiones() {
        return competiciones;
    }
    
    public void setCompeticiones(List<Competicion> competiciones) {
        this.competiciones = competiciones;
    }
    
    // Métodos helper para relación ManyToMany con Competicion
    public void addCompeticion(Competicion competicion) {
        this.competiciones.add(competicion);
        competicion.getClubes().add(this);
    }
    
    public void removeCompeticion(Competicion competicion) {
        this.competiciones.remove(competicion);
        competicion.getClubes().remove(this);
    }
}
