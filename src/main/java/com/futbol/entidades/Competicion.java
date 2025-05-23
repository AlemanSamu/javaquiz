package com.futbol.entidades;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "competiciones")
public class Competicion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nombre;

    @PositiveOrZero
    private int montoPremio;

    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    @ManyToMany(mappedBy = "competiciones")
    @JsonManagedReference
    private List<Club> clubes = new ArrayList<>();

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

    public int getMontoPremio() {
        return montoPremio;
    }

    public void setMontoPremio(int montoPremio) {
        this.montoPremio = montoPremio;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public List<Club> getClubes() {
        return clubes;
    }

    public void setClubes(List<Club> clubes) {
        this.clubes = clubes;
    }
}
