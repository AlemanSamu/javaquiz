// competiciones.js
const apiCompeticiones = "http://localhost:8105/api/competiciones";
let idCompeticionEditando = null;

function cargarVistaCompeticiones() {
  const contenedor = document.getElementById("competiciones-content");

  contenedor.innerHTML = `
    <h3>Formulario - Nueva Competición</h3>
    <form id="form-competicion" class="mb-4">
      <div class="row g-2">
        <div class="col-md-4">
          <label class="form-label">Nombre</label>
          <input type="text" id="competicion-nombre" class="form-control" required>
        </div>
        <div class="col-md-2">
          <label class="form-label">Premio (USD)</label>
          <input type="number" id="competicion-premio" class="form-control" required>
        </div>
        <div class="col-md-3">
          <label class="form-label">Fecha Inicio</label>
          <input type="date" id="competicion-inicio" class="form-control" required>
        </div>
        <div class="col-md-3">
          <label class="form-label">Fecha Fin</label>
          <input type="date" id="competicion-fin" class="form-control" required>
        </div>
      </div>
      <button type="submit" class="btn btn-success mt-3" id="btn-guardar-competicion">Guardar Competición</button>
    </form>

    <h3>Lista de Competiciones</h3>
    <table class="table table-striped" id="tabla-competiciones">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Premio</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  listarCompeticiones();

  document.getElementById("form-competicion").addEventListener("submit", (e) => {
    e.preventDefault();
    if (idCompeticionEditando) {
      actualizarCompeticion();
    } else {
      guardarCompeticion();
    }
  });
}

function listarCompeticiones() {
  fetch(apiCompeticiones)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#tabla-competiciones tbody");
      tbody.innerHTML = "";
      data.forEach(comp => {
        tbody.innerHTML += `
          <tr>
            <td>${comp.id}</td>
            <td>${comp.nombre}</td>
            <td>${comp.montoPremio}</td>
            <td>${comp.fechaInicio}</td>
            <td>${comp.fechaFin}</td>
            <td>
              <button class="btn btn-primary btn-sm" onclick="editarCompeticion(${comp.id})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="eliminarCompeticion(${comp.id})">Eliminar</button>
            </td>
          </tr>
        `;
      });
    });
}

function guardarCompeticion() {
  const nombre = document.getElementById("competicion-nombre").value;
  const premio = parseFloat(document.getElementById("competicion-premio").value);
  const fechaInicio = document.getElementById("competicion-inicio").value;
  const fechaFin = document.getElementById("competicion-fin").value;

  const nuevaCompeticion = {
    nombre,
    montoPremio: premio,
    fechaInicio,
    fechaFin
  };

  fetch(apiCompeticiones, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevaCompeticion)
  }).then(() => {
    document.getElementById("form-competicion").reset();
    listarCompeticiones();
  });
}

function eliminarCompeticion(id) {
  if (confirm("¿Deseas eliminar esta competición?")) {
    fetch(`${apiCompeticiones}/${id}`, {
      method: "DELETE"
    }).then(listarCompeticiones);
  }
}

function editarCompeticion(id) {
  fetch(`${apiCompeticiones}/${id}`)
    .then(res => res.json())
    .then(comp => {
      document.getElementById("competicion-nombre").value = comp.nombre;
      document.getElementById("competicion-premio").value = comp.montoPremio;
      document.getElementById("competicion-inicio").value = comp.fechaInicio;
      document.getElementById("competicion-fin").value = comp.fechaFin;
      idCompeticionEditando = comp.id;
      document.getElementById("btn-guardar-competicion").textContent = "Actualizar Competición";
    });
}

function actualizarCompeticion() {
  const nombre = document.getElementById("competicion-nombre").value;
  const premio = parseFloat(document.getElementById("competicion-premio").value);
  const fechaInicio = document.getElementById("competicion-inicio").value;
  const fechaFin = document.getElementById("competicion-fin").value;

  const competicionActualizada = {
    id: idCompeticionEditando,
    nombre,
    montoPremio: premio,
    fechaInicio,
    fechaFin
  };

  fetch(`${apiCompeticiones}/${idCompeticionEditando}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(competicionActualizada)
  }).then(() => {
    document.getElementById("form-competicion").reset();
    document.getElementById("btn-guardar-competicion").textContent = "Guardar Competición";
    idCompeticionEditando = null;
    listarCompeticiones();
  });
}
