//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
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
            alert("Has alcanzado el máximo de datos permitidos en el tablero (21 chatbots).");
            return;
        }
        const nombreChatbot = inputNombre.value.trim();
        if (nombreChatbot === "") {
            alert("Debes ingresar el nombre del chatbot.");
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
            alert("Por favor completa todos los campos del formulario.");
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
        alert("Los datos han sido guardados correctamente y enviados al tablero.");
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
//--------------------------------------//
//--|funcionalidad_tablero_de_chatbot|--//
//--------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 Script de tablero_chatbot cargado correctamente.");
    const estadoEdicion = document.getElementById("estadoEdicion");
    const zonaTablero = document.querySelector(".zona-tablero");
    function mensajeHTML(texto) {
        if (!estadoEdicion) return;
        estadoEdicion.innerHTML = texto;
        estadoEdicion.style.display = "block";
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
            `);
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
                <div class="columna">${item.preguntas.join(", ")}</div>
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
            alert("Se ha eliminado el chatbot correctamente");
            mostrarTableroChatbot();
        }
        if (btn.classList.contains("btn-editar1")) {
            const item = chatbots[index];
            const nombreAnterior = item.chatbot;
            const nuevoNombre = prompt(
                "Editar nombre del chatbot:",
                item.chatbot
            );
            if (!nuevoNombre) return;
            chatbots[index].chatbot = nuevoNombre.trim();
            localStorage.setItem("_tablero_chatbot", JSON.stringify(chatbots));
            alert(
                `El chatbot "${nombreAnterior}" ha sido cambiado por "${nuevoNombre.trim()}"`
            );
            mostrarTableroChatbot();
        }
        if (btn.classList.contains("btn-visualizar1")) {
            const item = chatbots[index];
            alert("Vista previa del chatbot");
        }
        if (btn.classList.contains("btn-anadir1")) {
            const item = chatbots[index];
            alert(`El chatbot "${item.chatbot}" ha sido añadido`);
        }
    });
});