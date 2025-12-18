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