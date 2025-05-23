package com.futbol.entidades;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "asociaciones")
public class Asociacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    private String nombre;
    
    @NotBlank
    private String pais;
    
    private String presidente;
    
    private String siglas;
    
    @OneToMany(mappedBy = "asociacion", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("asociacion-clubes")
    private List<Club> clubes;
    
    // Constructores
    public Asociacion() {}
    
    public Asociacion(Long id, String nombre, String pais, String presidente, String siglas) {
        this.id = id;
        this.nombre = nombre;
        this.pais = pais;
        this.presidente = presidente;
        this.siglas = siglas;
    }
    
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
    
    public String getPais() {
        return pais;
    }
    
    public void setPais(String pais) {
        this.pais = pais;
    }
    
    public String getPresidente() {
        return presidente;
    }
    
    public void setPresidente(String presidente) {
        this.presidente = presidente;
    }
    
    public String getSiglas() {
        return siglas;
    }
    
    public void setSiglas(String siglas) {
        this.siglas = siglas;
    }
    
    public List<Club> getClubes() {
        return clubes;
    }
    
    public void setClubes(List<Club> clubes) {
        this.clubes = clubes;
    }
}
