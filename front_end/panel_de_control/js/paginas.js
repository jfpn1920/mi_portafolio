//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//-----------------------------------//
//--|funcionalidad_agregar_paginas|--//
//-----------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const botonCrear = document.querySelector(".crear");
    const inputPagina = document.querySelector(".campo input");
    const LIMITE_PAGINAS = 18;
    console.log("Script de agregar página cargado correctamente ✅");
    botonCrear.addEventListener("click", () => {
        const nombrePagina = inputPagina.value.trim();
        if (nombrePagina === "") {
            alert("Debes escribir el nombre de la página para poder crearla.");
            return;
        }
        let paginas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
        if (paginas.length >= LIMITE_PAGINAS) {
            alert("No puedes agregar más páginas. Has alcanzado el límite máximo permitido.");
            return;
        }
        paginas.push({
            nombre: nombrePagina,
            fecha: new Date().toLocaleString()
        });
        localStorage.setItem("paginasCreadas", JSON.stringify(paginas));
        alert(`La página "${nombrePagina}" ha sido creada exitosamente.`);
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
                console.log("📄 Páginas seleccionadas:", menuActual.paginasSeleccionadas);
            });
        });
    }
    window.agregarPaginaAlMenu = function(nombrePagina) {
        let paginasAgregadas = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
        if (paginasAgregadas.some(p => p.nombre === nombrePagina)) {
            alert(`La página "${nombrePagina}" ya está en la lista de selección.`);
            return;
        }
        paginasAgregadas.push({ nombre: nombrePagina });
        localStorage.setItem("paginasAgregadasMenu", JSON.stringify(paginasAgregadas));
        alert(`Página "${nombrePagina}" añadida a la sección de selección.`);
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
                    console.log("🖼️ Logo seleccionado:", menuActual.logo);
                }
                if (cajaSeleccionada.classList.contains("caja2")) {
                    if (!menuActual.iconos.includes(nombreIcono)) {
                        menuActual.iconos.push(nombreIcono);
                    }
                    console.log("🎨 Iconos seleccionados:", menuActual.iconos);
                }
            }
        });
    });
    cerrarModal.addEventListener("click", () => modalIconos.style.display = "none");
    btnCrearMenu.addEventListener("click", () => {
        menuActual.nombre = inputNombreMenu.value.trim();
        if (!menuActual.nombre) {
            alert("Por favor, escribe un nombre para el menú.");
            return;
        }
        if (menuActual.paginasSeleccionadas.length === 0) {
            alert("Selecciona al menos una página para el menú.");
            return;
        }
        const menuesGuardados = JSON.parse(localStorage.getItem("menusCreados")) || [];
        menuesGuardados.push(menuActual);
        localStorage.setItem("menusCreados", JSON.stringify(menuesGuardados));
        console.log("✅ Menú creado con éxito:", menuActual);
        alert(`Menú "${menuActual.nombre}" creado correctamente.`);
        const evento = new CustomEvent("menuCreado", { detail: menuActual });
        window.dispatchEvent(evento);
        menuActual = { nombre: "", logo: null, iconos: [], paginasSeleccionadas: [] };
        inputNombreMenu.value = "";
        listaPaginas.querySelectorAll(".check-pagina1").forEach(check => (check.checked = false));
        cajasLogo.forEach(c => (c.innerHTML = "+"));
        cajasIconos.forEach(c => (c.innerHTML = "+"));
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
    }
    listaSubmenu.addEventListener("change", (e) => {
        if (e.target.classList.contains("check-submenu")) {
            const nombre = e.target.value;
            if (e.target.checked) {
                console.log(`✅ Página "${nombre}" seleccionada para añadir al submenú.`);
            } else {
                console.log(`❌ Página "${nombre}" deseleccionada.`);
            }
        }
    });
    btnCrearSubmenu.addEventListener("click", () => {
        console.log("📌 Botón 'Crear submenu' presionado");
        const nombreSubmenu = selectSubmenu.value;
        const checkboxesSeleccionados = document.querySelectorAll(".check-submenu:checked");
        if (nombreSubmenu === "Seleccionar submenu" || nombreSubmenu.trim() === "") {
            alert("⚠️ No hay nombre de submenú seleccionado.");
            return;
        }
        if (checkboxesSeleccionados.length === 0) {
            alert("⚠️ No has seleccionado ninguna página para el submenú.");
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
        console.log(`✅ Submenú "${nombreSubmenu}" guardado con:`, paginasSeleccionadas);
        alert(`✅ Submenú "${nombreSubmenu}" creado correctamente.`);
        checkboxesSeleccionados.forEach(cb => cb.checked = false);
        selectSubmenu.selectedIndex = 0;
    });
    cargarSubmenus();
    window.addEventListener("storage", (e) => {
        if (e.key === "paginasAgregadasMenu") {
            cargarSubmenus();
        }
    });
});
//----------------------------------------------//
//--|funcionalidad_tablero_de_paginas_creados|--//
//----------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const btnAgregarTodo = document.querySelector(".btn-agregar");
    const tablaBody = document.querySelector(".tabla-paginas tbody");
    console.log("Script del tablero cargado correctamente ✅");
    const LIMITE = 18;
    function mostrarPaginas() {
        tablaBody.innerHTML = "";
        const paginas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
        if (paginas.length === 0) {
            const filaVacia = document.createElement("tr");
            filaVacia.innerHTML = `<td colspan="2" style="text-align:center;">No hay páginas creadas</td>`;
            tablaBody.appendChild(filaVacia);
            return;
        }
        paginas.forEach((pagina, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${pagina.nombre}</td>
                <td>
                    <button class="btn-eliminar" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn-anadir" data-index="${index}">
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
            alert(`La página "${nombreEliminado}" ha sido eliminada.`);
            mostrarPaginas();
        }
        if (e.target.closest(".btn-anadir")) {
            const index = e.target.closest(".btn-anadir").dataset.index;
            const paginas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
            const pagina = paginas[index];   
            alert(`Has presionado añadir en "${pagina.nombre}".`);
            let paginasAgregadas = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
            if (paginasAgregadas.some(p => p.nombre === pagina.nombre)) {
                alert(`La página "${pagina.nombre}" ya está añadida en la selección.`);
                return;
            }
            paginasAgregadas.push({ nombre: pagina.nombre });
            localStorage.setItem("paginasAgregadasMenu", JSON.stringify(paginasAgregadas));
            window.dispatchEvent(new StorageEvent("storage", { 
                key: "paginasAgregadasMenu", 
                newValue: JSON.stringify(paginasAgregadas)
            }));
            alert(`Página "${pagina.nombre}" añadida correctamente a la sección de selección.`);
        }
    });
    btnAgregarTodo.addEventListener("click", () => {
        console.log("Botón 'Agregar todo' presionado 🧩");
        const paginas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
        if (paginas.length === 0) {
            alert("⚠️ No hay páginas creadas para agregar.");
            return;
        }
        let paginasAgregadas = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
        const nuevasPaginas = paginas.filter(
            pagina => !paginasAgregadas.some(p => p.nombre === pagina.nombre)
        );
        if (nuevasPaginas.length === 0) {
            alert("ℹ️ Todas las páginas ya están agregadas.");
            return;
        }
        paginasAgregadas = [...paginasAgregadas, ...nuevasPaginas];
        localStorage.setItem("paginasAgregadasMenu", JSON.stringify(paginasAgregadas));
        mostrarPaginas();
        window.dispatchEvent(new StorageEvent("storage", { 
            key: "paginasAgregadasMenu", 
            newValue: JSON.stringify(paginasAgregadas)
        }));
        alert(`✅ Se han agregado ${nuevasPaginas.length} páginas al submenú correctamente.`);
    });
    function mostrarListaPaginas() {
        const listaPaginas = document.querySelector(".lista-paginas1");
        if (!listaPaginas) return;
        const paginasAgregadas = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
        listaPaginas.innerHTML = "";
        if (paginasAgregadas.length === 0) {
            listaPaginas.innerHTML = `<p style="text-align:center;">No hay páginas añadidas aún.</p>`;
            return;
        }
        paginasAgregadas.forEach((pagina) => {
            const item = document.createElement("div");
            item.classList.add("item-pagina");
            item.innerHTML = `
                <label>
                    <input type="checkbox" class="check-pagina" value="${pagina.nombre}">
                    ${pagina.nombre}
                </label>
            `;
            listaPaginas.appendChild(item);
        });
    }
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
    function mostrarMenu(dataMenus, dataSubmenus) {
        tablaBody.innerHTML = "";
        if (!dataMenus || dataMenus.length === 0) {
            tablaBody.innerHTML = `<tr><td colspan="4">No hay elementos en el menú</td></tr>`;
            nombreMenuActual.textContent = "Sin menú";
            return false;
        }
        dataMenus.forEach(item => {
            const logo = item.logo || "fa-solid fa-circle-question";
            const paginas = Array.isArray(item.paginasSeleccionadas)
                ? item.paginasSeleccionadas
                : (item.paginasSeleccionadas ? [item.paginasSeleccionadas] : []);
            const nombreMenu = item.nombre || item.nombreMenu || "Sin nombre";
            const iconos = Array.isArray(item.iconos)
                ? item.iconos
                : (item.iconos ? [item.iconos] : []);
            const submenus = dataSubmenus || [];
            const listaSubmenus = submenus.length
                ? submenus.map((s) => `
                    <div class="submenu-item2" 
                        data-nombre="${s.nombre}" 
                        data-opciones='${JSON.stringify(s.paginas)}'
                        style="cursor:pointer; margin:3px 0; color:#000000; text-decoration:underline;">
                        ${s.nombre}
                    </div>
                `).join("")
                : "—";
            nombreMenuActual.textContent = nombreMenu;
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <!-- Logo -->
                <td style="text-align:center; width:15%;">
                    <i class="${logo}"></i>
                </td>
                <!-- Opciones -->
                <td style="text-align:left; width:40%; padding-left:10px;">
                    ${paginas.length
                        ? `<ul style="margin:4px 0 4px 18px; padding:0; list-style:disc;">
                            ${paginas.map(p => `<li>${p}</li>`).join("")}
                            </ul>`
                        : "—"}
                </td>
                <!-- Submenú -->
                <td style="text-align:center; width:25%;">
                    ${listaSubmenus}
                </td>
                <!-- Iconos -->
                <td style="text-align:center; width:20%;">
                    ${iconos.length
                        ? iconos.map(ic => `<i class="${ic}" style="margin:0 6px;"></i>`).join("")
                        : "—"}
                </td>
            `;
            tablaBody.appendChild(fila);
            fila.querySelectorAll(".submenu-item2").forEach(submenu => {
                submenu.addEventListener("click", () => {
                    const nombre = submenu.dataset.nombre;
                    const opciones = JSON.parse(submenu.dataset.opciones);
                    alert(`📋 El submenú "${nombre}" contiene las siguientes opciones:\n\n- ${opciones.join("\n- ")}`);
                });
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
        console.log("📂 Botón 'Despliegue' presionado.");
        const exito = cargarMenus();
        if (exito) {
            const nombre = nombreMenuActual.textContent || "sin nombre";
            alert(`✅ Se ha desplegado el menú de navegación "${nombre}" con éxito.`);
        } else {
            alert("⚠️ Debes añadir los datos para así crear el menú de navegación.");
        }
    });
    window.addEventListener("submenuCreado", () => cargarMenus());
    window.addEventListener("menuCreado", () => cargarMenus());
    cargarMenus();
    console.log("✅ Funcionalidad del despliegue lista.");
});