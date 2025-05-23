// clubes.js
const apiClubes = "http://localhost:8105/api/clubes";
let clubEditandoId = null;

function cargarVistaClubes() {
  const contenedor = document.getElementById("clubes-content");

  contenedor.innerHTML = `
    <h3>Formulario - Nuevo Club</h3>
    <form id="form-club" class="mb-4">
      <div class="row g-2">
        <div class="col-md-4">
          <label class="form-label">Nombre</label>
          <input type="text" id="club-nombre" class="form-control" required>
        </div>
        <div class="col-md-4">
          <label class="form-label">Entrenador</label>
          <select id="club-entrenador" class="form-control" required></select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Asociación</label>
          <select id="club-asociacion" class="form-control" required></select>
        </div>
      </div>
      <button type="submit" class="btn btn-success mt-3" id="btn-guardar-club">Guardar Club</button>
    </form>

    <h3>Lista de Clubes</h3>
    <table class="table table-striped" id="tabla-clubes">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Entrenador</th>
          <th>Asociación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  listarClubes();
  cargarEntrenadoresParaClub();
  cargarAsociacionesParaClub();

  document.getElementById("form-club").addEventListener("submit", (e) => {
    e.preventDefault();
    guardarClub();
  });
}

function listarClubes() {
  fetch(apiClubes)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#tabla-clubes tbody");
      tbody.innerHTML = "";
      data.forEach(club => {
        tbody.innerHTML += `
          <tr>
            <td>${club.id}</td>
            <td>${club.nombre}</td>
            <td>${club.entrenador?.nombre || '-'}</td>
            <td>${club.asociacion?.nombre || '-'}</td>
            <td>
              <button class="btn btn-warning btn-sm me-1" onclick="cargarClubParaEditar(${club.id})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="eliminarClub(${club.id})">Eliminar</button>
            </td>
          </tr>
        `;
      });
    });
}

function guardarClub() {
  const nombre = document.getElementById("club-nombre").value;
  const entrenadorId = document.getElementById("club-entrenador").value;
  const asociacionId = document.getElementById("club-asociacion").value;

  const club = {
    nombre: nombre,
    entrenador: { id: parseInt(entrenadorId) },
    asociacion: { id: parseInt(asociacionId) },
    jugadores: [],
    competiciones: []
  };

  let url = apiClubes;
  let metodo = "POST";

  if (clubEditandoId !== null) {
    url += `/${clubEditandoId}`;
    metodo = "PUT";
    club.id = clubEditandoId;
  }

  fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(club)
  }).then(() => {
    document.getElementById("form-club").reset();
    clubEditandoId = null;
    const boton = document.getElementById("btn-guardar-club");
    boton.textContent = "Guardar Club";
    boton.classList.remove("btn-warning");
    boton.classList.add("btn-success");
    listarClubes();
  });
}

function cargarClubParaEditar(id) {
  fetch(`${apiClubes}/${id}`)
    .then(res => res.json())
    .then(club => {
      document.getElementById("club-nombre").value = club.nombre;
      document.getElementById("club-entrenador").value = club.entrenador?.id || '';
      document.getElementById("club-asociacion").value = club.asociacion?.id || '';

      clubEditandoId = club.id;

      const boton = document.getElementById("btn-guardar-club");
      boton.textContent = "Actualizar Club";
      boton.classList.remove("btn-success");
      boton.classList.add("btn-warning");
    });
}

function eliminarClub(id) {
  if (confirm("¿Deseas eliminar este club?")) {
    fetch(`${apiClubes}/${id}`, {
      method: "DELETE"
    }).then(listarClubes);
  }
}

function cargarEntrenadoresParaClub() {
  fetch("http://localhost:8105/api/entrenadores")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("club-entrenador");
      select.innerHTML = "<option value=''>Seleccione un entrenador</option>";
      data.forEach(e => {
        select.innerHTML += `<option value="${e.id}">${e.nombre} ${e.apellido}</option>`;
      });
    });
}

function cargarAsociacionesParaClub() {
  fetch("http://localhost:8105/api/asociaciones")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("club-asociacion");
      select.innerHTML = "<option value=''>Seleccione una asociación</option>";
      data.forEach(a => {
        select.innerHTML += `<option value="${a.id}">${a.nombre}</option>`;
      });
    });
}
