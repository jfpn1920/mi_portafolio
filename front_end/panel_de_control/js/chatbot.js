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
document.addEventListener("DOMContentLoaded", () => {
    console.log("🤖 Script de vista previa del chatbot cargado.");
    const nombreChatbotVista = document.querySelector(".nombre-chatbot-vista");
    const areaChat = document.querySelector(".chatbot-area");
    const inputMensaje = document.querySelector(".chatbot-input input");
    const btnEnviar = document.querySelector(".chatbot-enviar");
    const btnDesplegar = document.querySelector(".chatbot-boton");
    const chatbotData = JSON.parse(
        localStorage.getItem("_chatbot_vista_previa")
    );
    if (!chatbotData) {
        nombreChatbotVista.textContent = "Sin chatbot";
        mostrarMensaje("No hay un chatbot seleccionado para vista previa.");
    } else {
        nombreChatbotVista.textContent = chatbotData.chatbot;
        mostrarMensaje("Vista previa del chatbot cargada correctamente.");
    }
    const CHAT_STORAGE_KEY = "_chatbot_historial_vista_previa";
    const historialGuardado = JSON.parse(
        localStorage.getItem(CHAT_STORAGE_KEY)
    ) || [];
    historialGuardado.forEach(msg => {
        const mensaje = document.createElement("div");
        mensaje.classList.add("mensaje", msg.tipo);
        mensaje.textContent = msg.texto;
        areaChat.appendChild(mensaje);
    });
    areaChat.scrollTop = areaChat.scrollHeight;
    function guardarMensaje(texto, tipo) {
        const historial = JSON.parse(
            localStorage.getItem(CHAT_STORAGE_KEY)
        ) || [];
        historial.push({ texto, tipo });
        localStorage.setItem(
            CHAT_STORAGE_KEY,
            JSON.stringify(historial)
        );
    }
    function agregarMensaje(texto, tipo = "usuario") {
        const mensaje = document.createElement("div");
        mensaje.classList.add("mensaje", tipo);
        mensaje.textContent = texto;
        areaChat.appendChild(mensaje);
        areaChat.scrollTop = areaChat.scrollHeight;
        guardarMensaje(texto, tipo);
    }
    function normalizarTexto(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[¿?.,!]/g, "");
    }
    const stopWords = [
        "el","la","los","las","un","una","unos",
        "de","en","y","o","que","como","es",
        "para","con","por","al","del"
    ];
    function obtenerPalabrasClave(texto) {
        return normalizarTexto(texto)
            .split(" ")
            .filter(p => p.length > 2 && !stopWords.includes(p));
    }
    const intenciones = {
        ayuda: ["ayuda", "ayudar", "ayudarte", "duda", "problema", "necesito"],
        ingeniero: ["ingeniero", "profesional", "especialista"],
        contacto: ["contactar", "correo", "email", "gmail", "whatsapp", "telefono"],
        redes: ["redes", "facebook", "twitter", "instagram"],
        saludo: ["hola", "buenos", "buenas", "saludos"],
        agradecimiento: ["gracias", "muchas", "agradecido"]
    };
    function obtenerRespuesta(mensajeUsuario) {
        if (!chatbotData || !Array.isArray(chatbotData.preguntas)) {
            return "Chatbot no configurado correctamente.";
        }
        const palabrasUsuario = obtenerPalabrasClave(mensajeUsuario);
        let mejorCoincidencia = null;
        let mayorPuntaje = 0;
        chatbotData.preguntas.forEach(pregunta => {
            const palabrasPregunta = obtenerPalabrasClave(pregunta);
            let puntaje = 0;
            palabrasUsuario.forEach(palabra => {
                palabrasPregunta.forEach(pPregunta => {
                    if (palabra === pPregunta) {
                        puntaje += 2;
                    }
                    Object.values(intenciones).forEach(lista => {
                        if (lista.includes(palabra) && lista.includes(pPregunta)) {
                            puntaje += 3;
                        }
                    });
                });
            });
            if (puntaje > mayorPuntaje) {
                mayorPuntaje = puntaje;
                mejorCoincidencia = pregunta;
            }
        });
        return mayorPuntaje > 0
            ? mejorCoincidencia
            : "No entendí tu mensaje 🤔, ¿puedes reformularlo?";
    }
    function enviarMensaje() {
        const texto = inputMensaje.value.trim();
        if (!texto) return;
        agregarMensaje(texto, "usuario");
        inputMensaje.value = "";
        setTimeout(() => {
            const respuesta = obtenerRespuesta(texto);
            agregarMensaje(respuesta, "bot");
        }, Number(chatbotData?.tiempo) || 1000);
    }
    btnEnviar.addEventListener("click", enviarMensaje);
    inputMensaje.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            enviarMensaje();
        }
    });
    function desplegarChatbot() {
        const despliegueValido =
            chatbotData &&
            chatbotData.chatbot &&
            Array.isArray(chatbotData.preguntas) &&
            chatbotData.preguntas.length > 0;
        if (despliegueValido) {
            mostrarMensaje("Despliegue de chatbot realizado con éxito.");
        } else {
            mostrarMensaje("No se ha podido desplegar el chatbot. Verifica la configuración.");
        }
    }
    btnDesplegar.addEventListener("click", desplegarChatbot);
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