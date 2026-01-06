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
const paginasDesdeTablero = JSON.parse(
    localStorage.getItem("paginas_desde_tablero")
) || [];
function crearPestanaHTML(paginaData) {
    const pagina = document.createElement("div");
    pagina.classList.add("pagina-item");
    pagina.innerHTML = `
        <!------------------------------------------>
        <!--|estructura_pestañas_creados_dinamico|-->
        <!------------------------------------------>
        <button class="btn-icono">
            ${paginaData.icono
                ? `<i class="fa-solid ${paginaData.icono}"></i>`
                : "—"}
        </button>
        <div class="campo-texto nombre-sitio">
            ${paginaData.plataforma || "Sin plataforma"}
        </div>
        <div class="campo-texto pagina-web">
            ${paginaData.pagina || "Sin página"}
        </div>
        <div class="campo-texto numero-pagina">
            Pestaña ${paginaData.pestana || "Sin pestaña"}
        </div>
        <button class="btn-agregar" title="Desplegar contenido">
            <i class="fa-solid fa-plus"></i>
        </button>
        <button class="btn-marcador" title="Marcar">
            <i class="fas fa-bookmark"></i>
        </button>
        <button class="btn-borrar" title="Eliminar pestaña">
            <i class="fa-solid fa-trash"></i>
        </button>
        <div class="contenido-pestana oculto">
            <!-------------------------------------------->
            <!--|menu_de_navegacion_desplegable_ocultos|-->
            <!-------------------------------------------->
            <div class="menu-editor">
                <div class="menu-top">
                    <span class="menu-nombre">Nombre del Menú de navegación</span>
                    <button class="btn-ver">Contenido</button>
                    <button class="btn-quitar">Quitar</button>
                </div>
                <div class="menu-main">
                    <div class="menu-icono1">Icono</div>
                    <input type="text" placeholder="Nombre del sitio web" class="menu-input">
                    <button class="menu-opcion">Opción 1</button>
                    <button class="menu-opcion">Opción 2</button>
                    <button class="menu-opcion">Opción 3</button>
                    <button class="menu-opcion">Opción 4</button>
                    <button class="menu-opcion">Submenú</button>
                    <div class="menu-icono2">Ico</div>
                    <div class="menu-icono3">Ico</div>
                </div>
            </div>
            <!---------------------------------->
            <!--|carrusel_desplegable_ocultos|-->
            <!---------------------------------->
            <div class="carrusel-header">
                <input type="text" placeholder="Nombre del carrusel" class="carrusel-input">
                <button class="carrusel-btn">contenido</button>
                <button class="carrusel-btn eliminar">Quitar</button>
            </div>
            <div class="carrusel-body">
                <button class="carrusel-control left">control</button>
                <div class="carrusel-area">
                    aquí irá el carrusel
                </div>
                <button class="carrusel-control right">control</button>
                <div class="carrusel-indicadores">
                    aquí irán los indicadores
                </div>
            </div>
            <!----------------------------------->
            <!--|contenido_desplegable_ocultos|-->
            <!----------------------------------->
            <div class="editor-pagina">
                <div class="editor-wrapper">
                    <div class="editor-header">
                        <input type="text" class="editor-input" placeholder="Nombre de la página">
                        <div class="contenedor-editor">
                            <button class="editor-contenido-btn">
                                Aquí irá el contenido
                            </button>
                            <button class="editor-cerrar">X</button>
                        </div>
                        <div class="editor-acciones">
                            <button class="editor-btn1">Añadir</button>
                            <button class="editor-btn2 eliminar">Quitar</button>
                        </div>
                    </div>
                    <div class="editor-body">
                        <div class="editor-imagen">
                            aquí irá la imagen
                        </div>
                        <div class="editor-contenido2">
                            <div class="editor-titulo">aquí irá el título</div>
                            <div class="editor-parrafo">aquí irá el párrafo</div>
                            <div class="editor-subtitulo">aquí irá el subtítulo</div>
                            <div class="editor-iconos">
                                <div class="icono">icono 1</div>
                                <div class="icono">icono 2</div>
                                <div class="icono">icono 3</div>
                                <div class="icono">icono 4</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--------------------------------------->
            <!--|chatbot_fuera_desplegable_ocultos|-->
            <!--------------------------------------->
            <div class="chatbot-wrapper">
                <div class="chatbot-header">
                    <p class="chatbot-btn-fuera">Fuera del pie de pagina</p>
                    <button class="chatbot-btn-guardar">guardar</button>
                    <button class="chatbot-btn-cerrar">X</button>
                </div>
                <div class="chatbot-body">
                    <div class="chatbot-nombre">
                        nombre del chatbot
                    </div>
                    <div class="chatbot-avatar">
                        <i class="fa-solid fa-robot"></i>
                    </div>
                </div>
            </div>
            <!--------------------------------------->
            <!--|pie_de_pagina_desplegable_ocultos|-->
            <!--------------------------------------->
            <div class="header">
                <div class="title-box">Nombre pie de pagina</div>
                <div class="header-box"></div>
                <button class="btn1">Contenido</button>
                <button class="btn2">Quitar</button>
            </div>
            <div class="main-container">
                <div class="big-left-box"></div>
                <div class="top-right-box">2</div>
                <div class="chatbot-wrapper2">
                    <div class="chatbot-header2">
                        <p class="chatbot-btn-fuera2">Dentro del pie de pagina</p>
                        <button class="chatbot-btn-guardar2">guardar</button>
                        <button class="chatbot-btn-cerrar2">X</button>
                    </div>
                    <div class="chatbot-body2">
                        <div class="chatbot-nombre2">
                            nombre del chatbot
                        </div>
                        <div class="chatbot-avatar2">
                            <i class="fa-solid fa-robot"></i>
                        </div>
                    </div>
                </div>
                <div class="divider1"></div>
                <div class="mini-row-empleo">
                    <div class="mini"></div>
                    <div class="mini wide"></div>
                    <div class="mini"></div>
                    <div class="mini wide"></div>
                    <div class="mini"></div>
                    <div class="mini wide"></div>
                    <div class="mini"></div>
                    <div class="mini wide"></div>
                </div>
                <div class="columns">
                    <div class="col1">
                        <div class="item1"></div>
                        <div class="item1"></div>
                        <div class="item1"></div>
                        <div class="item1"></div>
                        <div class="item1"></div>
                    </div>
                    <div class="col2">
                        <div class="item2"></div>
                        <div class="item2"></div>
                    </div>
                    <div class="col3">
                        <div class="item3"></div>
                        <div class="item3"></div>
                        <div class="item3"></div>
                        <div class="item3"></div>
                        <div class="item3"></div>
                    </div>
                    <div class="col4">
                        <div class="item4"></div>
                        <div class="item4"></div>
                        <div class="item4"></div>
                        <div class="item4"></div>
                        <div class="item4"></div>
                    </div>
                </div>
                <div class="divider2"></div>
                <div class="bottom-box"></div>
            </div>
        </div>
    `;
    contenedorPaginas.appendChild(pagina);
}
function guardarPaginas() {
    localStorage.setItem("paginas", JSON.stringify(paginas));
}
contenedorPaginas.addEventListener("click", (e) => {
    const btnBorrar = e.target.closest(".btn-borrar");
    if (btnBorrar) {
        const paginaItem = btnBorrar.closest(".pagina-item");
        const index = [...contenedorPaginas.children].indexOf(paginaItem);
        if (index === -1) return;
        const confirmar = confirm(
            `¿Seguro que deseas eliminar la pestaña "${paginas[index].pestana}"?`
        );
        if (!confirmar) return;
        paginas.splice(index, 1);
        guardarPaginas();
        paginaItem.remove();
        return;
    }
    const btnAgregar = e.target.closest(".btn-agregar");
    if (btnAgregar) {
        const paginaItem = btnAgregar.closest(".pagina-item");
        const contenido = paginaItem.querySelector(".contenido-pestana");
        contenido.classList.toggle("oculto");
        const icono = btnAgregar.querySelector("i");
        icono.classList.toggle("fa-plus");
        icono.classList.toggle("fa-minus");
        return;
    }
    const btnGuardarContenido = e.target.closest(".btn-guardar-contenido");
    if (btnGuardarContenido) {
        const paginaItem = btnGuardarContenido.closest(".pagina-item");
        const index = [...contenedorPaginas.children].indexOf(paginaItem);
        const texto = paginaItem.querySelector("textarea").value;
        paginas[index].contenido = texto;
        guardarPaginas();
        alert("Contenido guardado correctamente ✔");
    }
});
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
            const plataformaSeleccionada = selectPestana.value;
            const yaExiste = paginas.some(
                p =>
                    p.plataforma === plataformaSeleccionada &&
                    p.pestana === pestana
            );
            if (yaExiste) {
                alert("Ya has creado esa misma pestaña");
                return;
            }
            const nuevaPagina = {
                plataforma: plataformaSeleccionada,
                pagina: "",
                pestana: pestana
            };
            paginas.push(nuevaPagina);
            guardarPaginas();
            crearPestanaHTML(nuevaPagina);
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
            plataforma: selectPestana.value || "Plataforma",
            pagina: "",
            pestana: pestana
        };
        paginas.push(pagina);
        crearPestanaHTML(pagina);
    });
    guardarPaginas();
});
window.addEventListener("DOMContentLoaded", () => {
    mostrarPestanas();
    if (paginasDesdeTablero.length > 0) {
        contenedorPaginas.innerHTML = "";
        paginas = paginasDesdeTablero;
        paginas.forEach(pagina => crearPestanaHTML(pagina));
        localStorage.setItem("paginas", JSON.stringify(paginas));
        localStorage.removeItem("paginas_desde_tablero");
    } else {
        paginas.forEach(pagina => crearPestanaHTML(pagina));
    }
});