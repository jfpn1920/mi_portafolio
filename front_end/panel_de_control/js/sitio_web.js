//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//------------------------------------//
//--|funcionalidad_crear_la_pestaña|--//
//------------------------------------//
const btnCrear = document.querySelector(".btn-crear");
const selectPestana = document.querySelector(".caja-seleccion");
const btnAccion = document.querySelector(".btn-accion");
const listadoContainer = document.querySelector(".caja-listado");
const contenedorPaginas = document.getElementById("contenedorPaginas");
let pestanas = JSON.parse(localStorage.getItem("pestanas")) || [];
let paginas = JSON.parse(localStorage.getItem("paginas")) || [];
function crearPestanaHTML(paginaData) {
    const pagina = document.createElement("div");
    pagina.classList.add("pagina-item");
    pagina.innerHTML = `
        <button class="btn-icono">ICON</button>
        <!-- PLATAFORMA -->
        <div class="campo-texto nombre-sitio">
            ${paginaData.nombre || "Sin plataforma"}
        </div>
        <!-- PESTAÑA -->
        <div class="campo-texto numero-pagina">
            ${paginaData.numero || "Sin pestaña"}
        </div>
        <button class="btn-marcador" title="Marcar">
            <i class="fas fa-bookmark"></i>
        </button>
        <button class="btn-agregar" title="Agregar">
            <i class="fas fa-plus"></i>
        </button>
    `;
    contenedorPaginas.appendChild(pagina);
}
function guardarPaginas() {
    localStorage.setItem("paginas", JSON.stringify(paginas));
}
function mostrarPestanas() {
    listadoContainer.innerHTML = "";
    if (pestanas.length === 0) {
        listadoContainer.innerHTML =
            "<p style='text-align:center; padding:10px;'>No hay pestañas guardadas.</p>";
        return;
    }
    pestanas.forEach((pestana, index) => {
        const item = document.createElement("div");
        item.classList.add("item-pestana");
        const texto = document.createElement("span");
        texto.textContent = pestana;
        const acciones = document.createElement("div");
        acciones.style.display = "flex";
        acciones.style.gap = "6px";
        const btnAgregar = document.createElement("button");
        btnAgregar.textContent = "✔";
        btnAgregar.style.cssText = `
            background:#2ecc71;
            color:#fff;
            border:none;
            border-radius:3px;
            cursor:pointer;
            width:22px;
            height:22px;
        `;
        btnAgregar.addEventListener("click", () => {
            const yaExiste = paginas.some(
                p =>
                    p.nombre === selectPestana.value &&
                    p.numero === pestana
            );
            if (yaExiste) {
                alert("Ya has creado esa misma pestaña");
                return;
            }
            const nuevaPagina = {
                nombre: selectPestana.value,
                numero: pestana             
            };
            paginas.push(nuevaPagina);
            guardarPaginas();
            crearPestanaHTML(nuevaPagina);
            alert(`La pestaña "${pestana}" fue añadida correctamente`);
        });
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.classList.add("btn-eliminar");
        btnEliminar.addEventListener("click", () => {
            pestanas.splice(index, 1);
            localStorage.setItem("pestanas", JSON.stringify(pestanas));
            mostrarPestanas();
        });
        acciones.appendChild(btnAgregar);
        acciones.appendChild(btnEliminar);
        item.appendChild(texto);
        item.appendChild(acciones);
        listadoContainer.appendChild(item);
    });
}
btnAccion.addEventListener("click", () => {
    const pestanaSeleccionada = selectPestana.value;
    if (pestanaSeleccionada === "Ninguna pestaña") {
        alert("No has seleccionado ninguna pestaña.");
        return;
    }
    if (pestanas.includes(pestanaSeleccionada)) {
        alert(`La pestaña "${pestanaSeleccionada}" ya está agregada.`);
        return;
    }
    pestanas.push(pestanaSeleccionada);
    localStorage.setItem("pestanas", JSON.stringify(pestanas));
    mostrarPestanas();
});
btnCrear.addEventListener("click", () => {
    if (pestanas.length === 0) {
        alert("No hay ninguna pestaña creada.");
        return;
    }
    contenedorPaginas.innerHTML = "";
    paginas = [];
    pestanas.forEach(pestana => {
        const pagina = {
            nombre: selectPestana.value || "Plataforma",
            numero: pestana
        };
        paginas.push(pagina);
        crearPestanaHTML(pagina);
    });
    guardarPaginas();
    alert("Se han creado todas las pestañas correctamente 🎉");
});
window.addEventListener("DOMContentLoaded", () => {
    mostrarPestanas();
    paginas.forEach(pagina => crearPestanaHTML(pagina));
});