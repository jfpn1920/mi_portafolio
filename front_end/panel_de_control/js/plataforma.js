//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
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
    const iconos = [
        { nombre: "Ningún icono", valor: "" },
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
    const paginasGuardadas = JSON.parse(
        localStorage.getItem("paginasAgregadasMenu")
    ) || [];
    if (paginasGuardadas.length > 0) {
        cargarPaginasEnSelect(paginasGuardadas);
        mostrarPaginasEnContenedor(paginasGuardadas);
    }
    btnCrear.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();
        const principal = selectPrincipal.value;
        const icono = selectIcono.value;
        if (nombre === "" && paginasSeleccionadas.length === 0 && icono === "") {
            alert("No hay ninguna plataforma");
            return;
        }
        if (nombre === "") {
            alert("Debes escribir el nombre de la plataforma");
            return;
        }
        if (paginasSeleccionadas.length === 0) {
            alert("Debes seleccionar al menos una página");
            return;
        }
        const plataforma = {
            nombre,
            principal,
            icono,
            paginas: paginasSeleccionadas
        };
        const MAX_PLATAFORMAS = 12;
        const plataformas = JSON.parse(
            localStorage.getItem("_plataforma_tablero")
        ) || [];
        if (plataformas.length >= MAX_PLATAFORMAS) {
            alert("⚠️ Has alcanzado el máximo de datos en el tablero");
            return;
        }
        plataformas.push(plataforma);
        localStorage.setItem(
            "_plataforma_tablero",
            JSON.stringify(plataformas)
        );
        document.dispatchEvent(
            new Event("actualizar_tablero_plataforma")
        );
        alert("✅ Plataforma creada y enviada al tablero");
        paginasSeleccionadas = [];
        inputNombre.value = "";
        selectPrincipal.value = "";
        selectIcono.value = "";
        contenedorPaginas.innerHTML = "";
    });
});
//--------------------------------------//
//--|funcionalidad_tablero_plataforma|--//
//--------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 Script de tablero_plataforma cargado correctamente.");
    const tbody = document.querySelector(".tabla-paginas tbody");
    function mensaje(texto) {
        alert(texto);
    }
    function mostrarTableroPlataforma() {
        tbody.innerHTML = "";
        const plataformas = JSON.parse(
            localStorage.getItem("_plataforma_tablero")
        ) || [];
        if (plataformas.length === 0) {
            const filaVacia = document.createElement("tr");
            filaVacia.classList.add("fila-vacia");
            filaVacia.innerHTML = `
                <td colspan="5">No hay plataformas creadas</td>
            `;
            tbody.appendChild(filaVacia);
            return;
        }
        plataformas.forEach((item, index) => {
            if (item.bloqueada === undefined) {
                item.bloqueada = false;
            }
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.nombre}</td>
                <td>${item.principal || "—"}</td>
                <td style="text-align:center;">
                    ${item.icono ? `<i class="fa-solid ${item.icono}"></i>` : "—"}
                </td>
                <td>${item.paginas.join(", ")}</td>
                <!-- 🔧 ACCIONES (VERTICAL) -->
                <td class="celda-acciones" style="text-align:center;">
                    <button class="btn-pagina" data-index="${index}" title="Abrir plataforma">
                        <i class="fa-solid fa-file"></i>
                    </button>
                    <button class="btn-editar1" data-index="${index}" title="Editar">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-visualizar1" data-index="${index}" title="Vista previa">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    ${
                        item.bloqueada
                        ? `
                            <button class="btn-desbloquear" data-index="${index}" title="Desbloquear">
                                <i class="fa-solid fa-lock-open"></i>
                            </button>
                        `
                        : `
                            <button class="btn-bloquear" data-index="${index}" title="Bloquear">
                                <i class="fa-solid fa-lock"></i>
                            </button>
                        `
                    }
                    <button class="btn-actualizar" data-index="${index}" title="Actualizar">
                        <i class="fa-solid fa-arrows-rotate"></i>
                    </button>
                    <button class="btn-eliminar1" data-index="${index}" title="Eliminar">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(fila);
        });
        localStorage.setItem("_plataforma_tablero", JSON.stringify(plataformas));
    }
    mostrarTableroPlataforma();
    document.addEventListener("actualizar_tablero_plataforma", () => {
        mostrarTableroPlataforma();
    });
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
                mensaje("🔒 Esta plataforma está bloqueada.");
                return;
            }
            localStorage.setItem(
                "plataforma_activa",
                JSON.stringify(plataformas[index])
            );
            window.location.href = "../html/plataforma_dinamica.html";
        }
        if (btn.classList.contains("btn-editar1")) {
            const nombreAnterior = plataformas[index].nombre;
            const nuevoNombre = prompt(
                "Editar nombre de la plataforma:",
                nombreAnterior
            );
            if (!nuevoNombre || !nuevoNombre.trim()) {
                mensaje("⚠️ La edición fue cancelada.");
                return;
            }
            plataformas[index].nombre = nuevoNombre.trim();
            localStorage.setItem("_plataforma_tablero", JSON.stringify(plataformas));
            mensaje(`✏️ Plataforma actualizada.`);
            mostrarTableroPlataforma();
        }
        if (btn.classList.contains("btn-visualizar1")) {
            mensaje(`👁️ Vista previa de "${plataformas[index].nombre}".`);
        }
        if (btn.classList.contains("btn-bloquear")) {
            plataformas[index].bloqueada = true;
            localStorage.setItem("_plataforma_tablero", JSON.stringify(plataformas));
            mensaje(`🔒 Plataforma bloqueada.`);
            mostrarTableroPlataforma();
        }
        if (btn.classList.contains("btn-desbloquear")) {
            plataformas[index].bloqueada = false;
            localStorage.setItem("_plataforma_tablero", JSON.stringify(plataformas));
            mensaje(`🔓 Plataforma desbloqueada.`);
            mostrarTableroPlataforma();
        }
        if (btn.classList.contains("btn-actualizar")) {
            mensaje(`🔄 Plataforma actualizada.`);
            mostrarTableroPlataforma();
        }
        if (btn.classList.contains("btn-eliminar1")) {
            const nombre = plataformas[index].nombre;
            plataformas.splice(index, 1);
            localStorage.setItem("_plataforma_tablero", JSON.stringify(plataformas));
            mensaje(`🗑️ Plataforma "${nombre}" eliminada.`);
            mostrarTableroPlataforma();
        }
    });
});