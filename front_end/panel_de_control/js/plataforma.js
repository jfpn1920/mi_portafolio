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
        if (
            nombre === "" &&
            paginasSeleccionadas.length === 0 &&
            icono === ""
        ) {
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
        console.log("Plataforma creada:", plataforma);
        alert("Se ha creado la plataforma con éxito");
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
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${item.nombre}</td>
                <td>${item.principal || "—"}</td>
                <td style="text-align:center;">
                    ${item.icono ? `<i class="fa-solid ${item.icono}"></i>` : "—"}
                </td>
                <td>${item.paginas.join(", ")}</td>
                <td style="text-align:center;">
                    <button class="btn-editar1" data-index="${index}">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-visualizar1" data-index="${index}">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn-eliminar1" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(fila);
        });
    }
    mostrarTableroPlataforma();
    document.addEventListener("actualizar_tablero_plataforma", () => {
        console.log("🔄 Evento recibido: actualizando tablero plataforma...");
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
        if (btn.classList.contains("btn-eliminar1")) {
            const nombre = plataformas[index].nombre;
            plataformas.splice(index, 1);
            localStorage.setItem(
                "_plataforma_tablero",
                JSON.stringify(plataformas)
            );
            mensaje(`🗑️ La plataforma "${nombre}" fue eliminada.`);
            mostrarTableroPlataforma();
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
            localStorage.setItem(
                "_plataforma_tablero",
                JSON.stringify(plataformas)
            );
            mensaje(
                `✏️ La plataforma "${nombreAnterior}" fue renombrada a "${nuevoNombre}".`
            );
            mostrarTableroPlataforma();
        }
        if (btn.classList.contains("btn-visualizar1")) {
            mensaje(
                `👁️ Vista previa de la plataforma "${plataformas[index].nombre}".`
            );
        }
    });
});