const API_URL = "http://localhost:3000/api/tasks";

async function obtenerTareas() {

    const response = await fetch(API_URL);

    const tareas = await response.json();

    document.getElementById("contador").textContent =
        tareas.length;

    const contenedor =
        document.getElementById("tareas");

    contenedor.innerHTML = "";

    tareas.forEach(tarea => {

        contenedor.innerHTML += `

        <div class="tarea">

            <h3>${tarea.titulo}</h3>

            <p>${tarea.descripcion}</p>

            <p class="${tarea.estado === 'Completada' ? 'completada' : 'pendiente'}">
            ${tarea.estado}
            </p>

            <button onclick="completarTarea('${tarea._id}')">
                Completar
            </button>

            <button onclick="eliminarTarea('${tarea._id}')">
                Eliminar
            </button>

        </div>

        `;

    });

}

async function crearTarea() {

    const titulo =
        document.getElementById("titulo").value;

    const descripcion =
        document.getElementById("descripcion").value;

    await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            titulo,
            descripcion
        })

    });

    document.getElementById("titulo").value = "";
    document.getElementById("descripcion").value = "";

    obtenerTareas();

}

async function eliminarTarea(id) {

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    obtenerTareas();

}

async function completarTarea(id) {

    await fetch(`${API_URL}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            estado: "Completada"
        })

    });

    obtenerTareas();

}

obtenerTareas();