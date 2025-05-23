// jugadores.js
const apiJugadores = "http://localhost:8105/api/jugadores";
let jugadorEditandoId = null;

function cargarVistaJugadores() {
  const contenedor = document.getElementById("jugadores-content");

  contenedor.innerHTML = `
    <h3>Formulario - Nuevo Jugador</h3>
    <form id="form-jugador" class="mb-4">
      <div class="row g-2">
        <div class="col-md-3">
          <label class="form-label">Nombre</label>
          <input type="text" id="jugador-nombre" class="form-control" required>
        </div>
        <div class="col-md-3">
          <label class="form-label">Apellido</label>
          <input type="text" id="jugador-apellido" class="form-control" required>
        </div>
        <div class="col-md-2">
          <label class="form-label">Número</label>
          <input type="number" id="jugador-numero" class="form-control" required>
        </div>
        <div class="col-md-2">
          <label class="form-label">Posición</label>
          <input type="text" id="jugador-posicion" class="form-control" required>
        </div>
		<div class="col-md-2">
		  <label class="form-label">Nacionalidad</label>
		  <input type="text" id="jugador-nacionalidad" class="form-control" required>
		</div>
        <div class="col-md-2">
          <label class="form-label">ID Club</label>
          <input type="number" id="jugador-club" class="form-control" required>
        </div>
      </div>
      <button type="submit" class="btn btn-success mt-3" id="btn-guardar-jugador">Guardar Jugador</button>
    </form>

    <h3>Lista de Jugadores</h3>
    <table class="table table-striped" id="tabla-jugadores">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Número</th>
          <th>Posición</th>
          <th>ID Club</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  listarJugadores();

  document.getElementById("form-jugador").addEventListener("submit", (e) => {
    e.preventDefault();
    guardarJugador();
  });
}

function listarJugadores() {
  fetch(apiJugadores)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#tabla-jugadores tbody");
      tbody.innerHTML = "";
      data.forEach(jugador => {
        tbody.innerHTML += `
          <tr>
            <td>${jugador.id}</td>
            <td>${jugador.nombre}</td>
            <td>${jugador.apellido}</td>
            <td>${jugador.numero}</td>
            <td>${jugador.posicion}</td>
            <td>${jugador.club?.id || '-'}</td>
            <td>
              <button class="btn btn-warning btn-sm me-1" onclick="cargarJugadorParaEditar(${jugador.id})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="eliminarJugador(${jugador.id})">Eliminar</button>
            </td>
          </tr>
        `;
      });
    });
}

function guardarJugador() {
  const nombre = document.getElementById("jugador-nombre").value;
  const apellido = document.getElementById("jugador-apellido").value;
  const numero = parseInt(document.getElementById("jugador-numero").value);
  const posicion = document.getElementById("jugador-posicion").value;
  const nacionalidad = document.getElementById("jugador-nacionalidad").value.trim();
  const clubId = parseInt(document.getElementById("jugador-club").value);

  const jugador = {
    nombre,
    apellido,
    numero,
    posicion,
	nacionalidad, 
    club: { id: clubId }
  };

  let url = apiJugadores;
  let metodo = "POST";

  if (jugadorEditandoId !== null) {
    url += `/${jugadorEditandoId}`;
    metodo = "PUT";
    jugador.id = jugadorEditandoId;
  }

  fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jugador)
  }).then(() => {
    document.getElementById("form-jugador").reset();
    jugadorEditandoId = null;
    const boton = document.getElementById("btn-guardar-jugador");
    boton.textContent = "Guardar Jugador";
    boton.classList.remove("btn-warning");
    boton.classList.add("btn-success");
    listarJugadores();
  });
}

function cargarJugadorParaEditar(id) {
  fetch(`${apiJugadores}/${id}`)
    .then(res => res.json())
    .then(jugador => {
      document.getElementById("jugador-nombre").value = jugador.nombre;
      document.getElementById("jugador-apellido").value = jugador.apellido;
      document.getElementById("jugador-numero").value = jugador.numero;
      document.getElementById("jugador-posicion").value = jugador.posicion;
      document.getElementById("jugador-club").value = jugador.club?.id || '';

      jugadorEditandoId = jugador.id;

      const boton = document.getElementById("btn-guardar-jugador");
      boton.textContent = "Actualizar Jugador";
      boton.classList.remove("btn-success");
      boton.classList.add("btn-warning");
    });
}

function eliminarJugador(id) {
  if (confirm("¿Deseas eliminar este jugador?")) {
    fetch(`${apiJugadores}/${id}`, {
      method: "DELETE"
    }).then(listarJugadores);
  }
}
