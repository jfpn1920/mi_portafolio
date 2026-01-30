//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//-------------------------------------------------//
//--|funcionalidad_edicion_predeterminada_pagina|--//
//-------------------------------------------------//
function mostrarMensaje(texto) {
    const estado = document.getElementById("estadoEdicion");
    if (!estado) return;
    estado.textContent = texto;
}
//-------------------------------------------//
//--|funcionalidad_formulario_de_categoria|--//
//-------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const btnGuardar = document.querySelector(".btn-guardar");
    const inputNombre = document.querySelector(".nombre-chatbot input");
    const inputPregunta = document.querySelector(".input-pregunta");
    const contenedorAlmacen = document.querySelector(".contenedor-almacen");
    const selects = document.querySelectorAll(".select-categoria");
    const zonaTablero = document.querySelector(".zona-tablero");
    if (!btnGuardar || !inputNombre || !inputPregunta || !contenedorAlmacen || !zonaTablero) return;
    const STORAGE_PREGUNTAS = "_preguntas_formulario_temp";
    const MAX_CHATBOTS = 21;
    const preguntasGuardadas = JSON.parse(localStorage.getItem(STORAGE_PREGUNTAS)) || [];
    preguntasGuardadas.forEach(texto => {
        const item = document.createElement("div");
        item.className = "item-pregunta";
        item.textContent = texto;
        contenedorAlmacen.appendChild(item);
    });
    inputPregunta.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const pregunta = inputPregunta.value.trim();
            if (pregunta === "") return;
            const itemPregunta = document.createElement("div");
            itemPregunta.className = "item-pregunta";
            itemPregunta.textContent = pregunta;
            contenedorAlmacen.appendChild(itemPregunta);
            const preguntasActuales = JSON.parse(localStorage.getItem(STORAGE_PREGUNTAS)) || [];
            preguntasActuales.push(pregunta);
            localStorage.setItem(STORAGE_PREGUNTAS, JSON.stringify(preguntasActuales));
            inputPregunta.value = "";
        }
    });
    btnGuardar.addEventListener("click", () => {
        const tableroActual = JSON.parse(localStorage.getItem("_tablero_chatbot")) || [];
        if (tableroActual.length >= MAX_CHATBOTS) {
            mostrarMensaje(
                "Has alcanzado el máximo de datos permitidos en el tablero (21 chatbots)."
            );
            return;
        }
        const nombreChatbot = inputNombre.value.trim();
        if (nombreChatbot === "") {
            mostrarMensaje(
                "Debes ingresar el nombre del chatbot."
            );
            return;
        }
        let selectsValidos = true;
        const valoresSelects = [];
        selects.forEach(select => {
            if (select.selectedIndex === 0) {
                selectsValidos = false;
            } else {
                valoresSelects.push(select.value.trim());
            }
        });
        const preguntasArray = Array.from(contenedorAlmacen.children)
            .map(div => div.textContent);
        if (!selectsValidos || preguntasArray.length === 0) {
            mostrarMensaje(
                "Por favor completa todos los campos del formulario."
            );
            return;
        }
        const datos = {
            chatbot: nombreChatbot,
            ubicacion: valoresSelects[0],
            tiempo: valoresSelects[1],
            preguntas: preguntasArray
        };
        tableroActual.push(datos);
        localStorage.setItem("_tablero_chatbot", JSON.stringify(tableroActual));
        mostrarMensaje(
            "Los datos han sido guardados correctamente y enviados al tablero."
        );
        mostrarTablero();
        document.dispatchEvent(new CustomEvent("actualizar_tablero_chatbot"));
        inputNombre.value = "";
        inputPregunta.value = "";
        contenedorAlmacen.innerHTML = "";
        selects.forEach(select => select.selectedIndex = 0);
        localStorage.removeItem(STORAGE_PREGUNTAS);
    });
    function mostrarTablero() {
        zonaTablero.innerHTML = "";
        const tablero = JSON.parse(localStorage.getItem("_tablero_chatbot")) || [];
        if (tablero.length === 0) {
            const filaVacia = document.createElement("div");
            filaVacia.className = "columna-vacia";
            filaVacia.textContent = "No hay chatbots creados";
            zonaTablero.appendChild(filaVacia);
            return;
        }
        tablero.forEach(item => {
            const fila = document.createElement("div");
            fila.className = "fila-chatbot";
            fila.innerHTML = `
                <div class="columna">${item.chatbot}</div>
                <div class="columna">${item.ubicacion}</div>
                <div class="columna">${item.tiempo}</div>
                <div class="columna">${item.preguntas.join(", ")}</div>
            `;
            zonaTablero.appendChild(fila);
        });
    }
    mostrarTablero();
});
//--------------------------------------------//
//--|funcionalidad_vista_previa_del_chatbot|--//
//--------------------------------------------//
const inputMensaje = document.querySelector(".chatbot-input input");
const btnEnviar = document.querySelector(".chatbot-enviar");
const areaChat = document.querySelector(".chatbot-area");
const nombreChatbot = document.querySelector(".nombre-chatbot-vista");

// --------------------------------------------------
// 🔹 CHATBOT CARGADO DESDE EL TABLERO
// --------------------------------------------------
let chatbotActivo = JSON.parse(
    localStorage.getItem("_chatbot_vista_previa")
);

// preguntas añadidas al chatbot
let preguntasSugeridas = chatbotActivo?.preguntas || [];

let tiempoRespuesta = chatbotActivo?.tiempo
    ? parseInt(chatbotActivo.tiempo) * 1000
    : 600;

// --------------------------------------------------
// 🔹 DICCIONARIO A–Z
// --------------------------------------------------
const diccionario = {
    a: ["ayuda", "asistencia", "atencion", "apoyo", "acceso"],
    b: ["buenos", "buenas", "bien", "bienvenido"],
    c: ["contacto", "correo", "categorias", "chatbot"],
    d: ["datos", "direccion", "desarrollo"],
    e: ["email", "equipo", "empresa"],
    f: ["funciona", "funcionalidad"],
    g: ["gracias", "genial"],
    h: ["hola", "horario"],
    i: ["informacion", "inicio"],
    j: ["javascript", "js"],
    k: [],
    l: ["login", "loguear"],
    m: ["mensaje", "menu"],
    n: ["nombre", "nuevo"],
    o: ["opciones"],
    p: ["proyectos", "pagina", "precio"],
    q: ["que", "quiero"],
    r: ["recientes", "registro"],
    s: ["soporte", "servicios"],
    t: ["trabajo", "tienda"],
    u: ["usuario"],
    v: ["vista", "version"],
    w: ["web"],
    x: [],
    y: [],
    z: []
};

// --------------------------------------------------
// 🔹 RESPUESTAS
// --------------------------------------------------
const respuestas = {
    saludo: "¡Hola! 👋 ¿En qué puedo ayudarte?",
    contacto: "Puedes contactarme desde la sección de contacto de la página.",
    proyectos: "Si vas a la página de categorías encontrarás los proyectos disponibles.",
    ayuda: "Claro, dime qué necesitas y con gusto te ayudo.",
    despedida: "¡Con gusto! 😊 ¿Necesitas algo más?",
    desconocido: "Lo siento, no entendí tu mensaje. ¿Podrías reformularlo?"
};

// --------------------------------------------------
// 🔹 FUNCIONES
// --------------------------------------------------

// Crear mensaje
function crearMensaje(texto, tipo) {
    const mensaje = document.createElement("div");
    mensaje.classList.add("mensaje", tipo);
    mensaje.textContent = texto;
    areaChat.appendChild(mensaje);
    areaChat.scrollTop = areaChat.scrollHeight;
}

// --------------------------------------------------
// 🔹 MOSTRAR SUGERENCIAS (SOLO MIENTRAS ESCRIBE)
// --------------------------------------------------
function mostrarSugerencias(textoUsuario) {
    const texto = textoUsuario.toLowerCase().trim();

    // eliminar sugerencias anteriores
    const anteriores = document.querySelector(".sugerencias-chatbot");
    if (anteriores) anteriores.remove();

    if (!texto || !preguntasSugeridas.length) return;

    const palabrasUsuario = texto.split(" ");

    const coincidencias = preguntasSugeridas.filter(pregunta => {
        const preguntaLower = pregunta.toLowerCase();
        return palabrasUsuario.some(palabra =>
            palabra.length > 2 && preguntaLower.includes(palabra)
        );
    });

    if (coincidencias.length === 0) return;

    const contenedor = document.createElement("div");
    contenedor.className = "sugerencias-chatbot";

    contenedor.innerHTML = `
        <div class="sugerencias-titulo">💡 Preguntas sugeridas</div>
        ${coincidencias.map(p => `<div class="sugerencia">${p}</div>`).join("")}
    `;

    areaChat.appendChild(contenedor);
    areaChat.scrollTop = areaChat.scrollHeight;
}

// --------------------------------------------------
// 🔹 OBTENER RESPUESTA DEL BOT
// --------------------------------------------------
function obtenerRespuesta(textoUsuario) {
    const texto = textoUsuario.toLowerCase();

    for (let letra in diccionario) {
        for (let palabra of diccionario[letra]) {
            if (texto.includes(palabra)) {

                if (diccionario.b.includes(palabra) || diccionario.h.includes(palabra))
                    return respuestas.saludo;

                if (diccionario.c.includes(palabra))
                    return respuestas.contacto;

                if (diccionario.p.includes(palabra) || diccionario.r.includes(palabra))
                    return respuestas.proyectos;

                if (diccionario.a.includes(palabra))
                    return respuestas.ayuda;

                if (diccionario.g.includes(palabra))
                    return respuestas.despedida;
            }
        }
    }
    return respuestas.desconocido;
}

// --------------------------------------------------
// 🔹 ENVIAR MENSAJE (RESPUESTA FINAL)
// --------------------------------------------------
function enviarMensaje() {
    const texto = inputMensaje.value.trim();
    if (!texto) return;

    // eliminar sugerencias al enviar
    const sugerencias = document.querySelector(".sugerencias-chatbot");
    if (sugerencias) sugerencias.remove();

    crearMensaje(texto, "usuario");
    inputMensaje.value = "";

    setTimeout(() => {
        const respuestaBot = obtenerRespuesta(texto);
        crearMensaje(respuestaBot, "bot");
    }, tiempoRespuesta);
}

// --------------------------------------------------
// 🔹 EVENTOS
// --------------------------------------------------
btnEnviar.addEventListener("click", enviarMensaje);

inputMensaje.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        enviarMensaje();
    }
});

inputMensaje.addEventListener("input", () => {
    mostrarSugerencias(inputMensaje.value);
});
//--------------------------------------//
//--|funcionalidad_tablero_de_chatbot|--//
//--------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 Script de tablero_chatbot cargado correctamente.");
    const estadoEdicion = document.getElementById("estadoEdicion");
    const zonaTablero = document.querySelector(".zona-tablero");
    function mensajeHTML(texto, tipo = "info") {
        if (!estadoEdicion) return;  
        estadoEdicion.innerHTML = `
            <div class="mensaje-flotante ${tipo}">
                ${texto}
            </div>
        `;
        estadoEdicion.classList.add("visible");
        setTimeout(() => {
            estadoEdicion.classList.remove("visible");
        }, 4000);
    }
    function mostrarTableroChatbot() {
        zonaTablero.innerHTML = "";
        const chatbots = JSON.parse(
            localStorage.getItem("_tablero_chatbot")
        ) || [];
        if (chatbots.length === 0) {
            mensajeHTML(`
                <i class="fa-solid fa-robot"></i>
                No hay chatbots creados.
            `, "warning");
            const filaVacia = document.createElement("div");
            filaVacia.className = "columna-vacia";
            filaVacia.textContent = "No hay chatbots creados";
            zonaTablero.appendChild(filaVacia);
            return;
        }
        chatbots.forEach((item, index) => {
            const fila = document.createElement("div");
            fila.className = "fila-chatbot";
            fila.innerHTML = `
                <div class="columna">${item.chatbot}</div>
                <div class="columna">${item.ubicacion}</div>
                <div class="columna">${item.tiempo}</div>
                <div class="columna celda-vinculos">
                    ${item.preguntas
                        .map(p => `<span>${p}</span>`)
                        .join("")}
                </div>
                <div class="columna">
                    <button class="btn-editar1" data-index="${index}">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-visualizar1" data-index="${index}">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn-anadir1" data-index="${index}">
                        <i class="fa-solid fa-circle-plus"></i>
                    </button>
                    <button class="btn-eliminar1" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            zonaTablero.appendChild(fila);
        });
    }
    mostrarTableroChatbot();
    document.addEventListener("actualizar_tablero_chatbot", () => {
        console.log("🔄 Evento recibido: actualizando tablero chatbot...");
        mostrarTableroChatbot();
    });
    zonaTablero.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const index = btn.dataset.index;
        let chatbots = JSON.parse(
            localStorage.getItem("_tablero_chatbot")
        ) || [];
        if (btn.classList.contains("btn-eliminar1")) {
            const nombre = chatbots[index].chatbot;
            chatbots.splice(index, 1);
            localStorage.setItem("_tablero_chatbot", JSON.stringify(chatbots));
            mensajeHTML(
                `🗑️ El chatbot <strong>${nombre}</strong> fue eliminado correctamente.`,
                "success"
            );
            mostrarTableroChatbot();
        }
        if (btn.classList.contains("btn-editar1")) {
            const item = chatbots[index];
            const nombreAnterior = item.chatbot;
            const nuevoNombre = prompt(
                "Editar nombre del chatbot:",
                nombreAnterior
            );
            if (!nuevoNombre || !nuevoNombre.trim()) {
                mensajeHTML(
                    "⚠️ La edición fue cancelada.",
                    "warning"
                );
                return;
            }
            chatbots[index].chatbot = nuevoNombre.trim();
            localStorage.setItem("_tablero_chatbot", JSON.stringify(chatbots));
            mensajeHTML(
                `✏️ El chatbot <strong>${nombreAnterior}</strong> fue renombrado a <strong>${nuevoNombre.trim()}</strong>.`,
                "success"
            );
            mostrarTableroChatbot();
        }
        if (btn.classList.contains("btn-visualizar1")) {
            mensajeHTML(
                `👁️ Vista previa del chatbot <strong>${chatbots[index].chatbot}</strong>.`,
                "info"
            );
        }
        if (btn.classList.contains("btn-anadir1")) {
            const item = chatbots[index];
            localStorage.setItem(
                "_chatbot_vista_previa",
                JSON.stringify(item)
            );
            mensajeHTML(
                `✅ El chatbot <strong>${item.chatbot}</strong> ha sido añadido a la vista previa.`,
                "success"
            );
            document.querySelector(".chatbot-contenedor")?.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});