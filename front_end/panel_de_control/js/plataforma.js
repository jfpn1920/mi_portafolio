//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//-----------------------------------------------------//
//--|funcionalidad_edicion_predeterminada_plataforma|--//
//-----------------------------------------------------//
function mostrarMensaje(texto, tipo = "info") {
    const estado = document.getElementById("estadoEdicion");
    if (!estado) return; 
    estado.innerHTML = "";
    const mensaje = document.createElement("div");
    mensaje.classList.add("mensaje", tipo);
    mensaje.textContent = texto;
    estado.appendChild(mensaje);
}
//--------------------------------------------//
//--|funcionalidad_formulario_de_plataforma|--//
//--------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const btnCrear = document.querySelector(".btn-crear");
    const inputNombre = document.querySelector(".input-texto");
    const selectPrincipal = document.querySelector(".select-principal");
    const selectIcono = document.querySelector(".select-icono");
    const contenedorPaginas = document.querySelector(".contenedor-paginas");
    let paginasSeleccionadas = [];
    function mostrarMensaje(texto, tipo = "info") {
        const estado = document.getElementById("estadoEdicion");
        if (!estado) return; 
        estado.innerHTML = "";
        const mensaje = document.createElement("div");
        mensaje.classList.add("mensaje", tipo);
        mensaje.textContent = texto;
        estado.appendChild(mensaje);
    }
    const iconos = [
        { nombre: "Inicio", valor: "fa-house" },
        { nombre: "Usuarios", valor: "fa-users" },
        { nombre: "Configuración", valor: "fa-gear" },
        { nombre: "Reportes", valor: "fa-chart-line" },
        { nombre: "Portafolio", valor: "fa-briefcase" },
        { nombre: "Tienda", valor: "fa-store" },
        { nombre: "Hospital", valor: "fa-hospital" }
    ];
    iconos.forEach(icono => {
        const option = document.createElement("option");
        option.value = icono.valor;
        option.textContent = icono.nombre;
        selectIcono.appendChild(option);
    });
    document.addEventListener("enviar_paginas_a_formulario", (e) => {
        const paginas = e.detail || [];
        cargarPaginasEnSelect(paginas);
        mostrarPaginasEnContenedor(paginas);
    });
    function cargarPaginasEnSelect(paginas) {
        selectPrincipal.innerHTML = "";
        const opcionDefault = document.createElement("option");
        opcionDefault.value = "";
        opcionDefault.textContent = "Ningún principal";
        selectPrincipal.appendChild(opcionDefault);
        paginas.forEach(pagina => {
            const option = document.createElement("option");
            option.value = pagina.nombre;
            option.textContent = pagina.nombre;
            selectPrincipal.appendChild(option);
        });
    }
    function mostrarPaginasEnContenedor(paginas) {
        contenedorPaginas.innerHTML = "";
        if (paginas.length === 0) {
            contenedorPaginas.textContent = "No hay páginas agregadas";
            return;
        }
        paginas.forEach(pagina => {
            const item = document.createElement("div");
            item.style.display = "flex";
            item.style.alignItems = "center";
            item.style.gap = "6px";
            item.style.padding = "6px";
            item.style.borderBottom = "1px solid #ccc";
            item.style.fontSize = "12px";
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = pagina.nombre;
            checkbox.checked = paginasSeleccionadas.includes(pagina.nombre);
            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    paginasSeleccionadas.push(pagina.nombre);
                } else {
                    paginasSeleccionadas = paginasSeleccionadas.filter(
                        p => p !== pagina.nombre
                    );
                }
            });
            const label = document.createElement("span");
            label.textContent = pagina.nombre;
            item.appendChild(checkbox);
            item.appendChild(label);
            contenedorPaginas.appendChild(item);
        });
    }
    const paginasGuardadas = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
    if (paginasGuardadas.length > 0) {
        cargarPaginasEnSelect(paginasGuardadas);
        mostrarPaginasEnContenedor(paginasGuardadas);
    }
    btnCrear.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();
        const principal = selectPrincipal.value;
        const icono = selectIcono.value;
        if (nombre === "" && paginasSeleccionadas.length === 0 && icono === "") {
            mostrarMensaje("No hay ninguna plataforma", "error");
            return;
        }
        if (nombre === "") {
            mostrarMensaje("Debes escribir el nombre de la plataforma", "error");
            return;
        }
        if (paginasSeleccionadas.length === 0) {
            mostrarMensaje("Debes seleccionar al menos una página", "error");
            return;
        }
        const plataforma = { nombre, principal, icono, paginas: paginasSeleccionadas };
        const MAX_PLATAFORMAS = 12;
        const plataformas = JSON.parse(localStorage.getItem("_plataforma_tablero")) || [];
        if (plataformas.length >= MAX_PLATAFORMAS) {
            mostrarMensaje("Has alcanzado el máximo de datos en el tablero", "warning");
            return;
        }
        plataformas.push(plataforma);
        localStorage.setItem("_plataforma_tablero", JSON.stringify(plataformas));
        document.dispatchEvent(new Event("actualizar_tablero_plataforma"));
        mostrarMensaje("Plataforma creada y enviada al tablero", "exito");
        paginasSeleccionadas = [];
        inputNombre.value = "";
        selectPrincipal.value = "";
        selectIcono.value = "";
        contenedorPaginas.innerHTML = "";
    });
});
//-----------------------------------------------//
//--|funcionalidad_plataforma_en_actualizacion|--//
//-----------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 Script plataforma_en_actualizacion cargado.");
    const btnDesplegar = document.querySelector(".btn-desplegar");
    const contenidoVista = document.querySelector(".contenido-vista");
    const contenedorBlanco = document.querySelector(".contenedor-blanco");
    let desplegado = true;
    function mostrarMensaje(texto, tipo = "info") {
        const estado = document.getElementById("estadoEdicion");
        if (!estado) return;
        estado.innerHTML = "";
        const mensaje = document.createElement("div");
        mensaje.classList.add("mensaje", tipo);
        mensaje.textContent = texto;
        estado.appendChild(mensaje);
    }
    btnDesplegar.addEventListener("click", () => {
        if (desplegado) {
            mostrarMensaje(
                "Plataforma contraída.",
                "info"
            );
        } else {
            contenidoVista.style.display = "block";
            mostrarMensaje(
                "Desplegando plataforma actualizada.",
                "info"
            );
        }
        desplegado = !desplegado;
    });
    function renderPlataforma(nombrePlataforma) {
        contenedorBlanco.innerHTML = `
            <div class="fila-plataforma-activa">
                <span class="nombre-plataforma">${nombrePlataforma}</span>
                <button class="btn-refrescar-plataforma" title="Actualizar">
                    <i class="fa-solid fa-arrows-rotate"></i>
                </button>
                <button class="btn-quitar-plataforma" title="Quitar">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `;
    }
    window.mostrarPlataformaSeleccionada = function (nombrePlataforma) {
        localStorage.setItem(
            "plataforma_en_actualizacion",
            JSON.stringify(nombrePlataforma)
        );
        renderPlataforma(nombrePlataforma);
        mostrarMensaje(
            `Plataforma "${nombrePlataforma}" enviada para actualización`,
            "info"
        );
    };
    const plataformaGuardada = JSON.parse(
        localStorage.getItem("plataforma_en_actualizacion")
    );
    if (plataformaGuardada) {
        renderPlataforma(plataformaGuardada);
    } else {
        contenedorBlanco.innerHTML = `
            <p class="mensaje-vacio">No hay plataformas en actualización.</p>
        `;
    }
    contenedorBlanco.addEventListener("click", (e) => {
        if (e.target.closest(".btn-refrescar-plataforma")) {
            mostrarMensaje(
                "Plataforma reenviada para actualización.",
                "info"
            );
        }
        if (e.target.closest(".btn-quitar-plataforma")) {
            localStorage.removeItem("plataforma_en_actualizacion");
            contenedorBlanco.innerHTML = `
                <p class="mensaje-vacio">No hay plataformas en actualización.</p>
            `;
            mostrarMensaje(
                "Plataforma retirada de la actualización.",
                "error"
            );
        }
    });
});
//--------------------------------------//
//--|funcionalidad_tablero_plataforma|--//
//--------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 Script de tablero_plataforma cargado correctamente.");
    const tbody = document.querySelector(".tabla-paginas tbody");
    function mostrarMensaje(texto, tipo = "info") {
        const estado = document.getElementById("estadoEdicion");
        if (!estado) return;
        estado.innerHTML = "";
        const mensaje = document.createElement("div");
        mensaje.classList.add("mensaje", tipo);
        mensaje.textContent = texto;
        estado.appendChild(mensaje);
    }
    function mostrarTableroPlataforma() {
        tbody.innerHTML = "";
        tbody.classList.remove("con-datos");
        const plataformas = JSON.parse(
            localStorage.getItem("_plataforma_tablero")
        ) || [];
        if (plataformas.length === 0) {
            const filaVacia = document.createElement("tr");
            filaVacia.classList.add("fila-vacia");
            filaVacia.innerHTML = `<td colspan="5">No hay plataformas creadas</td>`;
            tbody.appendChild(filaVacia);
            return;
        }
        tbody.classList.add("con-datos");
        plataformas.forEach((item, index) => {
            if (item.bloqueada === undefined) item.bloqueada = false;
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.nombre}</td>
                <td>${item.principal || "—"}</td>
                <td style="text-align:center;">
                    ${item.icono ? `<i class="fa-solid ${item.icono}"></i>` : "—"}
                </td>
                <td class="celda-vinculos">
                    ${item.paginas.map(p => `<span>${p}</span>`).join("")}
                </td>
                <td class="celda-acciones">
                    <button class="btn-pagina" data-index="${index}">
                        <i class="fa-solid fa-file"></i>
                    </button>
                    <button class="btn-editar1" data-index="${index}">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-agregar" data-index="${index}">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    ${
                        item.bloqueada
                        ? `<button class="btn-desbloquear" data-index="${index}">
                                <i class="fa-solid fa-lock-open"></i>
                            </button>`
                        : `<button class="btn-bloquear" data-index="${index}">
                                <i class="fa-solid fa-lock"></i>
                            </button>`
                    }
                    <button class="btn-actualizar" data-index="${index}">
                        <i class="fa-solid fa-arrows-rotate"></i>
                    </button>
                    <button class="btn-eliminar1" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(fila);
        });
        localStorage.setItem(
            "_plataforma_tablero",
            JSON.stringify(plataformas)
        );
    }
    mostrarTableroPlataforma();
    tbody.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const index = btn.dataset.index;
        let plataformas = JSON.parse(
            localStorage.getItem("_plataforma_tablero")
        ) || [];
        if (!plataformas[index]) return;
        if (btn.classList.contains("btn-pagina")) {
            if (plataformas[index].bloqueada) {
                mostrarMensaje("🔒 Esta plataforma está bloqueada", "warning");
                return;
            }
            localStorage.setItem(
                "plataforma_activa",
                JSON.stringify(plataformas[index])
            );
            window.open(
                "../../plataforma_dinamica/html/plataforma_dinamica.html",
                "_blank"
            );
        }
        if (btn.classList.contains("btn-editar1")) {
            const nombreAnterior = plataformas[index].nombre;
            const nuevoNombre = prompt(
                "Editar nombre de la plataforma:",
                nombreAnterior
            );
            if (!nuevoNombre || !nuevoNombre.trim()) return;
            plataformas[index].nombre = nuevoNombre.trim();
            localStorage.setItem(
                "_plataforma_tablero",
                JSON.stringify(plataformas)
            );
            mostrarTableroPlataforma();
            mostrarMensaje(
                `La plataforma "${nombreAnterior}" a "${nuevoNombre.trim()}" correctamente`,
                "exito"
            );
        }
        if (btn.classList.contains("btn-agregar")) {
            const plataforma = plataformas[index];
            const datosParaPestanas = plataforma.paginas.map((pagina, i) => ({
                icono: plataforma.icono || "",
                plataforma: plataforma.nombre,
                principal: plataforma.principal || "—",
                pagina: pagina,
                pestana: i + 1
            }));
            localStorage.setItem(
                "paginas_desde_tablero",
                JSON.stringify(datosParaPestanas)
            );
            mostrarMensaje(
                `Datos de "${plataforma.nombre}" enviados a pestañas`,
                "exito"
            );
        }
        if (btn.classList.contains("btn-actualizar")) {
            const nombrePlataforma = plataformas[index].nombre;
            window.mostrarPlataformaSeleccionada(nombrePlataforma);
            mostrarMensaje(
                `Plataforma "${nombrePlataforma}" enviada a la vista`,
                "info"
            );
        }
        if (btn.classList.contains("btn-bloquear")) {
            plataformas[index].bloqueada = true;
            mostrarMensaje("Se ha bloqueado la plataforma", "warning");
        }
        if (btn.classList.contains("btn-desbloquear")) {
            plataformas[index].bloqueada = false;
            mostrarMensaje("Se ha desbloqueado la plataforma", "info");
        }
        if (btn.classList.contains("btn-eliminar1")) {
            const nombrePlataforma = plataformas[index].nombre;
            plataformas.splice(index, 1);
            mostrarMensaje(
                `La plataforma "${nombrePlataforma}" ha sido eliminada`,
                "error"
            );
        }
        localStorage.setItem(
            "_plataforma_tablero",
            JSON.stringify(plataformas)
        );
        mostrarTableroPlataforma();
    });
});