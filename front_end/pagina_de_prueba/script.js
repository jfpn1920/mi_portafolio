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
    let elementoActivo = null;
    const inputImagen = document.createElement("input");
    inputImagen.type = "file";
    inputImagen.accept = "image/*";
    inputImagen.style.display = "none";
    document.body.appendChild(inputImagen);
    let contenedorImagenActivo = null;
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
                                <div class="imagen4" contenteditable="true">
                                    img
                                </div>
                                <button contenteditable="true">
                                    aqui ira el boton
                                </button>
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
                                <div class="imagen4" contenteditable="true">
                                    img
                                </div>
                                <button contenteditable="true">
                                    aqui ira el boton
                                </button>
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
                <div class="imagen-proximos5">
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
                    <div class="card-nuevo6">
                        img
                    </div>
                    <div class="card-nuevo6">
                        img
                    </div>
                    <div class="card-nuevo6">
                        img
                    </div>
                    <div class="card-nuevo6">
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
    previewBox.addEventListener("click", e => {
        const elemento = e.target.closest(
            ".imagen, .imagen2, .imagen3, .imagen4, .imagen-proximos5, .card-nuevo6, .btn-add, .btn-add2, .btn-add3"
        );
        if (!elemento) return;
        e.preventDefault();
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
    //---------------------------//
    //--|boton_crear_contenido|--//
    //---------------------------//
    btnCrear.addEventListener("click", () => {
        if (!previewBox.innerHTML.trim()) {
            mostrarMensaje("Debes crear contenido antes de continuar", "error");
            return;
        }
        mostrarMensaje("El contenido fue creado con éxito", "success");
    });
});