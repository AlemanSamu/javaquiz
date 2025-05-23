// entrenadores.js
const apiEntrenadores = "http://localhost:8105/api/entrenadores";
let entrenadorEditandoId = null;

function cargarVistaEntrenadores() {
  const contenedor = document.getElementById("entrenadores-content");

  contenedor.innerHTML = `
    <h3>Formulario - Nuevo Entrenador</h3>
    <form id="form-entrenador" class="mb-4">
      <div class="row g-2">
        <div class="col-md-3">
          <label class="form-label">Nombre</label>
          <input type="text" id="entrenador-nombre" class="form-control" required>
        </div>
        <div class="col-md-3">
          <label class="form-label">Apellido</label>
          <input type="text" id="entrenador-apellido" class="form-control" required>
        </div>
        <div class="col-md-2">
          <label class="form-label">Edad</label>
          <input type="number" id="entrenador-edad" class="form-control" required>
        </div>
        <div class="col-md-4">
          <label class="form-label">Nacionalidad</label>
          <input type="text" id="entrenador-nacionalidad" class="form-control" required>
        </div>
      </div>
      <button type="submit" class="btn btn-success mt-3" id="btn-guardar-entrenador">Guardar Entrenador</button>
    </form>

    <h3>Lista de Entrenadores</h3>
    <table class="table table-striped" id="tabla-entrenadores">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Edad</th>
          <th>Nacionalidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  listarEntrenadores();

  document.getElementById("form-entrenador").addEventListener("submit", (e) => {
    e.preventDefault();
    guardarEntrenador();
  });
}

function listarEntrenadores() {
  fetch(apiEntrenadores)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#tabla-entrenadores tbody");
      tbody.innerHTML = "";
      data.forEach(entrenador => {
        tbody.innerHTML += `
          <tr>
            <td>${entrenador.id}</td>
            <td>${entrenador.nombre}</td>
            <td>${entrenador.apellido}</td>
            <td>${entrenador.edad}</td>
            <td>${entrenador.nacionalidad}</td>
            <td>
              <button class="btn btn-warning btn-sm me-1" onclick="cargarEntrenadorParaEditar(${entrenador.id})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="eliminarEntrenador(${entrenador.id})">Eliminar</button>
            </td>
          </tr>
        `;
      });
    });
}

function guardarEntrenador() {
  const nombre = document.getElementById("entrenador-nombre").value;
  const apellido = document.getElementById("entrenador-apellido").value;
  const edad = parseInt(document.getElementById("entrenador-edad").value);
  const nacionalidad = document.getElementById("entrenador-nacionalidad").value;

  const entrenador = { nombre, apellido, edad, nacionalidad };

  let url = apiEntrenadores;
  let metodo = "POST";

  if (entrenadorEditandoId !== null) {
    url += `/${entrenadorEditandoId}`;
    metodo = "PUT";
    entrenador.id = entrenadorEditandoId;
  }

  fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entrenador)
  }).then(() => {
    document.getElementById("form-entrenador").reset();
    entrenadorEditandoId = null;
    const boton = document.getElementById("btn-guardar-entrenador");
    boton.textContent = "Guardar Entrenador";
    boton.classList.remove("btn-warning");
    boton.classList.add("btn-success");
    listarEntrenadores();
  });
}

function cargarEntrenadorParaEditar(id) {
  fetch(`${apiEntrenadores}/${id}`)
    .then(res => res.json())
    .then(entrenador => {
      document.getElementById("entrenador-nombre").value = entrenador.nombre;
      document.getElementById("entrenador-apellido").value = entrenador.apellido;
      document.getElementById("entrenador-edad").value = entrenador.edad;
      document.getElementById("entrenador-nacionalidad").value = entrenador.nacionalidad;

      entrenadorEditandoId = entrenador.id;

      const boton = document.getElementById("btn-guardar-entrenador");
      boton.textContent = "Actualizar Entrenador";
      boton.classList.remove("btn-success");
      boton.classList.add("btn-warning");
    });
}

function eliminarEntrenador(id) {
  if (confirm("¿Deseas eliminar este entrenador?")) {
    fetch(`${apiEntrenadores}/${id}`, {
      method: "DELETE"
    }).then(listarEntrenadores);
  }
}
