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
function mostrarMensaje(texto, tipo = "info") {
    const estado = document.getElementById("estadoEdicion");
    if (!estado) return; 
    estado.innerHTML = "";
    const mensaje = document.createElement("div");
    mensaje.classList.add("mensaje", tipo);
    mensaje.textContent = texto;
    estado.appendChild(mensaje);
}
//-----------------------------------//
//--|funcionalidad_agregar_paginas|--//
//-----------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const botonCrear = document.querySelector(".crear");
    const inputPagina = document.querySelector(".campo input");
    const LIMITE_PAGINAS = 10;
    console.log("Script de agregar página cargado correctamente ✅");
    botonCrear.addEventListener("click", () => {
        const nombrePagina = inputPagina.value.trim();
        if (nombrePagina === "") {
            mostrarMensaje(
                "Debes escribir el nombre de la página para poder crearla",
                "error"
            );
            return;
        }
        let paginas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
        if (paginas.length >= LIMITE_PAGINAS) {
            mostrarMensaje(
                "Has alcanzado el límite máximo de 10 páginas permitidas en el tablero.",
                "warning"
            );
            return;
        }
        paginas.push({
            nombre: nombrePagina,
            fecha: new Date().toLocaleString()
        });
        localStorage.setItem("paginasCreadas", JSON.stringify(paginas));
        mostrarMensaje(
            `La página "${nombrePagina}" ha sido creada exitosamente`,
            "success"
        );
        inputPagina.value = "";
    });
});
//--------------------------------------------//
//--|funcionalidad_crear_menu_de_navegacion|--//
//--------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script del menú de navegación cargado correctamente ✅");
    const btnCrearMenu = document.querySelector(".crear1");
    const inputNombreMenu = document.querySelector(".campo-titulo1 input");
    const listaPaginas = document.querySelector(".lista-paginas1");
    const cajasLogo = document.querySelectorAll(".caja1");
    const cajasIconos = document.querySelectorAll(".caja2");
    const modalIconos = document.getElementById("modalIconos");
    const cerrarModal = document.getElementById("cerrarModal");
    let cajaSeleccionada = null;
    let menuActual = {
        nombre: "",
        logo: null,
        iconos: [],
        paginasSeleccionadas: []
    };
    function cargarPaginasDisponibles() {
        listaPaginas.innerHTML = "";
        const paginasAgregadas = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
        if (paginasAgregadas.length === 0) {
            listaPaginas.innerHTML = `<p style="text-align:center; opacity:0.6;">No hay páginas añadidas aún.</p>`;
            mostrarMensaje("No hay páginas añadidas aún para crear un menú.", "warning");
            return;
        }
        paginasAgregadas.forEach((pagina) => {
            const item = document.createElement("div");
            item.classList.add("item-pagina1");
            item.innerHTML = `
                <label>
                    <input type="checkbox" class="check-pagina1" value="${pagina.nombre}">
                    ${pagina.nombre}
                </label>
            `;
            listaPaginas.appendChild(item);
        });
        listaPaginas.querySelectorAll(".check-pagina1").forEach(check => {
            check.addEventListener("change", () => {
                const nombrePagina = check.value;
                if (check.checked) {
                    menuActual.paginasSeleccionadas.push(nombrePagina);
                } else {
                    menuActual.paginasSeleccionadas = menuActual.paginasSeleccionadas.filter(p => p !== nombrePagina);
                }
                console.log(" Páginas seleccionadas:", menuActual.paginasSeleccionadas);
            });
        });
        mostrarMensaje("Páginas cargadas correctamente.", "success");
    }
    window.agregarPaginaAlMenu = function(nombrePagina) {
        let paginasAgregadas = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
        if (paginasAgregadas.some(p => p.nombre === nombrePagina)) {
            mostrarMensaje(`La página "${nombrePagina}" ya está en la lista de selección.`, "info");
            return;
        }
        paginasAgregadas.push({ nombre: nombrePagina });
        localStorage.setItem("paginasAgregadasMenu", JSON.stringify(paginasAgregadas));
        mostrarMensaje(`Página "${nombrePagina}" añadida correctamente a la lista.`, "success");
        cargarPaginasDisponibles();
    };
    function abrirModalParaCaja(caja) {
        cajaSeleccionada = caja;
        modalIconos.style.display = "flex";
    }
    cajasLogo.forEach(caja => caja.addEventListener("click", () => abrirModalParaCaja(caja)));
    cajasIconos.forEach(caja => caja.addEventListener("click", () => abrirModalParaCaja(caja)));
    document.querySelectorAll(".iconos-grid i").forEach(icono => {
        icono.addEventListener("click", () => {
            if (cajaSeleccionada) {
                const nombreIcono = icono.className;
                cajaSeleccionada.innerHTML = `<i class="${nombreIcono}"></i>`;
                modalIconos.style.display = "none";
                if (cajaSeleccionada.classList.contains("caja1")) {
                    menuActual.logo = nombreIcono;
                    mostrarMensaje("Logo seleccionado correctamente.", "success");
                }
                if (cajaSeleccionada.classList.contains("caja2")) {
                    if (!menuActual.iconos.includes(nombreIcono)) {
                        menuActual.iconos.push(nombreIcono);
                        mostrarMensaje("Icono añadido correctamente.", "success");
                    } else {
                        mostrarMensaje("Ese icono ya está seleccionado.", "info");
                    }
                }
            }
        });
    });
    cerrarModal.addEventListener("click", () => modalIconos.style.display = "none");
    btnCrearMenu.addEventListener("click", () => {
        menuActual.nombre = inputNombreMenu.value.trim();
        if (!menuActual.nombre) {
            mostrarMensaje("Por favor, escribe un nombre para el menú.", "error");
            return;
        }
        if (menuActual.paginasSeleccionadas.length === 0) {
            mostrarMensaje("Selecciona al menos una página para el menú.", "warning");
            return;
        }
        const menuesGuardados = JSON.parse(localStorage.getItem("menusCreados")) || [];
        if (menuesGuardados.length >= 2) {
            mostrarMensaje(
                "Has alcanzado el límite máximo de 2 menús de navegación.",
                "error"
            );
            return;
        }
        menuesGuardados.push(menuActual);
        localStorage.setItem("menusCreados", JSON.stringify(menuesGuardados));
        mostrarMensaje(`Menú "${menuActual.nombre}" creado correctamente.`, "success");
        const evento = new CustomEvent("menuCreado", { detail: menuActual });
        window.dispatchEvent(evento);
        menuActual = { nombre: "", logo: null, iconos: [], paginasSeleccionadas: [] };
        inputNombreMenu.value = "";
        listaPaginas.querySelectorAll(".check-pagina1").forEach(c => c.checked = false);
        cajasLogo.forEach(c => c.innerHTML = "+");
        cajasIconos.forEach(c => c.innerHTML = "+");
    });
    cargarPaginasDisponibles();
});
//---------------------------//
//--|funcionalidad_submenu|--//
//---------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script del submenu cargado correctamente.");
    const btnCrearSubmenu = document.querySelector(".submenu-create-btn");
    const selectSubmenu = document.getElementById("selectSubmenu");
    const listaSubmenu = document.querySelector(".submenu-list");
    function cargarSubmenus() {
        const paginasAgregadas = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
        selectSubmenu.innerHTML = `<option selected>Seleccionar submenu</option>`;
        listaSubmenu.innerHTML = "";
        if (paginasAgregadas.length === 0) {
            listaSubmenu.innerHTML = `<p style="text-align:center; margin-top:10px;">No hay submenús disponibles.</p>`;
            mostrarMensaje("No hay páginas agregadas al menú para crear submenús.", "warning");
            return;
        }
        paginasAgregadas.forEach((pagina) => {
            const option = document.createElement("option");
            option.textContent = pagina.nombre;
            selectSubmenu.appendChild(option);
        });
        paginasAgregadas.forEach((pagina) => {
            const item = document.createElement("label");
            item.classList.add("submenu-item");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("check-submenu");
            checkbox.value = pagina.nombre;
            const texto = document.createElement("span");
            texto.textContent = pagina.nombre;
            item.appendChild(checkbox);
            item.appendChild(texto);
            listaSubmenu.appendChild(item);
        });
        mostrarMensaje("Submenús cargados correctamente.", "success");
    }
    listaSubmenu.addEventListener("change", (e) => {
        if (e.target.classList.contains("check-submenu")) {
            const nombre = e.target.value;
            if (e.target.checked) {
                mostrarMensaje(`Página "${nombre}" añadida al submenú.`, "info");
            } else {
                mostrarMensaje(`Página "${nombre}" deseleccionada.`, "warning");
            }
        }
    });
    btnCrearSubmenu.addEventListener("click", () => {
        const nombreSubmenu = selectSubmenu.value;
        const checkboxesSeleccionados = document.querySelectorAll(".check-submenu:checked");
        if (nombreSubmenu === "Seleccionar submenu" || nombreSubmenu.trim() === "") {
            mostrarMensaje(" No hay nombre de submenú seleccionado.", "error");
            return;
        }
        if (checkboxesSeleccionados.length === 0) {
            mostrarMensaje(" No has seleccionado ninguna página para el submenú.", "error");
            return;
        }
        const paginasSeleccionadas = Array.from(checkboxesSeleccionados).map(cb => cb.value);
        const nuevoSubmenu = {
            nombre: nombreSubmenu,
            paginas: paginasSeleccionadas
        };
        const submenusGuardados = JSON.parse(localStorage.getItem("submenusCreados")) || [];
        submenusGuardados.push(nuevoSubmenu);
        localStorage.setItem("submenusCreados", JSON.stringify(submenusGuardados));
        const evento = new CustomEvent("submenuCreado", { detail: nuevoSubmenu });
        window.dispatchEvent(evento);
        mostrarMensaje(`Submenú "${nombreSubmenu}" creado correctamente.`, "success");
        checkboxesSeleccionados.forEach(cb => cb.checked = false);
        selectSubmenu.selectedIndex = 0;
    });
    window.addEventListener("storage", (e) => {
        if (e.key === "paginasAgregadasMenu") {
            cargarSubmenus();
        }
    });
    cargarSubmenus();
});
//----------------------------------------------//
//--|funcionalidad_tablero_de_paginas_creados|--//
//----------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const btnAgregarTodo = document.querySelector(".btn-agregar");
    const tablaBody = document.querySelector(".tabla-paginas tbody");
    console.log("Script del tablero cargado correctamente ✅");
    function mostrarPaginas() {
        tablaBody.innerHTML = "";
        const paginas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
        if (paginas.length === 0) {
            const filaVacia = document.createElement("tr");
            filaVacia.innerHTML = `<td colspan="2" style="text-align:center;">No hay páginas creadas</td>`;
            tablaBody.appendChild(filaVacia);
            mostrarMensaje("No hay páginas creadas", "error");
            return;
        }
        paginas.forEach((pagina, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${pagina.nombre}</td>
                <td>
                    <button class="btn-editar" data-index="${index}" title="Editar nombre">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-visualizar" data-index="${index}" title="Visualizar página">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn-eliminar" data-index="${index}" title="Eliminar página">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn-anadir" data-index="${index}" title="Añadir al menú">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </td>
            `;
            tablaBody.appendChild(fila);
        });
    }
    tablaBody.addEventListener("click", (e) => {
        if (e.target.closest(".btn-eliminar")) {
            const index = e.target.closest(".btn-eliminar").dataset.index;
            let paginas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
            const nombreEliminado = paginas[index].nombre;
            paginas.splice(index, 1);
            localStorage.setItem("paginasCreadas", JSON.stringify(paginas));
            let paginasAgregadas = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
            paginasAgregadas = paginasAgregadas.filter(p => p.nombre !== nombreEliminado);
            localStorage.setItem("paginasAgregadasMenu", JSON.stringify(paginasAgregadas));
            window.dispatchEvent(new StorageEvent("storage", {
                key: "paginasAgregadasMenu",
                newValue: JSON.stringify(paginasAgregadas)
            }));
            mostrarMensaje(`La página "${nombreEliminado}" ha sido eliminada`, "warning");
            mostrarPaginas();
        }
        if (e.target.closest(".btn-anadir")) {
            const index = e.target.closest(".btn-anadir").dataset.index;
            const paginas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
            const pagina = paginas[index];
            let paginasAgregadas = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
            if (paginasAgregadas.some(p => p.nombre === pagina.nombre)) {
                mostrarMensaje(`La página "${pagina.nombre}" ya está añadida al menú`, "info");
                return;
            }
            paginasAgregadas.push({ nombre: pagina.nombre });
            localStorage.setItem("paginasAgregadasMenu", JSON.stringify(paginasAgregadas));
            window.dispatchEvent(new StorageEvent("storage", {
                key: "paginasAgregadasMenu",
                newValue: JSON.stringify(paginasAgregadas)
            }));
            mostrarMensaje(`Página "${pagina.nombre}" añadida correctamente al menú`, "success");
        }
        if (e.target.closest(".btn-editar")) {
            const index = e.target.closest(".btn-editar").dataset.index;
            let paginas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
            const nombreActual = paginas[index].nombre;
            const nuevoNombre = prompt(`Editar nombre de la página "${nombreActual}":`, nombreActual);
            if (!nuevoNombre || nuevoNombre.trim() === "") {
                mostrarMensaje("El nombre no puede estar vacío.", "warning");
                return;
            }
            if (paginas.some((p, i) => p.nombre === nuevoNombre && i !== parseInt(index))) {
                mostrarMensaje(`Ya existe una página con el nombre "${nuevoNombre}".`, "error");
                return;
            }
            paginas[index].nombre = nuevoNombre.trim();
            localStorage.setItem("paginasCreadas", JSON.stringify(paginas));
            mostrarPaginas();
            mostrarMensaje(`El nombre de la página fue cambiado a "${nuevoNombre}".`, "success");
        }
        if (e.target.closest(".btn-visualizar")) {
            const index = e.target.closest(".btn-visualizar").dataset.index;
            const paginas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
            const pagina = paginas[index];
            mostrarMensaje(`Vista previa de "${pagina.nombre}"`, "info");
        }
    });
    btnAgregarTodo.addEventListener("click", () => {
        const paginas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
        if (paginas.length === 0) {
            mostrarMensaje("No hay páginas creadas para agregar", "error");
            return;
        }
        let paginasAgregadas = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
        const nuevasPaginas = paginas.filter(
            pagina => !paginasAgregadas.some(p => p.nombre === pagina.nombre)
        );
        if (nuevasPaginas.length === 0) {
            mostrarMensaje("Todas las páginas ya están agregadas", "info");
            return;
        }
        paginasAgregadas = [...paginasAgregadas, ...nuevasPaginas];
        localStorage.setItem("paginasAgregadasMenu", JSON.stringify(paginasAgregadas));
        localStorage.setItem("paginasAgregadasMenu_updatedAt", Date.now().toString());
        document.dispatchEvent(
            new CustomEvent("actualizar_lista_paginas", {
                detail: paginasAgregadas
            })
        );
        document.dispatchEvent(
            new CustomEvent("enviar_paginas_a_formulario", {
                detail: paginasAgregadas
            })
        );
        mostrarMensaje(`Se han agregado ${nuevasPaginas.length} páginas`, "success");
        mostrarPaginas();
    });
    mostrarPaginas();
});
//-----------------------------------------------------//
//--|funcionalidad_despliegue_del_menu_de_navegacion|--//
//-----------------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script del despliegue cargado correctamente.");
    const btnDespliegue = document.querySelector(".btn");
    const tablaBody = document.querySelector(".tabla-menu tbody");
    const nombreMenuActual = document.getElementById("nombreMenuActual");
    function mostrarMensaje(texto, tipo = "info") {
        const estado = document.getElementById("estadoEdicion");
        if (!estado) return;
        estado.innerHTML = "";
        const mensaje = document.createElement("div");
        mensaje.classList.add("mensaje", tipo);
        mensaje.textContent = texto;
        estado.appendChild(mensaje);
    }
    function mostrarMenu(dataMenus, dataSubmenus) {
        tablaBody.innerHTML = "";
        if (!dataMenus || dataMenus.length === 0) {
            tablaBody.innerHTML = `
                <tr>
                    <td colspan="6">No hay menu de navegacion disponible</td>
                </tr>
            `;
            nombreMenuActual.textContent = "Sin menú";
            mostrarMensaje("No hay menús disponibles para mostrar.", "warning");
            return false;
        }
        mostrarMensaje("Menú de navegación cargado correctamente.", "success");
        dataMenus.forEach((item, index) => {
            const logo = item.logo || "fa-solid fa-circle-question";
            const paginas = Array.isArray(item.paginasSeleccionadas)
                ? item.paginasSeleccionadas
                : [];
            const nombreMenu = item.nombre || item.nombreMenu || "Sin menú";
            const iconos = Array.isArray(item.iconos)
                ? item.iconos
                : [];
            const submenus = dataSubmenus || [];
            const listaSubmenus = submenus.length
                ? submenus.map(s => `
                    <div class="submenu-item2"
                        data-nombre="${s.nombre}"
                        data-opciones='${JSON.stringify(s.paginas)}'>
                        ${s.nombre}
                    </div>
                `).join("")
                : "—";
            nombreMenuActual.textContent = nombreMenu;
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td style="font-weight:bold;">${nombreMenu}</td>
                <td><i class="${logo}"></i></td>
                <td>
                    ${paginas.length
                        ? `<ul>${paginas.map(p => `<li>${p}</li>`).join("")}</ul>`
                        : "—"}
                </td>
                <td>${listaSubmenus}</td>
                <td>
                    ${iconos.length
                        ? iconos.map(ic => `<i class="${ic}" style="margin: 5px 6px;"></i>`).join("")
                        : "—"}
                </td>
                <td>
                    <i class="fa-solid fa-plus accion-agregar" title="Añadir"></i>
                    <i class="fa-solid fa-pen accion-editar" title="Editar"></i>
                    <i class="fa-solid fa-trash accion-eliminar" title="Eliminar"></i>
                </td>
            `;
            tablaBody.appendChild(fila);
            fila.querySelector(".accion-agregar").addEventListener("click", () => {
                mostrarMensaje(
                    `El menú de navegación "${nombreMenu}" se ha desplegado correctamente.`,
                    "success"
                );
            });
            fila.querySelector(".accion-editar").addEventListener("click", () => {
                const nuevoNombre = prompt(
                    `Editar menú de navegación:\n\nMenú actual: "${nombreMenu}"`,
                    nombreMenu
                );
                if (!nuevoNombre || nuevoNombre.trim() === nombreMenu) {
                    mostrarMensaje("Edición cancelada o sin cambios.", "warning");
                    return;
                }
                const menus = JSON.parse(localStorage.getItem("menusCreados")) || [];
                menus[index].nombre = nuevoNombre.trim();
                localStorage.setItem("menusCreados", JSON.stringify(menus));
                mostrarMensaje(
                    `El menú "${nombreMenu}" fue editado correctamente a "${nuevoNombre}".`,
                    "success"
                );
                cargarMenus();
            });
            fila.querySelector(".accion-eliminar").addEventListener("click", () => {
                const confirmar = confirm(`¿Seguro que deseas eliminar el menú "${nombreMenu}"?`);
                if (!confirmar) {
                    mostrarMensaje("Eliminación cancelada por el usuario.", "info");
                    return;
                }
                const menus = JSON.parse(localStorage.getItem("menusCreados")) || [];
                menus.splice(index, 1);
                localStorage.setItem("menusCreados", JSON.stringify(menus));
                mostrarMensaje(
                    `El menú "${nombreMenu}" fue eliminado correctamente.`,
                    "warning"
                );         
                cargarMenus();
            });
        });
        return true;
    }
    function cargarMenus() {
        const menuesGuardados = JSON.parse(localStorage.getItem("menusCreados")) || [];
        const submenusGuardados = JSON.parse(localStorage.getItem("submenusCreados")) || [];
        return mostrarMenu(menuesGuardados, submenusGuardados);
    }
    btnDespliegue.addEventListener("click", () => {
        const desplegado = cargarMenus();
        const nombreMenu = nombreMenuActual.textContent || "Sin menú";
        if (desplegado) {
            mostrarMensaje(
                `El menú de navegación "${nombreMenu}" se ha desplegado completamente.`,
                "success"
            );
        }
    });
    window.addEventListener("submenuCreado", cargarMenus);
    window.addEventListener("menuCreado", cargarMenus);
    cargarMenus();
    console.log("✅ Funcionalidad del despliegue lista.");
});