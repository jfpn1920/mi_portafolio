//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//-----------------------------------//
//--|funcionalidad_agregar_chatbot|--//
//-----------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const btnCrear = document.querySelector(".btn-crear");
    const inputNombre = document.querySelector(".nombre-chatbot input");
    if (!btnCrear || !inputNombre) return;
    btnCrear.addEventListener("click", () => {
        const nombreChatbot = inputNombre.value.trim();
        if (nombreChatbot !== "") {
            localStorage.setItem("_chatbot_actual", nombreChatbot);
            alert(`Se creó el chatbot llamado "${nombreChatbot}" correctamente.`);
        } else {
            alert("No hay ningún chatbot creado.");
        }
    });
});
//-------------------------------------------//
//--|funcionalidad_formulario_de_categoria|--//
//-------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const btnGuardar = document.querySelector(".btn-guardar");
    const inputPregunta = document.querySelector(".input-pregunta");
    const contenedorAlmacen = document.querySelector(".contenedor-almacen");
    const selects = document.querySelectorAll(".select-categoria");
    const zonaTablero = document.querySelector(".zona-tablero");
    if (!btnGuardar || !inputPregunta || !contenedorAlmacen || !zonaTablero) return;
    inputPregunta.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const pregunta = inputPregunta.value.trim();
            if (pregunta === "") return;
            const itemPregunta = document.createElement("div");
            itemPregunta.textContent = pregunta;
            itemPregunta.classList.add("item-pregunta");
            contenedorAlmacen.appendChild(itemPregunta);
            inputPregunta.value = "";
        }
    });
    btnGuardar.addEventListener("click", () => {
        const nombreChatbot = localStorage.getItem("_chatbot_actual");
        if (!nombreChatbot) {
            alert("Primero crea un chatbot en la sección correspondiente.");
            return;
        }
        let selectsValidos = true;
        const valoresSelects = [];
        selects.forEach(select => {
            if (select.selectedIndex === 0 || select.value.trim() === "") {
                selectsValidos = false;
            } else {
                valoresSelects.push(select.value.trim());
            }
        });
        const hayPreguntas = contenedorAlmacen.children.length > 0;
        const preguntasArray = Array.from(contenedorAlmacen.children).map(div => div.textContent);
        if (!hayPreguntas || !selectsValidos) {
            alert("Por favor completa todos los campos del formulario de categoría.");
            return;
        }
        const datos = {
            chatbot: nombreChatbot,
            ubicacion: valoresSelects[0],
            tiempo: valoresSelects[1],
            preguntas: preguntasArray
        };
        let tablero = JSON.parse(localStorage.getItem("_tablero_chatbot")) || [];
        tablero.push(datos);
        localStorage.setItem("_tablero_chatbot", JSON.stringify(tablero));
        alert("Los datos han sido guardados correctamente y enviados al tablero.");
        mostrarTablero();
        document.dispatchEvent(new CustomEvent("actualizar_tablero_chatbot"));
        inputPregunta.value = "";
        contenedorAlmacen.innerHTML = "";
        selects.forEach(select => select.selectedIndex = 0);
        localStorage.removeItem("_chatbot_actual");
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
            mensajeHTML(`
                <i class="fa-solid fa-trash"></i>
                El chatbot <b>${nombre}</b> fue eliminado.
            `);
            mostrarTableroChatbot();
        }
        if (btn.classList.contains("btn-editar1")) {
            const item = chatbots[index];
            const nuevoNombre = prompt(
                "Editar nombre del chatbot:",
                item.chatbot
            );
            if (!nuevoNombre) return;
            chatbots[index].chatbot = nuevoNombre.trim();
            localStorage.setItem("_tablero_chatbot", JSON.stringify(chatbots));
            mensajeHTML(`
                <i class="fa-solid fa-pen-to-square"></i>
                Chatbot actualizado.
            `);
            mostrarTableroChatbot();
        }
        if (btn.classList.contains("btn-visualizar1")) {
            const item = chatbots[index];
            mensajeHTML(`
                <i class="fa-solid fa-eye"></i>
                Vista previa del chatbot <b>${item.chatbot}</b>.
            `);
        }
    });
});