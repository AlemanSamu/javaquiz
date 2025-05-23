// ---------------------- CLUBES ----------------------

const apiClubes = "http://localhost:8080/api/clubes";
let clubEditandoId = null;

document.addEventListener("DOMContentLoaded", () => {
  cargarVistaClubes();
});

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
          <label class="form-label">ID Entrenador</label>
          <input type="number" id="club-entrenador" class="form-control" required>
        </div>
        <div class="col-md-4">
          <label class="form-label">ID Asociación</label>
          <input type="number" id="club-asociacion" class="form-control" required>
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
          <th>ID Entrenador</th>
          <th>ID Asociación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  listarClubes();

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
            <td>${club.entrenador?.id || '-'}</td>
            <td>${club.asociacion?.id || '-'}</td>
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


// ---------------------- ENTRENADORES ----------------------

const apiEntrenadores = "http://localhost:8080/api/entrenadores";
let entrenadorEditandoId = null;

document.getElementById("entrenadores-tab").addEventListener("click", cargarVistaEntrenadores);

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



// ---------------------- ASOCIACIONES ----------------------

const apiAsociaciones = "http://localhost:8080/api/asociaciones";
let idAsociacionEditando = null; // Para saber si estamos editando

document.getElementById("asociaciones-tab").addEventListener("click", cargarVistaAsociaciones);

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

      // Cambiar el botón
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



// ---------------------- JUGADORES ----------------------

const apiJugadores = "http://localhost:8080/api/jugadores";
let jugadorEditandoId = null;

document.getElementById("jugadores-tab").addEventListener("click", cargarVistaJugadores);

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
  const clubId = parseInt(document.getElementById("jugador-club").value);

  const jugador = {
    nombre,
    apellido,
    numero,
    posicion,
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


// ---------------------- COMPETICIONES ----------------------

const apiCompeticiones = "http://localhost:8080/api/competiciones";
let idCompeticionEditando = null; // Para saber si estamos editando

document.getElementById("competiciones-tab").addEventListener("click", cargarVistaCompeticiones);

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
