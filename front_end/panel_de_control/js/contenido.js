//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//----------------------------------------------------//
//--|funcionalidad_edicion_predeterminada_contenido|--//
//----------------------------------------------------//
function mostrarMensaje(texto, tipo = "info") {
    const estado = document.getElementById("estadoEdicion");
    if (!estado) return; 
    estado.innerHTML = "";
    const mensaje = document.createElement("div");
    mensaje.classList.add("mensaje", tipo);
    mensaje.textContent = texto;
    estado.appendChild(mensaje);
}
//-----------------------------------------------//
//--|funcionalidad_tablero_editor_de_contenido|--//
//-----------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const previewBox = document.getElementById("previewBox");
    const tipoTexto = document.getElementById("tipoTexto");
    const tamanoTexto = document.getElementById("tamanoTexto");
    const posicionTexto = document.getElementById("posicionTexto");
    const fuenteTexto = document.getElementById("fuenteTexto");
    const contenidoSeleccionado = document.getElementById("contenidoSeleccionado");
    const btnBold = document.getElementById("btnBold");
    const btnItalic = document.getElementById("btnItalic");
    const btnStrike = document.getElementById("btnStrike");
    const btnColor = document.getElementById("btnColor");
    const btnCrear = document.getElementById("btnCrear");
    const ubicacionContenido = document.getElementById("ubicacionContenido");
    let elementoActivo = null;
    let contenedorImagenActivo = null;
    const inputImagen = document.createElement("input");
    inputImagen.type = "file";
    inputImagen.accept = "image/*";
    inputImagen.style.display = "none";
    document.body.appendChild(inputImagen);
    //-----------------------------//
    //--|solo_texto_seleccionado|--//
    //-----------------------------//
    function aplicarEstiloATextoSeleccionado(estilos = {}) {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            mostrarMensaje("Debes seleccionar el texto primero", "warning");
            return;
        }
        const range = selection.getRangeAt(0);
        if (range.collapsed) {
            mostrarMensaje("Debes seleccionar el texto primero", "warning");
            return;
        }
        if (!previewBox.contains(range.commonAncestorContainer)) return;
        const span = document.createElement("span");
        Object.keys(estilos).forEach(prop => {
            span.style[prop] = estilos[prop];
        });
        range.surroundContents(span);
        selection.removeAllRanges();
    }
    //----------------------------//
    //--|renderizar_ubicaciones|--//
    //----------------------------//
    function renderizarUbicaciones(paginas) {
        if (!ubicacionContenido) return;
        ubicacionContenido.innerHTML = "";
        if (!paginas || paginas.length === 0) {
            const option = document.createElement("option");
            option.textContent = "No hay ubicación...";
            ubicacionContenido.appendChild(option);
            return;
        }
        const opcionInicial = document.createElement("option");
        opcionInicial.textContent = "Selecciona una ubicación...";
        opcionInicial.disabled = true;
        opcionInicial.selected = true;
        ubicacionContenido.appendChild(opcionInicial);
        paginas.forEach(pagina => {
            const option = document.createElement("option");
            option.value = pagina.nombre;
            option.textContent = pagina.nombre;
            ubicacionContenido.appendChild(option);
        });
    }
    //------------------------------//
    //--|seleccionar_el_contenido|--//
    //------------------------------//
    const contenidosHTML = {
        "Contenido 1": `
            <div class="contenido1">
                <div class="columna-izquierda">
                    <div class="imagen">img</div>
                </div>
                <div class="columna-derecha">
                    <div class="titulo" contenteditable="true">Aquí irá el título</div>
                    <div class="parrafo" contenteditable="true">Aquí irá el párrafo</div>
                    <div class="subtitulo" contenteditable="true">Aquí irá el subtítulo</div>
                    <div class="botonera">
                        <button class="btn-add">+</button>
                        <button class="btn-add">+</button>
                        <button class="btn-add">+</button>
                        <button class="btn-add">+</button>
                    </div>
                </div>
            </div>
        `,
        "Contenido 2": `
            <div class="contenido2">
                <div class="columna-izquierda2">
                    <div class="titulo2" contenteditable="true">Aquí irá el título</div>
                    <div class="parrafo2" contenteditable="true">Aquí irá el párrafo</div>
                    <div class="subtitulo2" contenteditable="true">Aquí irá el subtítulo</div>
                    <div class="botonera2">
                        <button class="btn-add2">+</button>
                        <button class="btn-add2">+</button>
                        <button class="btn-add2">+</button>
                        <button class="btn-add2">+</button>
                    </div>
                </div>
                <div class="columna-derecha2">
                    <div class="imagen2">img</div>
                </div>
            </div>
        `,
        "Contenido 3": `
            <div class="contenido3">
                <div class="columna-izquierda3">
                    <div class="fila3 fila-titulo">
                        <button class="btn-add3">+</button>
                        <div class="titulo3" contenteditable="true">Aquí irá un título</div>
                    </div>
                    <div class="fila3">
                        <div class="subtitulo3" contenteditable="true">Aquí irá un subtítulo</div>
                    </div>
                    <div class="fila3 fila-botones">
                        <button class="btn-add3">+</button>
                        <button class="btn-add3">+</button>
                    </div>
                    <div class="fila3">
                        <div class="subtitulo3" contenteditable="true">Aquí irá un subtítulo</div>
                    </div>
                    <div class="fila3 fila-botones">
                        <button class="btn-add3">+</button>
                        <button class="btn-add3">+</button>
                        <button class="btn-add3">+</button>
                        <button class="btn-add3">+</button>
                        <button class="btn-add3">+</button>
                    </div>
                    <div class="fila3">
                        <div class="subtitulo3" contenteditable="true">Aquí irá un subtítulo</div>
                    </div>
                    <div class="fila3 fila-botones">
                        <button class="btn-add3">+</button>
                    </div>
                    <div class="fila3">
                        <div class="subtitulo3" contenteditable="true">Aquí irá un subtítulo</div>
                    </div>
                    <div class="fila3 fila-botones">
                        <button class="btn-add3">+</button>
                        <button class="btn-add3">+</button>
                    </div>
                </div>
                <div class="columna-derecha3">
                    <div class="titulo3-derecha" contenteditable="true">Aquí irá un título</div>
                    <div class="imagen3">
                        <div class="parrafo3" contenteditable="true">Aquí irá el párrafo</div>
                    </div>
                </div>
            </div>
        `,
        "Contenido 4": `
            <div class="contenido4">
                <h1 class="titulo-principal4" contenteditable="true">
                    aqui ira el titulo
                </h1>
                <div class="bloque4">
                    <h2 class="subtitulo4" contenteditable="true">
                        aqui ira el subtitulo
                    </h2>
                    <div class="grid4">
                        ${Array(4).fill().map(() => `
                            <div class="card4">
                                <div class="imagen4 imagen-editable" contenteditable="true">
                                    img
                                </div>
                                <div class="btn-texto4" contenteditable="true" data-tipo="boton">
                                    Visualizar proyecto
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
                <div class="bloque42">
                    <h2 class="subtitulo4" contenteditable="true">
                        aqui ira el subtitulo
                    </h2>
                    <div class="grid4">
                        ${Array(4).fill().map(() => `
                            <div class="card4">
                                <div class="imagen4 imagen-editable" contenteditable="true">
                                    img
                                </div>
                                <div class="btn-texto4" contenteditable="true" data-tipo="boton">
                                    Visualizar proyecto
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </div>
        `,
        "Contenido 5": `
            <div class="contenido5">
                <div class="barra-titulo5" contenteditable="true">
                    Anuncio de próximos proyectos
                </div>
                <div class="imagen-proximos5 imagen-editable">
                    img
                </div>
            </div>
        `,
        "Contenido 6": `
            <div class="contenido6">
                <div class="titulo-nuevos6" contenteditable="true">
                    aquí irá el título
                </div>
                <div class="grid-nuevos6">
                    <div class="card-nuevo6 imagen-editable">
                        img
                    </div>
                    <div class="card-nuevo6 imagen-editable">
                        img
                    </div>
                    <div class="card-nuevo6 imagen-editable">
                        img
                    </div>
                    <div class="card-nuevo6 imagen-editable">
                        img
                    </div>
                </div>
            </div>
        `
    };
    contenidoSeleccionado.addEventListener("change", () => {
        previewBox.innerHTML = contenidosHTML[contenidoSeleccionado.value] || "";
        elementoActivo = null;
        activarSeleccionDeTexto();
    });
    //--------------------------------//
    //--|activar_seleccion_de_texto|--//
    //--------------------------------//
    function activarSeleccionDeTexto() {
        const editables = previewBox.querySelectorAll("[contenteditable='true']");
        editables.forEach(el => {
            el.addEventListener("click", e => {
                e.stopPropagation();
                elementoActivo = el;
            });
        });
    }
    //---------------------------//
    //--|seleccion_de_imagenes|--//
    //---------------------------//
    previewBox.addEventListener("mousedown", e => {
        const elemento = e.target.closest(`
            .imagen,
            .imagen2,
            .imagen3,
            .imagen-editable,
            contenteditable,
            .imagen4,
            .imagen-proximos5,
            .card-nuevo6,
            .btn-add,
            .btn-add2,
            .btn-add3
        `);
        if (!elemento) return;
        if (elemento.hasAttribute("contenteditable")) {
            e.preventDefault();
            elemento.blur();
        }
        contenedorImagenActivo = elemento;
        inputImagen.click();
    });
    inputImagen.addEventListener("change", () => {
        if (!contenedorImagenActivo) return;
        const file = inputImagen.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            contenedorImagenActivo.innerHTML = `
                <img src="${reader.result}" style="width:100%;height:100%;object-fit:cover;">
            `;
        };
        reader.readAsDataURL(file);
        inputImagen.value = "";
    });
    //-----------------------//
    //--|control_del_texto|--//
    //-----------------------//
    tipoTexto.addEventListener("change", () => {
        const tamanos = {
            "Título": "32px",
            "Subtítulo": "22px",
            "Párrafo": "16px"
        };
        aplicarEstiloATextoSeleccionado({ fontSize: tamanos[tipoTexto.value] });
    });
    tamanoTexto.addEventListener("change", () => {
        aplicarEstiloATextoSeleccionado({
            fontSize: tamanoTexto.value.replace(" px", "px")
        });
    });
    fuenteTexto.addEventListener("change", () => {
        aplicarEstiloATextoSeleccionado({ fontFamily: fuenteTexto.value });
    });
    posicionTexto.addEventListener("change", () => {
        if (!elementoActivo) return;
        elementoActivo.style.textAlign =
            posicionTexto.value === "Centro" ? "center" :
            posicionTexto.value === "Derecha" ? "right" :
            posicionTexto.value === "Justificado" ? "justify" : "left";
    });
    //-----------------------//
    //--|formato_del_texto|--//
    //-----------------------//
    btnBold.addEventListener("click", () => {
        aplicarEstiloATextoSeleccionado({ fontWeight: "bold" });
    });
    btnItalic.addEventListener("click", () => {
        aplicarEstiloATextoSeleccionado({ fontStyle: "italic" });
    });
    btnStrike.addEventListener("click", () => {
        aplicarEstiloATextoSeleccionado({ textDecoration: "line-through" });
    });
    btnColor.addEventListener("click", () => {
        aplicarEstiloATextoSeleccionado({ color: "red" });
    });
    //----------------------------------//
    //--|obtener_datos_de_contenido_1|--//
    //----------------------------------//
    function obtenerDatosContenido1() {
        const contenedor = previewBox.querySelector(".contenido1");
        if (!contenedor) return null;
        const tituloEl    = contenedor.querySelector(".titulo");
        const parrafoEl   = contenedor.querySelector(".parrafo");
        const subtituloEl = contenedor.querySelector(".subtitulo");
        const titulo    = tituloEl?.innerHTML.trim() || "";
        const parrafo   = parrafoEl?.innerHTML.trim() || "";
        const subtitulo = subtituloEl?.innerHTML.trim() || "";
        const imgPrincipal = contenedor.querySelector(".imagen img");
        const imagen = imgPrincipal ? imgPrincipal.src : "";
        const botones = contenedor.querySelectorAll(".btn-add");
        const iconos = [];
        botones.forEach(btn => {
            const img = btn.querySelector("img");
            iconos.push(img ? img.src : "");
        });
        return {
            tipo: "contenido1",
            titulo,
            parrafo,
            subtitulo,
            imagen,
            iconos,
            estilos: {
                titulo: {
                    textAlign: tituloEl?.style.textAlign || "left",
                    fontFamily: tituloEl?.style.fontFamily || "",
                    fontSize: tituloEl?.style.fontSize || ""
                },
                parrafo: {
                    textAlign: parrafoEl?.style.textAlign || "left",
                    fontFamily: parrafoEl?.style.fontFamily || "",
                    fontSize: parrafoEl?.style.fontSize || ""
                },
                subtitulo: {
                    textAlign: subtituloEl?.style.textAlign || "left",
                    fontFamily: subtituloEl?.style.fontFamily || "",
                    fontSize: subtituloEl?.style.fontSize || ""
                }
            }
        };
    }
    //-------------------------------//
    //--|obtener_datos_contenido_4|--//
    //-------------------------------//
    function obtenerDatosContenido4() {
        const contenedor = previewBox.querySelector(".contenido4");
        if (!contenedor) return null;
        const tituloEl = contenedor.querySelector(".titulo-principal4");
        const titulo = tituloEl?.innerHTML.trim() || "";
        const subtitulos = Array.from(contenedor.querySelectorAll(".subtitulo4"))
            .map(el => el.innerHTML.trim());
        const grids = contenedor.querySelectorAll(".grid4");
        const imagenesBotones = [];
        grids.forEach(grid => {
            const cards = grid.querySelectorAll(".card4");
            cards.forEach(card => {
                const imgEl = card.querySelector(".imagen4 img") || card.querySelector(".imagen4");
                const btnEl = card.querySelector(".btn-texto4");
                imagenesBotones.push({
                    imagen: imgEl?.tagName === "IMG" ? imgEl.src : imgEl?.innerHTML.trim() || "",
                    boton: btnEl?.innerHTML.trim() || ""
                });
            });
        });
        return {
            tipo: "contenido4",
            titulo,
            subtitulos,
            imagenesBotones
        };
    }
    //---------------------------//
    //--|boton_crear_contenido|--//
    //---------------------------//
    btnCrear.addEventListener("click", () => {
        if (!previewBox.innerHTML.trim()) {
            mostrarMensaje("Debes crear contenido antes de continuar", "error");
            return;
        }
        let datos = null;
        if (contenidoSeleccionado.value === "Contenido 1") {
            datos = obtenerDatosContenido1();
        } else if (contenidoSeleccionado.value === "Contenido 4") {
            datos = obtenerDatosContenido4();
        }
        if (!datos) {
            mostrarMensaje("No se pudieron obtener los datos", "error");
            return;
        }
        const todosLosContenidos = JSON.parse(localStorage.getItem("contenido_publicado")) || {};
        todosLosContenidos[datos.tipo] = datos;
        localStorage.setItem("contenido_publicado", JSON.stringify(todosLosContenidos));
        mostrarMensaje("El contenido fue creado con éxito", "success");
    });
    //--------------------------------------//
    //--|recibe_las_paginas_desde_tablero|--//
    //--------------------------------------//
    document.addEventListener("enviar_paginas_a_formulario", (e) => {
        renderizarUbicaciones(e.detail);
        mostrarMensaje("Ubicaciones actualizadas correctamente", "success");
    });
    //----------------------------------//
    //--|cargar_ubicaciones_guardadas|--//
    //----------------------------------//
    const paginasGuardadas = JSON.parse(
        localStorage.getItem("paginasAgregadasMenu")
    ) || [];
    renderizarUbicaciones(paginasGuardadas);
});