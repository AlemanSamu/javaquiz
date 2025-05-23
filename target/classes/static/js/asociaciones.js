// asociaciones.js
const apiAsociaciones = "http://localhost:8105/api/asociaciones";
let idAsociacionEditando = null;

function cargarVistaAsociaciones() {
  const contenedor = document.getElementById("asociaciones-content");

  contenedor.innerHTML = `
    <h3>Formulario - Nueva Asociación</h3>
    <form id="form-asociacion" class="mb-4">
      <div class="row g-2">
        <div class="col-md-4">
          <label class="form-label">Nombre</label>
          <input type="text" id="asociacion-nombre" class="form-control" required>
        </div>
        <div class="col-md-4">
          <label class="form-label">País</label>
          <input type="text" id="asociacion-pais" class="form-control" required>
        </div>
        <div class="col-md-4">
          <label class="form-label">Presidente</label>
          <input type="text" id="asociacion-presidente" class="form-control" required>
        </div>
      </div>
      <button type="submit" class="btn btn-success mt-3" id="btn-guardar">Guardar Asociación</button>
    </form>

    <h3>Lista de Asociaciones</h3>
    <table class="table table-striped" id="tabla-asociaciones">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>País</th>
          <th>Presidente</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  listarAsociaciones();

  document.getElementById("form-asociacion").addEventListener("submit", (e) => {
    e.preventDefault();
    if (idAsociacionEditando) {
      actualizarAsociacion();
    } else {
      guardarAsociacion();
    }
  });
}

function listarAsociaciones() {
  fetch(apiAsociaciones)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#tabla-asociaciones tbody");
      tbody.innerHTML = "";
      data.forEach(asociacion => {
        tbody.innerHTML += `
          <tr>
            <td>${asociacion.id}</td>
            <td>${asociacion.nombre}</td>
            <td>${asociacion.pais}</td>
            <td>${asociacion.presidente}</td>
            <td>
              <button class="btn btn-primary btn-sm" onclick="editarAsociacion(${asociacion.id})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="eliminarAsociacion(${asociacion.id})">Eliminar</button>
            </td>
          </tr>
        `;
      });
    });
}

function guardarAsociacion() {
  const nombre = document.getElementById("asociacion-nombre").value;
  const pais = document.getElementById("asociacion-pais").value;
  const presidente = document.getElementById("asociacion-presidente").value;

  const nuevaAsociacion = { nombre, pais, presidente };

  fetch(apiAsociaciones, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevaAsociacion)
  }).then(() => {
    document.getElementById("form-asociacion").reset();
    listarAsociaciones();
  });
}

function eliminarAsociacion(id) {
  if (confirm("¿Deseas eliminar esta asociación?")) {
    fetch(`${apiAsociaciones}/${id}`, {
      method: "DELETE"
    }).then(listarAsociaciones);
  }
}

function editarAsociacion(id) {
  fetch(`${apiAsociaciones}/${id}`)
    .then(res => res.json())
    .then(asociacion => {
      document.getElementById("asociacion-nombre").value = asociacion.nombre;
      document.getElementById("asociacion-pais").value = asociacion.pais;
      document.getElementById("asociacion-presidente").value = asociacion.presidente;
      idAsociacionEditando = asociacion.id;
      document.getElementById("btn-guardar").textContent = "Actualizar Asociación";
    });
}

function actualizarAsociacion() {
  const nombre = document.getElementById("asociacion-nombre").value;
  const pais = document.getElementById("asociacion-pais").value;
  const presidente = document.getElementById("asociacion-presidente").value;

  const asociacionActualizada = { id: idAsociacionEditando, nombre, pais, presidente };

  fetch(`${apiAsociaciones}/${idAsociacionEditando}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(asociacionActualizada)
  }).then(() => {
    document.getElementById("form-asociacion").reset();
    document.getElementById("btn-guardar").textContent = "Guardar Asociación";
    idAsociacionEditando = null;
    listarAsociaciones();
  });
}
