function activityToHTML(activity) {
    // Destructuring para extraer las propiedades de la actividad
    const { titulo, descripcion, urlImagen } = activity;

    // Crear elementos HTML para la tarjeta de actividad
    const tituloElement = document.createElement("h3");
    tituloElement.innerHTML = titulo;

    const descripcionElement = document.createElement("p");
    descripcionElement.innerHTML = descripcion;

    const imagenElement = document.createElement("img");
    imagenElement.src = urlImagen;
    imagenElement.alt = titulo;

    // Asignar clases CSS a los elementos
    tituloElement.classList.add("titulo-actividad");
    descripcionElement.classList.add("descripcion-actividad");
    imagenElement.classList.add("imagen-actividad");

    // Crear el elemento div que será la tarjeta de actividad
    const actividadDiv = document.createElement("div");
    actividadDiv.classList.add("actividad");

    // Agregar los elementos creados al div de la tarjeta de actividad
    actividadDiv.appendChild(imagenElement);
    actividadDiv.appendChild(tituloElement);
    actividadDiv.appendChild(descripcionElement);

    // Asignar la clase CSS a la tarjeta de actividad
    actividadDiv.classList.add("actividad-tarjeta");

    // Retornar el div finalizado con todos los elementos correspondientes dentro
    return actividadDiv;
}

function handleAgregarActividad() {
    // Seleccionar los inputs de título, descripción e URL de la imagen
    const tituloInput = document.getElementById("titulo");
    const descripcionInput = document.getElementById("descripcion");
    const urlImagenInput = document.getElementById("urlImagen");

    // Tomar los valores ingresados en los inputs y guardarlos en variables
    const titulo = tituloInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    const urlImagen = urlImagenInput.value.trim();

    // Validar que los valores estén completos
    if (!titulo || !descripcion || !urlImagen) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Llamar al método correspondiente de la instancia de Repository para crear una nueva actividad
    repository.createActivity(titulo, descripcion, urlImagen);

    // Invocar la función para refrescar el contenedor de actividades
    renderAllActivities();
}

class Activity {
    constructor(id, titulo, descripcion, urlImagen) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.urlImagen = urlImagen;
    }
}

class Repository {
    constructor() {
        this.activities = [];
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity() {
        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;
        const urlImagen = document.getElementById("urlImagen").value;
        
        // Validación de entrada
        if (!titulo || !descripcion || !urlImagen) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const newActivity = new Activity(this.generateUniqueId(), titulo, descripcion, urlImagen);
        this.activities.push(newActivity);
        
        this.renderActivities();
    }

    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
        this.renderActivities();
    }

    renderActivity(activity) {
        const contenedorActividades = document.querySelector(".actividades-container");
        const actividadHTML = `
            <div class="actividad" data-id="${activity.id}">
                <img src="${activity.urlImagen}" alt="${activity.titulo}">
                <p><strong>${activity.titulo}</strong></p>
                <p>${activity.descripcion}</p>
                <button onclick="repository.deleteActivity('${activity.id}')">Eliminar actividad</button>
            </div>
        `;
        contenedorActividades.innerHTML += actividadHTML;
    }

    renderActivities() {
        const contenedorActividades = document.querySelector(".actividades-container");
        contenedorActividades.innerHTML = ""; // Borra todo el contenido existente
        this.activities.forEach(activity => this.renderActivity(activity));
    }

    generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9); // Genera un ID único aleatorio
    }
}

// Crear una instancia de Repository
const repository = new Repository();

// Agregar evento de clic al botón "Agregar actividad"
document.getElementById("agregarBtn").addEventListener("click", function() {
    repository.createActivity();
    document.getElementById("agregarBtn").addEventListener("click", handleAgregarActividad);

});
