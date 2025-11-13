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
//----------------------------------//
//--|funcionalidad_agregar_imagen|--//
//----------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script de AGREGAR IMAGEN (Panel de Contenido) cargado correctamente.");
    const imagenBox_contenido = document.querySelector(".imagen-box");
    const botonAgregar_contenido = document.querySelector(".imagen-btn");
    const inputImagen_contenido = document.createElement("input");
    const estado_contenido = document.getElementById("estadoEdicion");
    inputImagen_contenido.type = "file";
    inputImagen_contenido.accept = "image/*";
    inputImagen_contenido.multiple = false;
    inputImagen_contenido.style.display = "none";
    document.body.appendChild(inputImagen_contenido);
    let imagenSeleccionada_contenido = null;
    function mostrarMensaje_contenido(texto, tipo = "info") {
        if (!estado_contenido) return;
        estado_contenido.innerHTML = "";
        const mensaje_contenido = document.createElement("div");
        mensaje_contenido.classList.add("mensaje", tipo);
        mensaje_contenido.innerHTML = `
            <span class="icono">
                ${tipo === "exito" ? "" :
                    tipo === "error" ? "" :
                    tipo === "info" ? "" : "💬"}
            </span>
            <span class="texto">${texto}</span>
        `;
        estado_contenido.appendChild(mensaje_contenido);
    }
    imagenBox_contenido.addEventListener("click", () => {
        inputImagen_contenido.click();
    });
    inputImagen_contenido.addEventListener("change", (e) => {
        const archivo_contenido = e.target.files[0];
        if (!archivo_contenido) return;
        const lector_contenido = new FileReader();
        lector_contenido.onload = (evento) => {
            imagenSeleccionada_contenido = evento.target.result;
            imagenBox_contenido.innerHTML = "";
            const imgPreview_contenido = document.createElement("img");
            imgPreview_contenido.src = imagenSeleccionada_contenido;
            imgPreview_contenido.style.width = "100px";
            imgPreview_contenido.style.height = "100px";
            imgPreview_contenido.style.objectFit = "cover";
            imgPreview_contenido.style.margin = "5px";
            imgPreview_contenido.style.borderRadius = "5px";
            imagenBox_contenido.appendChild(imgPreview_contenido);
        };
        lector_contenido.readAsDataURL(archivo_contenido);
        mostrarMensaje_contenido("Imagen seleccionada correctamente.", "info");
    });
    botonAgregar_contenido.addEventListener("click", () => {
        if (!imagenSeleccionada_contenido) {
            mostrarMensaje_contenido("No hay imagen seleccionada.", "error");
            return;
        }
        localStorage.setItem("imagen_contenido", imagenSeleccionada_contenido);
        localStorage.setItem("ultimaImagen_contenido", imagenSeleccionada_contenido);
        localStorage.setItem("imagen_contenido2", imagenSeleccionada_contenido);
        localStorage.setItem("ultimaImagen_contenido2", imagenSeleccionada_contenido);
        mostrarImagenGuardadaEnDivs();
        mostrarMensaje_contenido("Imagen agregada al contenido correctamente.", "exito");
        imagenBox_contenido.innerHTML = `<i class="fa-regular fa-image"></i>`;
        inputImagen_contenido.value = "";
        imagenSeleccionada_contenido = null;
    });
    function mostrarImagenGuardadaEnDivs() {
        const imgData =
            localStorage.getItem("imagen_contenido") ||
            localStorage.getItem("ultimaImagen_contenido") ||
            localStorage.getItem("ultimaImagenSeleccionada") ||
            localStorage.getItem("ultimaImagen");
        if (!imgData) return;
        const contenedores1 = document.querySelectorAll(".imagen");
        if (contenedores1.length === 0) {
            console.warn("No se encontró ningún contenedor .imagen, reintentando...");
            setTimeout(mostrarImagenGuardadaEnDivs, 300);
        } else {
            contenedores1.forEach(container => {
                container.innerHTML = "";
                const img = document.createElement("img");
                img.src = imgData;
                img.style.width = "100%";
                img.style.height = "100%";
                img.style.objectFit = "cover";
                img.style.borderRadius = "5px";
                container.appendChild(img);
            });
        }
        const contenedores2 = document.querySelectorAll(".imagen2");
        contenedores2.forEach(container => {
            container.innerHTML = "";
            const img = document.createElement("img");
            img.src = imgData;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            img.style.borderRadius = "5px";
            container.appendChild(img);
        });
        console.log("✅ Imagen restaurada correctamente en .imagen y .imagen2");
    }
    setTimeout(mostrarImagenGuardadaEnDivs, 500);
    window.addEventListener("storage", (e) => {
        if (!e.key) return;
        const clavesImagen = [
            "imagen_contenido",
            "ultimaImagen_contenido",
            "imagen_contenido2",
            "ultimaImagen_contenido2",
            "ultimaImagenSeleccionada",
            "imagenesCarrusel",
            "imagenesCarrusel2"
        ];
        if (clavesImagen.includes(e.key)) {
            setTimeout(() => {
                mostrarImagenGuardadaEnDivs();
            }, 50);
        }
    });
});
//--------------------------------------//
//--|funcionalidad_seleccionar_pagina|--//
//--------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script del panel de selección cargado correctamente.");
    const panel = document.querySelector(".panel-pagina4");
    const btnAgregar = document.querySelector(".panel-boton4");
    const contenedorCajas = document.querySelector(".panel-caja4");
    const contenedorBlanco = document.querySelector(".contenedor-blanco"); 
    const estado_contenido = document.getElementById("estadoEdicion");
    let paginaSeleccionada = null;
    function mostrarMensaje_contenido(texto, tipo = "info") {
        if (!estado_contenido) return;
        estado_contenido.innerHTML = "";
        const mensaje_contenido = document.createElement("div");
        mensaje_contenido.classList.add("mensaje", tipo);
        mensaje_contenido.innerHTML = `
            <span class="icono">
                ${tipo === "exito" ? "" :
                    tipo === "error" ? "" :
                    tipo === "info" ? "" : "💬"}
            </span>
            <span class="texto">${texto}</span>
        `;
        estado_contenido.appendChild(mensaje_contenido);
    }
    function mostrarPaginasEnPanel() {
        contenedorCajas.innerHTML = "";
        const paginas = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
        if (paginas.length === 0) {
            const mensaje = document.createElement("p");
            mensaje.textContent = "No hay páginas añadidas al panel.";
            mensaje.style.textAlign = "center";
            mensaje.style.color = "#666";
            mensaje.style.fontSize = "13px";
            contenedorCajas.appendChild(mensaje);
            mostrarMensaje_contenido(" No hay páginas añadidas al panel.", "info");
            return;
        }
        paginas.forEach(pagina => {
            const nuevaPagina = document.createElement("div");
            nuevaPagina.classList.add("pagina-item");
            nuevaPagina.textContent = pagina.nombre;
            nuevaPagina.style.padding = "8px";
            nuevaPagina.style.margin = "6px 0";
            nuevaPagina.style.borderRadius = "4px";
            nuevaPagina.style.fontSize = "13px";
            nuevaPagina.style.textAlign = "justify";
            contenedorCajas.appendChild(nuevaPagina);
        });
        mostrarMensaje_contenido("Páginas cargadas correctamente en el panel.", "exito");
    }
    function mostrarPaginasEnBlanco() {
        contenedorBlanco.innerHTML = "";
        const paginasBlanco = JSON.parse(localStorage.getItem("paginasEnBlanco")) || [];
        paginasBlanco.forEach(nombre => {
            const nuevaCaja = document.createElement("div");
            nuevaCaja.classList.add("pagina-en-blanco");
            nuevaCaja.textContent = nombre;
            nuevaCaja.style.padding = "3px 5px";
            nuevaCaja.style.margin = "0px";
            nuevaCaja.style.fontSize = "14px";
            contenedorBlanco.appendChild(nuevaCaja);
        });
        mostrarMensaje_contenido("Contenedor blanco actualizado correctamente.", "exito");
    }
    contenedorCajas.addEventListener("click", (e) => {
        if (e.target.classList.contains("pagina-item")) {
            contenedorCajas.querySelectorAll(".pagina-item").forEach(item => item.classList.remove("seleccionada"));
            e.target.classList.add("seleccionada");
            paginaSeleccionada = e.target.textContent;
            mostrarMensaje_contenido(`Página seleccionada: ${paginaSeleccionada}`, "info");
        }
    });
    btnAgregar.addEventListener("click", () => {
        if (paginaSeleccionada) {
            const paginasBlanco = JSON.parse(localStorage.getItem("paginasEnBlanco")) || [];
            if (!paginasBlanco.includes(paginaSeleccionada)) {
                paginasBlanco.push(paginaSeleccionada);
                localStorage.setItem("paginasEnBlanco", JSON.stringify(paginasBlanco));
            }
            mostrarPaginasEnBlanco();
            mostrarMensaje_contenido(` Página '${paginaSeleccionada}' agregada al contenedor blanco.`, "exito");
        } else {
            mostrarMensaje_contenido(" Debes seleccionar una página antes de agregarla.", "error");
        }
    });
    window.addEventListener("storage", (e) => {
        if (e.key === "paginasAgregadasMenu") {
            mostrarMensaje_contenido("Panel actualizado por cambio en localStorage.", "info");
            mostrarPaginasEnPanel();
        }
        if (e.key === "paginasEnBlanco") {
            mostrarMensaje_contenido("Contenedor blanco actualizado por cambio en localStorage.", "info");
            mostrarPaginasEnBlanco();
        }
    });
    const paginas = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
    btnAgregar.addEventListener("dblclick", () => {
        const nuevaPagina = { nombre: `Página ${paginas.length + 1}` };
        paginas.push(nuevaPagina);
        localStorage.setItem("paginasAgregadasMenu", JSON.stringify(paginas));
        mostrarPaginasEnPanel();
        mostrarMensaje_contenido(` Página ${nuevaPagina.nombre} creada y añadida al panel.`, "exito");
    });
    mostrarPaginasEnPanel();
    mostrarPaginasEnBlanco();
});
//-----------------------------------------------//
//--|funcionalidad_tablero_editor_de_contenido|--//
//-----------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script de contenido.js cargado correctamente.");
    const btnAgregarContenido = document.querySelector(".editor-boton5");
    const selectTipoTexto = document.querySelectorAll(".selector5")[0];
    const selectTamanoTexto = document.querySelectorAll(".selector5")[1];
    const selectOrdenTexto = document.querySelectorAll(".selector5")[2];
    const selectAjusteTexto = document.querySelectorAll(".selector5")[3];
    const botonesEstilo = document.querySelectorAll(".btn-estilo5");
    const btnContenido = document.querySelector(".columna-btn5");
    const btnEliminar = document.querySelector(".columna-btneliminar5");
    const areaContenido = document.querySelector(".contenido-area5");
    console.log("📂 Elementos del editor listos:", {
        btnAgregarContenido,
        selectTipoTexto,
        selectTamanoTexto,
        selectOrdenTexto,
        selectAjusteTexto,
        botonesEstilo,
        btnContenido,
        btnEliminar,
        areaContenido
    });
    selectTipoTexto.addEventListener("change", () => {
        const tipo = selectTipoTexto.value;
        const titulo = areaContenido.querySelector(".titulo");
        const parrafo = areaContenido.querySelector(".parrafo");
        const subtitulo = areaContenido.querySelector(".subtitulo");
        [titulo, parrafo, subtitulo].forEach(el => {
            if (el) {
                el.style.outline = "";
                el.style.backgroundColor = "";
            }
        });
        const aplicada = applyStyleToSelection(tipo);
        if (aplicada) {
            console.log(`✳️ Estilo "${tipo}" aplicado a la selección.`);
            guardarContenidoEditable();
            return;
        }
        if (tipo === "titulo" && titulo) {
            titulo.focus();
            titulo.style.outline = "2px solid #2196F3";
            titulo.style.backgroundColor = "#e3f2fd";
            console.log("🖋 Editando el TÍTULO (sin selección).");
        } 
        else if (tipo === "subtitulo" && subtitulo) {
            subtitulo.focus();
            subtitulo.style.outline = "2px solid #4CAF50";
            subtitulo.style.backgroundColor = "#e8f5e9";
            console.log("🖋 Editando el SUBTÍTULO (sin selección).");
        } 
        else if (tipo === "parrafo" && parrafo) {
            parrafo.focus();
            parrafo.style.outline = "2px solid #FF9800";
            parrafo.style.backgroundColor = "#fff3e0";
            console.log("🖋 Editando el PÁRRAFO (sin selección).");
        } 
        else {
            console.log("ℹ️ No se ha seleccionado un tipo de texto válido o el elemento no existe.");
        }
    });
    function applyStyleToSelection(tipo) {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return false;
        const range = sel.getRangeAt(0);
        if (range.collapsed) return false;
        const common = range.commonAncestorContainer;
        if (!areaContenido.contains(common)) return false;
        const span = document.createElement("span");
        span.setAttribute("data-styled", tipo);
        span.style.display = "inline";
        if (tipo === "titulo") {
            span.style.fontSize = "18px";
            span.style.fontWeight = "700";
            span.style.lineHeight = "1.1";
        } else if (tipo === "subtitulo") {
            span.style.fontSize = "14px";
            span.style.fontWeight = "600";
        } else if (tipo === "parrafo") {
            span.style.fontSize = "13px";
            span.style.fontWeight = "400";
        } else {
            return false;
        }
        try {
            const contenido = range.extractContents();
            span.appendChild(contenido);
            range.insertNode(span);
            sel.removeAllRanges();
            const newRange = document.createRange();
            newRange.setStartAfter(span);
            newRange.collapse(true);
            sel.addRange(newRange);
            span.parentNode.normalize();
            return true;
        } catch (err) {
            console.error("Error aplicando estilo a la selección:", err);
            return false;
        }
    }
    let savedRangeForSize = null;
    selectTamanoTexto.addEventListener("mousedown", () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) savedRangeForSize = sel.getRangeAt(0).cloneRange();
    });
    selectTamanoTexto.addEventListener("touchstart", () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) savedRangeForSize = sel.getRangeAt(0).cloneRange();
    });
    selectTipoTexto.addEventListener("mousedown", () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) savedRangeForSize = sel.getRangeAt(0).cloneRange();
    });
    selectTipoTexto.addEventListener("touchstart", () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) savedRangeForSize = sel.getRangeAt(0).cloneRange();
    });
    selectTamanoTexto.addEventListener("change", () => {
        const size = selectTamanoTexto.value;
        if (!size) return;
        const titulo = areaContenido.querySelector(".titulo");
        const parrafo = areaContenido.querySelector(".parrafo");
        const subtitulo = areaContenido.querySelector(".subtitulo");
        const activo = document.activeElement;
        if (activo === titulo) {
            titulo.style.fontSize = size;
            console.log(`🔠 Tamaño del TÍTULO cambiado a ${size}`);
        } 
        else if (activo === parrafo) {
            parrafo.style.fontSize = size;
            console.log(`🔠 Tamaño del PÁRRAFO cambiado a ${size}`);
        } 
        else if (activo === subtitulo) {
            subtitulo.style.fontSize = size;
            console.log(`🔠 Tamaño del SUBTÍTULO cambiado a ${size}`);
        } 
        else {
            const sel = window.getSelection();
            if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
                applySizeToRange(sel.getRangeAt(0), size);
                console.log(`✳️ Tamaño aplicado a selección actual: ${size}`);
            } else if (savedRangeForSize && !savedRangeForSize.collapsed && areaContenido.contains(savedRangeForSize.commonAncestorContainer)) {
                applySizeToRange(savedRangeForSize, size);
                console.log(`✳️ Tamaño aplicado a selección guardada: ${size}`);
                savedRangeForSize = null;
            } else {
                console.log("ℹ️ No hay selección para aplicar el tamaño.");
            }
        }
        guardarContenidoEditable();
        savedRangeForSize = null;
    });
    function applySizeToRange(range, size) {
        try {
            const span = document.createElement("span");
            span.style.fontSize = size;
            const contenido = range.extractContents();
            span.appendChild(contenido);
            range.insertNode(span);
            const sel = window.getSelection();
            sel.removeAllRanges();
            const newRange = document.createRange();
            newRange.setStartAfter(span);
            newRange.collapse(true);
            sel.addRange(newRange);
            if (span.parentNode) span.parentNode.normalize();
        } catch (err) {
            console.error("Error aplicando tamaño:", err);
        }
    }
    let savedRangeForAlign = null;
    selectOrdenTexto.addEventListener("mousedown", () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) savedRangeForAlign = sel.getRangeAt(0).cloneRange();
    });
    selectOrdenTexto.addEventListener("touchstart", () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) savedRangeForAlign = sel.getRangeAt(0).cloneRange();
    });
    selectOrdenTexto.addEventListener("change", () => {
        const orden = selectOrdenTexto.value;
        if (!orden) return;
        let alignValue = "";
        switch (orden) {
            case "izquierda": alignValue = "left"; break;
            case "centro": alignValue = "center"; break;
            case "derecha": alignValue = "right"; break;
            case "justificado": alignValue = "justify"; break;
        }
        const titulo = areaContenido.querySelector(".titulo");
        const parrafo = areaContenido.querySelector(".parrafo");
        const subtitulo = areaContenido.querySelector(".subtitulo");
        const titulo2 = areaContenido.querySelector(".titulo2");
        const parrafo2 = areaContenido.querySelector(".parrafo2");
        const subtitulo2 = areaContenido.querySelector(".subtitulo2");
        const titulo3 = areaContenido.querySelector(".titulo3");
        const subtitulos3 = areaContenido.querySelectorAll(".subtitulo3");
        const titulo3Derecha = areaContenido.querySelector(".titulo3-derecha");
        const parrafo3 = areaContenido.querySelector(".parrafo3");
        const activo = document.activeElement;
        const editables = [
            titulo, parrafo, subtitulo,
            titulo2, parrafo2, subtitulo2,
            titulo3, titulo3Derecha, parrafo3,
            ...subtitulos3
        ];
        if (editables.includes(activo)) {
            activo.style.textAlign = alignValue;
            console.log(`📏 ${activo.className.toUpperCase()} alineado a: ${orden}`);
        } 
        else {
            const sel = window.getSelection();
            const range = sel && sel.rangeCount > 0 ? sel.getRangeAt(0) : savedRangeForAlign;
            if (range && !range.collapsed && areaContenido.contains(range.commonAncestorContainer)) {
                let contenedor = range.commonAncestorContainer;
                if (contenedor.nodeType === 3) contenedor = contenedor.parentElement;
                const bloqueEditable = contenedor.closest(`
                    .titulo, .parrafo, .subtitulo,
                    .titulo2, .parrafo2, .subtitulo2,
                    .titulo3, .subtitulo3, .titulo3-derecha, .parrafo3
                `);
                if (bloqueEditable) {
                    bloqueEditable.style.textAlign = alignValue;
                    console.log(`📏 ${bloqueEditable.className.toUpperCase()} alineado (${orden}) por selección.`);
                } else {
                    console.log("ℹ️ Selección fuera de un bloque editable válido.");
                }
            } else {
                console.log("ℹ️ No hay selección ni rango válido para alinear.");
            }
        }
        guardarContenidoEditable();
        savedRangeForAlign = null;
    });
    const selectFuenteTexto = document.querySelector(".selector-fuente");
    let savedRangeForFont = null;
    selectFuenteTexto.addEventListener("mousedown", () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) savedRangeForFont = sel.getRangeAt(0).cloneRange();
    });
    selectFuenteTexto.addEventListener("touchstart", () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) savedRangeForFont = sel.getRangeAt(0).cloneRange();
    });
    selectFuenteTexto.addEventListener("change", () => {
        const fuente = selectFuenteTexto.value;
        if (!fuente) return;
        const titulo = areaContenido.querySelector(".titulo");
        const parrafo = areaContenido.querySelector(".parrafo");
        const subtitulo = areaContenido.querySelector(".subtitulo");
        const activo = document.activeElement;
        if (activo === titulo) {
            titulo.style.fontFamily = fuente;
            console.log(`🔤 Fuente del TÍTULO cambiada a ${fuente}`);
        } 
        else if (activo === parrafo) {
            parrafo.style.fontFamily = fuente;
            console.log(`🔤 Fuente del PÁRRAFO cambiada a ${fuente}`);
        } 
        else if (activo === subtitulo) {
            subtitulo.style.fontFamily = fuente;
            console.log(`🔤 Fuente del SUBTÍTULO cambiada a ${fuente}`);
        } 
        else {
            const sel = window.getSelection();
            if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
                applyFontToRange(sel.getRangeAt(0), fuente);
                console.log(`✳️ Fuente aplicada a selección: ${fuente}`);
            } else if (savedRangeForFont && !savedRangeForFont.collapsed && areaContenido.contains(savedRangeForFont.commonAncestorContainer)) {
                applyFontToRange(savedRangeForFont, fuente);
                console.log(`✳️ Fuente aplicada a selección guardada: ${fuente}`);
                savedRangeForFont = null;
            } else {
                console.log("ℹ️ No hay selección o bloque activo para aplicar la fuente.");
            }
        }
        guardarContenidoEditable();
        savedRangeForFont = null;
    });
    function applyFontToRange(range, font) {
        try {
            const span = document.createElement("span");
            span.style.fontFamily = font;
            const contenido = range.extractContents();
            span.appendChild(contenido);
            range.insertNode(span);
            const sel = window.getSelection();
            sel.removeAllRanges();
            const newRange = document.createRange();
            newRange.setStartAfter(span);
            newRange.collapse(true);
            sel.addRange(newRange);
            if (span.parentNode) span.parentNode.normalize();
        } catch (err) {
            console.error("Error aplicando fuente:", err);
        }
    }
    btnAgregarContenido.addEventListener("click", () => {
        console.log("🧩 Botón 'Agregar contenido' presionado.");
        const areaContenido = document.querySelector(".contenido-area5");
        if (areaContenido && areaContenido.innerHTML.trim() !== "") {
            alert("✅ El contenido ha sido creado con éxito.");
            console.log("✅ El contenido ha sido creado con éxito.");
        } else {
            alert("⚠️ No hay ningún contenido.");
            console.log("⚠️ No hay ningún contenido.");
        }
    });
    botonesEstilo.forEach((boton) => {
        boton.addEventListener("click", () => {
            const tipo = boton.textContent.trim().toUpperCase();
            const sel = window.getSelection();
            if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
                console.log("⚠️ No hay texto seleccionado para aplicar estilo.");
                return;
            }
            const range = sel.getRangeAt(0);
            if (!areaContenido.contains(range.commonAncestorContainer)) {
                console.log("❌ Selección fuera del área de contenido.");
                return;
            }
            let comando = "";
            switch (tipo) {
                case "B":
                    comando = "bold";
                    break;
                case "K":
                    comando = "italic";
                    break;
                case "S":
                    comando = "underline";
                    break;
                default:
                    return;
            }
            document.execCommand(comando, false, null);
            guardarContenidoEditable();
            boton.classList.toggle("activo");
            console.log(`✅ Estilo aplicado: ${tipo}`);
        });
    });
    function construirContenido(tipo) {
        console.log(`🔄 Reconstruyendo Contenido ${tipo}...`);
        if (tipo === "1") {
            const imagenesBotonera = JSON.parse(localStorage.getItem("imagenesBotonera") || "[]");
            areaContenido.innerHTML = `
                <div class="contenido1">
                    <div class="columna-izquierda">
                        <div class="imagen">Aquí irá la imagen</div>
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
            `;
            const contenedorImagen = areaContenido.querySelector(".imagen");
            const ultimaImagen = localStorage.getItem("ultimaImagenSeleccionada");
            const imagenesCarrusel = JSON.parse(localStorage.getItem("imagenesCarrusel") || "[]");
            if (imagenesCarrusel.length > 0) {
                contenedorImagen.innerHTML = imagenesCarrusel.map(
                    src => `<img src="${src}" alt="imagen carrusel" style="width:282px; border-radius:5px; margin-left:0; height: 378px;">`
                ).join("");
                console.log(`🖼️ ${imagenesCarrusel.length} imagen(es) cargadas.`);
            } else if (ultimaImagen) {
                contenedorImagen.innerHTML = `<img src="${ultimaImagen}" alt="imagen seleccionada" style="width:100%; border-radius:10px; object-fit:cover;">`;
            } else {
                contenedorImagen.innerHTML = `<p style="color:#888;">No hay imagen seleccionada aún.</p>`;
            }
            inicializarBotonera();
            restaurarImagenesEnBotones(imagenesBotonera);
            const titulo = areaContenido.querySelector(".titulo");
            const parrafo = areaContenido.querySelector(".parrafo");
            const subtitulo = areaContenido.querySelector(".subtitulo");
            limitarTexto(titulo, "Has alcanzado el máximo de espacio.");
            limitarTexto(parrafo, "Has llegado al máximo permitido.");
            limitarTexto(subtitulo, "Has alcanzado el máximo de espacio.");
            [titulo, parrafo, subtitulo].forEach((el) => {
                el.addEventListener("input", guardarContenidoEditable);
            });
            restaurarContenidoEditable();
        }
        else if (tipo === "2") {
            console.log("🔄 Reconstruyendo Contenido 2...");
            const imagenesBotonera = JSON.parse(localStorage.getItem("imagenesBotonera2") || "[]");
            areaContenido.innerHTML = `
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
                        <div class="imagen2">Aquí irá la imagen</div>
                    </div>
                </div>
            `;
            const contenedorImagen = areaContenido.querySelector(".imagen2");
            const ultimaImagen = localStorage.getItem("ultimaImagenSeleccionada2");
            const imagenesCarrusel = JSON.parse(localStorage.getItem("imagenesCarrusel2") || "[]");
            if (imagenesCarrusel.length > 0) {
                contenedorImagen.innerHTML = imagenesCarrusel.map(
                    src => `<img src="${src}" alt="imagen carrusel" style="width:100%; border-radius:8px; object-fit:cover;">`
                ).join("");
                console.log(`🖼️ ${imagenesCarrusel.length} imagen(es) cargadas (Contenido 2).`);
            } else if (ultimaImagen) {
                contenedorImagen.innerHTML = `<img src="${ultimaImagen}" alt="imagen seleccionada" style="width: 100%; border-radius:5px; object-fit:cover;">`;
            } else {
                contenedorImagen.innerHTML = `<p style="color:#fff;">Aquí irá la imagen</p>`;
            }
            inicializarBotonera2();
            restaurarImagenesEnBotones2(imagenesBotonera);
            const titulo = areaContenido.querySelector(".titulo2");
            const parrafo = areaContenido.querySelector(".parrafo2");
            const subtitulo = areaContenido.querySelector(".subtitulo2");
            limitarTexto(titulo, "Has alcanzado el máximo de espacio.");
            limitarTexto(parrafo, "Has llegado al máximo permitido.");
            limitarTexto(subtitulo, "Has alcanzado el máximo de espacio.");
            [titulo, parrafo, subtitulo].forEach((el) => {
                el.addEventListener("input", guardarContenidoEditable);
            });
            restaurarContenidoEditable();
        }
        else if (tipo === "3") {
            console.log("🔄 Reconstruyendo Contenido 3...");
            const imagenesBotonera = JSON.parse(localStorage.getItem("imagenesBotonera3") || "[]");
            areaContenido.innerHTML = `
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
            `;
            inicializarBotonera3();
            restaurarImagenesEnBotones3(imagenesBotonera);
            const titulo3 = areaContenido.querySelector(".titulo3");
            const parrafo3 = areaContenido.querySelector(".parrafo3");
            const subtitulos3 = areaContenido.querySelectorAll(".subtitulo3");
            const titulo3Derecha = areaContenido.querySelector(".titulo3-derecha");
            limitarTexto(titulo3, "Has alcanzado el máximo de espacio.");
            limitarTexto(parrafo3, "Has llegado al máximo permitido.");
            limitarTexto(titulo3Derecha, "Has alcanzado el máximo de espacio.");
            subtitulos3.forEach(s => limitarTexto(s, "Has alcanzado el máximo de espacio."));
            [titulo3, parrafo3, titulo3Derecha, ...subtitulos3].forEach((el) => {
                el.addEventListener("input", guardarContenidoEditable);
            });
            restaurarContenidoEditable();
            titulo3.addEventListener("input", () => {
                if (titulo3.textContent.length > 40) {
                    alert("⚠️ Has alcanzado el máximo permitido de 60 caracteres para el título.");
                    titulo3.textContent = titulo3.textContent.substring(0, 60);
                }
            });
            subtitulos3.forEach(sub => {
                sub.addEventListener("input", () => {
                    if (sub.textContent.length > 40) {
                        alert("⚠️ Has alcanzado el máximo permitido de 80 caracteres para el subtítulo.");
                        sub.textContent = sub.textContent.substring(0, 80);
                    }
                });
            });
            titulo3Derecha.addEventListener("input", () => {
                if (titulo3Derecha.textContent.length > 40) {
                    alert("⚠️ Has alcanzado el máximo permitido de 60 caracteres para el título derecho.");
                    titulo3Derecha.textContent = titulo3Derecha.textContent.substring(0, 60);
                }
            });
            parrafo3.addEventListener("input", () => {
                if (parrafo3.textContent.length > 1000) {
                    alert("⚠️ Has alcanzado el máximo permitido de 200 caracteres para el párrafo.");
                    parrafo3.textContent = parrafo3.textContent.substring(0, 1000);
                }
            });
        }
    }
    window.addEventListener("storage", (event) => {
        if (event.key === "ultimaImagenSeleccionada" || event.key === "imagenesCarrusel") {
            const contenedor = document.querySelector(".imagen");
            if (!contenedor) return;
            const imagenesCarrusel = JSON.parse(localStorage.getItem("imagenesCarrusel") || "[]");
            const ultimaImagen = localStorage.getItem("ultimaImagenSeleccionada");
            if (imagenesCarrusel.length > 0) {
                contenedor.innerHTML = imagenesCarrusel.map(
                    src => `<img src="${src}" alt="imagen carrusel" style="width:100%; margin-bottom:5px; border-radius:5px; object-fit:cover;">`
                ).join("");
                console.log("♻️ Carrusel actualizado.");
            } else if (ultimaImagen) {
                contenedor.innerHTML = `<img src="${ultimaImagen}" alt="imagen actualizada" style="width: 100%; border-radius:5px; object-fit:cover;">`;
            }
        }
    });
    function guardarContenidoEditable() {
        const titulo = areaContenido.querySelector(".titulo")?.innerHTML || "";
        const parrafo = areaContenido.querySelector(".parrafo")?.innerHTML || "";
        const subtitulo = areaContenido.querySelector(".subtitulo")?.innerHTML || "";
        localStorage.setItem("contenidoEditable", JSON.stringify({ titulo, parrafo, subtitulo }));
        console.log("💾 Contenido editable guardado con estilos.");
    }
    function restaurarContenidoEditable() {
        const datos = JSON.parse(localStorage.getItem("contenidoEditable"));
        if (!datos) return;
        const titulo = areaContenido.querySelector(".titulo");
        const parrafo = areaContenido.querySelector(".parrafo");
        const subtitulo = areaContenido.querySelector(".subtitulo");
        if (titulo) titulo.innerHTML = datos.titulo || "";
        if (parrafo) parrafo.innerHTML = datos.parrafo || "";
        if (subtitulo) subtitulo.innerHTML = datos.subtitulo || "";
        console.log("♻️ Contenido editable restaurado.");
    }
    function inicializarBotonera() {
        const botones = areaContenido.querySelectorAll(".btn-add");
        botones.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                console.log(`🖱️ Botón + #${index + 1} presionado.`);
                const inputFile = document.createElement("input");
                inputFile.type = "file";
                inputFile.accept = "image/*";
                inputFile.addEventListener("change", (e) => {
                    const archivo = e.target.files[0];
                    if (!archivo) return;
                    const lector = new FileReader();
                    lector.onload = (evento) => {
                        const base64 = evento.target.result;
                        btn.innerHTML = `<img src="${base64}" alt="img" style="width:100%; height:100%; object-fit:cover; border-radius:5px;">`;
                        btn.style.padding = "0";
                        const arr = JSON.parse(localStorage.getItem("imagenesBotonera") || "[]");
                        arr[index] = base64;
                        localStorage.setItem("imagenesBotonera", JSON.stringify(arr));
                    };
                    lector.readAsDataURL(archivo);
                });
                inputFile.click();
            });
        });
    }
    function restaurarImagenesEnBotones(imagenesArray) {
        if (!imagenesArray?.length) return;
        const botones = areaContenido.querySelectorAll(".btn-add");
        botones.forEach((btn, i) => {
            const b64 = imagenesArray[i];
            if (b64) {
                btn.innerHTML = `<img src="${b64}" alt="img" style="width:100%; height:100%; object-fit:cover; border-radius:5px;">`;
                btn.style.padding = "0";
            }
        });
    }
    function inicializarBotonera2() {
        const botones = areaContenido.querySelectorAll(".btn-add2");
        botones.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                console.log(`🖱️ Botón +2 #${index + 1} presionado.`);
                const inputFile = document.createElement("input");
                inputFile.type = "file";
                inputFile.accept = "image/*";
                inputFile.addEventListener("change", (e) => {
                    const archivo = e.target.files[0];
                    if (!archivo) return;
                    const lector = new FileReader();
                    lector.onload = (evento) => {
                        const base64 = evento.target.result;
                        btn.innerHTML = `<img src="${base64}" alt="img2" style="width:100%; height:100%; object-fit:cover; border-radius:5px;">`;
                        btn.style.padding = "0";
                        const arr = JSON.parse(localStorage.getItem("imagenesBotonera2") || "[]");
                        arr[index] = base64;
                        localStorage.setItem("imagenesBotonera2", JSON.stringify(arr));
                        console.log(`💾 Imagen guardada en imágenesBotonera2[${index}]`);
                    };
                    lector.readAsDataURL(archivo);
                });
                inputFile.click();
            });
        });
    }
    function restaurarImagenesEnBotones2(imagenesArray) {
        if (!imagenesArray?.length) return;
        const botones = areaContenido.querySelectorAll(".btn-add2");
        botones.forEach((btn, i) => {
            const b64 = imagenesArray[i];
            if (b64) {
                btn.innerHTML = `<img src="${b64}" alt="img2" style="width:100%; height:100%; object-fit:cover; border-radius:5px;">`;
                btn.style.padding = "0";
            }
        });
    }
    function inicializarBotonera3() {
        const botones = areaContenido.querySelectorAll(".btn-add3");
        botones.forEach((btn, index) => {
            btn.addEventListener("click", () => {
                console.log(`🖱️ Botón +3 #${index + 1} presionado.`);
                const inputFile = document.createElement("input");
                inputFile.type = "file";
                inputFile.accept = "image/*";
                inputFile.addEventListener("change", (e) => {
                    const archivo = e.target.files[0];
                    if (!archivo) return;
                    const lector = new FileReader();
                    lector.onload = (evento) => {
                        const base64 = evento.target.result;
                        btn.innerHTML = `<img src="${base64}" alt="img3" style="width:100%; height:100%; object-fit:cover; border-radius:5px;">`;
                        btn.style.padding = "0";
                        const arr = JSON.parse(localStorage.getItem("imagenesBotonera3") || "[]");
                        arr[index] = base64;
                        localStorage.setItem("imagenesBotonera3", JSON.stringify(arr));
                        console.log(`💾 Imagen guardada en imágenesBotonera3[${index}]`);
                    };
                    lector.readAsDataURL(archivo);
                });
                inputFile.click();
            });
        });
    }
    function restaurarImagenesEnBotones3(imagenesArray) {
        if (!imagenesArray?.length) return;
        const botones = areaContenido.querySelectorAll(".btn-add3");
        botones.forEach((btn, i) => {
            const b64 = imagenesArray[i];
            if (b64) {
                btn.innerHTML = `<img src="${b64}" alt="img3" style="width:100%; height:100%; object-fit:cover; border-radius:5px;">`;
                btn.style.padding = "0";
            }
        });
    }
    function limitarTexto(elemento, mensaje) {
        elemento.addEventListener("input", () => {
            requestAnimationFrame(() => {
                const alturaVisible = elemento.clientHeight;
                const alturaContenido = elemento.scrollHeight;
                if (alturaContenido > alturaVisible) {
                    elemento.innerText = elemento.innerText.trim().slice(0, -1);
                    alert(mensaje);
                }
            });
        });
    }
    const contenidoGuardado = localStorage.getItem("contenidoSeleccionado");
    if (contenidoGuardado) construirContenido(contenidoGuardado);
    btnContenido.addEventListener("click", () => {
        console.log("🗂 Botón 'Contenido' presionado.");
        let menu = document.querySelector(".menu-contenido");
        if (menu) return menu.remove();
        menu = document.createElement("div");
        menu.classList.add("menu-contenido");
        menu.innerHTML = `
            <div data-id="1">Contenido 1</div>
            <div data-id="2">Contenido 2</div>
            <div data-id="3">Contenido 3</div>
        `;
        btnContenido.insertAdjacentElement("afterend", menu);
        menu.querySelectorAll("div").forEach(item => {
            item.addEventListener("click", () => {
                const valor = item.dataset.id;
                menu.remove();
                localStorage.setItem("contenidoSeleccionado", valor);
                construirContenido(valor);
            });
        });
        document.addEventListener("click", (e) => {
            if (!menu.contains(e.target) && e.target !== btnContenido) menu.remove();
        }, { once: true });
    });
    btnEliminar.addEventListener("click", () => {
        console.log("🗑 Botón 'Eliminar' presionado.");
        areaContenido.innerHTML = "";
        localStorage.removeItem("contenidoSeleccionado");
        localStorage.removeItem("contenidoEditable");
        localStorage.removeItem("imagenesBotonera");
    });
    const selectores = [selectTipoTexto, selectTamanoTexto, selectOrdenTexto, selectAjusteTexto];
    selectores.forEach((selector, i) => {
        selector.addEventListener("change", () => {
            console.log(`🔧 Selector ${i + 1} cambió a: ${selector.value}`);
        });
    });
});