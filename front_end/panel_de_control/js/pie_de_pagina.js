//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//--------------------------------------------------------//
//--|funcionalidad_edicion_predeterminada_pie de pagina|--//
//--------------------------------------------------------//
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
    console.log("✅ Script de agregar imagen pie_de_pagina cargado correctamente.");
    const imagenBox_pie_de_pagina = document.querySelector(".imagen-box");
    const botonAgregar_pie_de_pagina = document.querySelector(".imagen-btn");
    const bigLeftBox = document.querySelector(".big-left-box");
    if (!imagenBox_pie_de_pagina) console.error("No se encontró .imagen-box en el DOM");
    if (!botonAgregar_pie_de_pagina) console.error("No se encontró .imagen-btn en el DOM");
    const inputImagen_pie_de_pagina = document.createElement("input");
    const estado_pie_de_pagina = document.getElementById("estadoEdicion");
    inputImagen_pie_de_pagina.type = "file";
    inputImagen_pie_de_pagina.accept = "image/*";
    inputImagen_pie_de_pagina.multiple = true;
    inputImagen_pie_de_pagina.style.display = "none";
    document.body.appendChild(inputImagen_pie_de_pagina);
    let imagenesSeleccionadas_pie_de_pagina = [];
    function mostrarMensaje_pie_de_pagina(texto, tipo = "info") {
        if (estado_pie_de_pagina) {
            estado_pie_de_pagina.innerHTML = "";
            const mensaje_pie_de_pagina = document.createElement("div");
            mensaje_pie_de_pagina.classList.add("mensaje", tipo);
            mensaje_pie_de_pagina.textContent = texto;
            estado_pie_de_pagina.appendChild(mensaje_pie_de_pagina);
            setTimeout(() => {
                if (estado_pie_de_pagina.contains(mensaje_pie_de_pagina)) {
                    mensaje_pie_de_pagina.remove();
                }
            }, 3500);
            console.log(`[mensaje ${tipo}] ${texto}`);
            return;
        }
        alert(texto);
        console.log(`[alert fallback ${tipo}] ${texto}`);
    }
    if (imagenBox_pie_de_pagina) {
        imagenBox_pie_de_pagina.addEventListener("click", () => {
            inputImagen_pie_de_pagina.click();
        });
    }
    inputImagen_pie_de_pagina.addEventListener("change", (e) => {
        const archivos_pie_de_pagina = Array.from(e.target.files || []);
        if (archivos_pie_de_pagina.length === 0) {
            mostrarMensaje_pie_de_pagina("No se seleccionaron imágenes.", "info");
            return;
        }
        imagenesSeleccionadas_pie_de_pagina = [];
        if (imagenBox_pie_de_pagina) imagenBox_pie_de_pagina.innerHTML = "";
        archivos_pie_de_pagina.forEach((archivo) => {
            const lector_pie_de_pagina = new FileReader();
            lector_pie_de_pagina.onload = (evento) => {
                imagenesSeleccionadas_pie_de_pagina.push(evento.target.result);
                const img_pie_de_pagina = document.createElement("img");
                img_pie_de_pagina.src = evento.target.result;
                img_pie_de_pagina.style.width = "100px";
                img_pie_de_pagina.style.height = "100px";
                img_pie_de_pagina.style.objectFit = "cover";
                img_pie_de_pagina.style.margin = "5px";
                img_pie_de_pagina.style.borderRadius = "5px";
                imagenBox_pie_de_pagina.appendChild(img_pie_de_pagina);
            };
            lector_pie_de_pagina.readAsDataURL(archivo);
        });
        mostrarMensaje_pie_de_pagina(`🖼️ ${archivos_pie_de_pagina.length} imagen(es) seleccionada(s).`, "info");
    });
    if (botonAgregar_pie_de_pagina) {
        botonAgregar_pie_de_pagina.addEventListener("click", () => {
            if (imagenesSeleccionadas_pie_de_pagina.length === 0) {
                mostrarMensaje_pie_de_pagina("no has agregado ninguna imagen", "error");
                return;
            }
            if (bigLeftBox) {
                bigLeftBox.innerHTML = ""; // limpiar contenido previo
                imagenesSeleccionadas_pie_de_pagina.forEach(src => {
                    const img = document.createElement("img");
                    img.src = src;
                    img.style.width = "100px";
                    img.style.height = "100px";
                    img.style.objectFit = "cover";
                    img.style.margin = "5px";
                    img.style.borderRadius = "5px";
                    bigLeftBox.appendChild(img);
                });
            } else {
                console.warn("⚠️ No existe .big-left-box en el DOM.");
            }
            localStorage.setItem(
                "imagenesCarrusel_pie_de_pagina",
                JSON.stringify(imagenesSeleccionadas_pie_de_pagina)
            );
            mostrarMensaje_pie_de_pagina("has agregado las imagenes correctamente", "exito");
            if (imagenBox_pie_de_pagina)
                imagenBox_pie_de_pagina.innerHTML = `<i class="fa-regular fa-image"></i>`;
            inputImagen_pie_de_pagina.value = "";
            imagenesSeleccionadas_pie_de_pagina = [];
        });
    }
    if (bigLeftBox) {
        const imagenesGuardadas = localStorage.getItem("imagenesCarrusel_pie_de_pagina");
        if (imagenesGuardadas) {
            const lista = JSON.parse(imagenesGuardadas);
            bigLeftBox.innerHTML = "";
            lista.forEach(src => {
                const img = document.createElement("img");
                img.src = src;
                img.style.width = "267px";
                img.style.height = "288px";
                img.style.objectFit = "cover";
                img.style.margin = "5px";
                img.style.borderRadius = "5px";
                bigLeftBox.appendChild(img);
            });
            console.log("🖼️ Imágenes cargadas desde localStorage");
        }
    }
});
//-----------------------------------------------//
//--|funcionalidad_formulario_de_pie_de_pagina|--//
//-----------------------------------------------//
const btnAgregar = document.getElementById("btnAgregar");
const inputPie = document.getElementById("inputPie");
const inputTitulo = document.getElementById("inputTitulo");
const inputSub = document.querySelector(".input-sub");
const iconoSub = document.querySelector(".icono-sub1");
const inputOpciones = document.querySelector(".input-opciones");
const listaPaginas = document.querySelector(".lista-paginas1");
const cajasIconos = document.querySelectorAll(".caja2");
btnAgregar.addEventListener("click", () => {
    const listaActual = JSON.parse(localStorage.getItem("pie_de_pagina_tablero")) || [];
    const LIMITE_TABLERO = 4;
    if (listaActual.length >= LIMITE_TABLERO) {
        mostrarMensaje("Has alcanzado el límite de datos en el tablero. Máximo permitido: " + LIMITE_TABLERO, "error");
        return;
    }
    const pie = inputPie.value.trim();
    const titulo = inputTitulo.value.trim();
    const subtitulos = JSON.parse(localStorage.getItem("subtitulos")) || [];
    const opcionesExtra = JSON.parse(localStorage.getItem("opciones_extra")) || [];
    const iconosGuardados = JSON.parse(localStorage.getItem("iconos_cajas")) || {};
    const seleccionadas = JSON.parse(localStorage.getItem("paginas_seleccionadas")) || [];
    const noHayDatos =
        pie === "" &&
        titulo === "" &&
        subtitulos.length === 0 &&
        opcionesExtra.length === 0 &&
        Object.keys(iconosGuardados).length === 0 &&
        seleccionadas.length === 0;
    if (noHayDatos) {
        mostrarMensaje("No hay datos agregados en el formulario.", "error");
        return;
    }
    let errores = [];
    if (pie === "") {
        errores.push("• Falta añadir el pie de página");
    } else {
        localStorage.setItem("pie_de_pagina", pie);
    }
    if (titulo === "") {
        errores.push("• Falta añadir el título");
    } else {
        localStorage.setItem("titulo_pagina", titulo);
    }
    if (subtitulos.length === 0)
        errores.push("• Falta mínimo 1 subtítulo");
    if (subtitulos.length > 4)
        errores.push("• Solo se permiten 4 subtítulos");
    if (opcionesExtra.length === 0)
        errores.push("• Agrega al menos 1 nueva opción");
    if (Object.keys(iconosGuardados).length < 4)
        errores.push("• Selecciona los 4 iconos");
    if (seleccionadas.length === 0)
        errores.push("• Selecciona mínimo 1 opción de la lista");
    if (errores.length > 0) {
        mostrarMensaje("Faltan datos en el formulario.", "error");
        return;
    }
    mostrarMensaje("Todos los datos han sido añadidos correctamente.", "exito");
    const nuevoPie = {
        pie,
        titulo,
        iconos: Object.values(iconosGuardados).join(" "),
        subtitulo: subtitulos.join("<br>"),
        opciones: seleccionadas.join("<br>")
    };
    listaActual.push(nuevoPie);
    localStorage.setItem("pie_de_pagina_tablero", JSON.stringify(listaActual));
    document.dispatchEvent(new Event("actualizar_tabla"));
    console.log("✅ Pie de página enviado al tablero correctamente.");
});
inputTitulo.addEventListener("input", () => {
    localStorage.setItem("titulo_pagina", inputTitulo.value);
});
iconoSub.addEventListener("click", () => {
    const texto = inputSub.value.trim();
    if (texto === "") return mostrarMensaje("Escribe un subtítulo antes de guardar.", "error");
    let subtitulos = JSON.parse(localStorage.getItem("subtitulos")) || [];
    if (subtitulos.length === 4) {
        mostrarMensaje("Ya has creado los 4 subtítulos permitidos.", "error");
        return;
    }
    subtitulos.push(texto);
    localStorage.setItem("subtitulos", JSON.stringify(subtitulos));
    inputSub.value = "";
    const numero = subtitulos.length;
    if (numero === 1)
        mostrarMensaje("El primer subtítulo ha sido creado.", "exito");
    else if (numero === 2)
        mostrarMensaje("El segundo subtítulo ha sido creado.", "exito");
    else if (numero === 3)
        mostrarMensaje("El tercer subtítulo ha sido creado.", "exito");
    else if (numero === 4)
        mostrarMensaje("Se han creado los 4 subtítulos con éxito.", "exito");
});
inputOpciones.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const texto = inputOpciones.value.trim();
        if (texto === "") return;
        let opciones = JSON.parse(localStorage.getItem("opciones_extra")) || [];
        opciones.push(texto);
        localStorage.setItem("opciones_extra", JSON.stringify(opciones));
        const id = "opc-" + texto.replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
        const div = document.createElement("div");
        div.className = "item-pagina1";
        div.innerHTML = `
            <input type="checkbox" data-pagina="${texto}" id="${id}">
            <label for="${id}">${texto}</label>
        `;
        listaPaginas.appendChild(div);
        mostrarMensaje("Se ha creado una nueva opción correctamente", "exito");
        inputOpciones.value = "";
    }
});
(function () {
    const modal = document.getElementById("modalIconos");
    const gridIconos = document.querySelector(".grid-iconos1");
    const btnCerrarModal = document.getElementById("cerrarModalIconos");
    const cajas = Array.from(document.querySelectorAll(".caja2"));
    let cajaSeleccionada = null;
    let cajaIndex = null;
    if (!modal || !gridIconos || cajas.length === 0) {
        console.warn("Modal iconos: faltan elementos. Revisa IDs.");
        return;
    }
    cajas.forEach((caja, idx) => {
        caja.dataset.index = idx;
        caja.addEventListener("click", () => {
            cajaSeleccionada = caja;
            cajaIndex = idx;
            modal.style.display = "flex";
            modal.setAttribute("tabindex", "-1");
            modal.focus();
        });
    });
    gridIconos.addEventListener("click", (e) => {
        const icono = e.target.closest("i");
        if (!icono || !cajaSeleccionada) return;
        const nuevo = icono.cloneNode(true);
        cajaSeleccionada.innerHTML = "";
        cajaSeleccionada.appendChild(nuevo);
        const guardadas = JSON.parse(localStorage.getItem("iconos_cajas")) || {};
        guardadas[cajaIndex] = nuevo.outerHTML;
        localStorage.setItem("iconos_cajas", JSON.stringify(guardadas));
        modal.style.display = "none";
        cajaSeleccionada = null;
        cajaIndex = null;
    });
    btnCerrarModal?.addEventListener("click", () => {
        modal.style.display = "none";
    });
    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") modal.style.display = "none";
    });
    window.addEventListener("load", () => {
        const guardadas = JSON.parse(localStorage.getItem("iconos_cajas")) || {};
        Object.keys(guardadas).forEach(key => {
            const idx = Number(key);
            const htmlIcono = guardadas[key];
            if (!isNaN(idx) && cajas[idx]) {
                cajas[idx].innerHTML = htmlIcono;
            }
        });
    });
})();
function cargarOpcionesExtras() {
    const opciones = JSON.parse(localStorage.getItem("opciones_extra")) || [];
    opciones.forEach(texto => {
        const id = "opc-" + texto.replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
        const div = document.createElement("div");
        div.className = "item-pagina1";
        div.innerHTML = `
            <input type="checkbox" data-pagina="${texto}" id="${id}">
            <label for="${id}">${texto}</label>
        `;
        listaPaginas.appendChild(div);
    });
}
window.addEventListener("load", () => {
    cargarOpcionesExtras();
});
function renderizarListaPaginas(paginasArray = []) {
    listaPaginas.innerHTML = "";
    paginasArray.forEach((pagina) => {
        const nombre = typeof pagina === "string" ? pagina : pagina.nombre;
        const id = "chk-" + cssSafe(nombre);
        const div = document.createElement("div");
        div.className = "item-pagina1";
        div.innerHTML = `
            <input type="checkbox" data-pagina="${nombre}" id="${id}">
            <label for="${id}">${nombre}</label>
        `;
        listaPaginas.appendChild(div);
    });
}
function cssSafe(text) {
    return String(text)
        .replace(/\s+/g, "_")
        .replace(/[^\w\-]/g, "");
}
function cargarPaginas() {
    let paginas = JSON.parse(localStorage.getItem("paginas_desde_tablero")) || [];
    if (!paginas || paginas.length === 0) {
        const creadas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
        if (creadas.length > 0) {
            paginas = creadas.map(p => typeof p === "string" ? p : p.nombre || "");
        }
    }
    if (!paginas || paginas.length === 0) {
        paginas = [
            "Inicio", "Servicios", "Contacto", "Nosotros",
            "Blog", "Productos", "Preguntas frecuentes"
        ];
    }
    renderizarListaPaginas(paginas);
    const guardadas = JSON.parse(localStorage.getItem("paginas_seleccionadas")) || [];
    guardadas.forEach(nombre => {
        const el = listaPaginas.querySelector(`input[data-pagina="${nombre}"]`);
        if (el) el.checked = true;
    });
}
cargarPaginas();
listaPaginas.addEventListener("change", () => {
    const seleccionadas = [];
    listaPaginas.querySelectorAll("input[type='checkbox']").forEach(chk => {
        if (chk.checked) seleccionadas.push(chk.dataset.pagina);
    });
    localStorage.setItem("paginas_seleccionadas", JSON.stringify(seleccionadas));
});
document.addEventListener("enviar_paginas_a_formulario", (e) => {
    const paginasObj = e.detail || [];
    const paginas = paginasObj.map(p => typeof p === "string" ? p : p.nombre || "");
    localStorage.setItem("paginas_desde_tablero", JSON.stringify(paginasObj));
    localStorage.setItem("paginas_desde_tablero_updatedAt", Date.now().toString());
    renderizarListaPaginas(paginas);
    localStorage.setItem("paginas_seleccionadas", JSON.stringify(paginas));
    paginas.forEach(nombre => {
        const el = listaPaginas.querySelector(`input[data-pagina="${nombre}"]`);
        if (el) el.checked = true;
    });
});
window.addEventListener("storage", (event) => {
    if (event.key === "paginas_desde_tablero_updatedAt" || event.key === "paginas_desde_tablero") {
        const paginasObj = JSON.parse(localStorage.getItem("paginas_desde_tablero")) || [];
        const paginas = paginasObj.map(p => typeof p === "string" ? p : p.nombre || "");
        renderizarListaPaginas(paginas);
        localStorage.setItem("paginas_seleccionadas", JSON.stringify(paginas));
        paginas.forEach(nombre => {
            const el = listaPaginas.querySelector(`input[data-pagina="${nombre}"]`);
            if (el) el.checked = true;
        });
        console.log("✔ Páginas recibidas desde el tablero (por storage event)");
    }
});
//-----------------------------------------//
//--|funcionalidad_tablero_pie_de_pagina|--//
//-----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 Script de pie_de_pagina cargado correctamente.");
    const estadoEdicion = document.getElementById("estadoEdicion");
    function mensajeHTML(texto) {
        if (!estadoEdicion) return;
        estadoEdicion.innerHTML = texto;
        estadoEdicion.style.display = "block";
    }
    const tablaBody = document.querySelector(".tabla-paginas1 tbody");
    function mostrarPieDePagina() {
        tablaBody.innerHTML = "";
        const pies = JSON.parse(localStorage.getItem("pie_de_pagina_tablero")) || [];
        if (pies.length === 0) {
            mensajeHTML(`
                <i class="fa-solid fa-eye"></i>
                No hay pies de página creados.
            `);
            const filaVacia = document.createElement("tr");
            filaVacia.innerHTML = `
                <td colspan="6" style="text-align:center;">No hay pies de página creados</td>
            `;
            tablaBody.appendChild(filaVacia);
            return;
        }
        pies.forEach((item, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.pie}</td>
                <td>${item.titulo}</td>
                <td class="celda-iconos">${item.iconos}</td>
                <td class="celda-subtitulos">${item.subtitulo}</td>
                <td class="celda-opciones">${item.opciones}</td>
                <td class="celda-acciones">
                    <div class="acciones-wrapper">
                        <button class="btn-editar1" data-index="${index}">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="btn-visualizar1" data-index="${index}">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                        <button class="btn-anadir1" data-index="${index}">
                            <i class="fa-solid fa-circle-plus"></i>
                        </button>
                        <button class="btn-eliminar1" data-index="${index}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tablaBody.appendChild(tr);
        });
    }
    mostrarPieDePagina();
    document.addEventListener("actualizar_tabla", () => {
        console.log("🔄 Evento recibido: actualizando tabla de pies de página...");
        mostrarPieDePagina();
    });
    tablaBody.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const index = btn.dataset.index;
        let pies = JSON.parse(localStorage.getItem("pie_de_pagina_tablero")) || [];
        if (btn.classList.contains("btn-eliminar1")) {
            const nombre = pies[index].pie;
            pies.splice(index, 1);
            localStorage.setItem("pie_de_pagina_tablero", JSON.stringify(pies));
            mensajeHTML(`
                <i class="fa-solid fa-trash"></i>
                El pie de página <b>${nombre}</b> fue eliminado.
            `);
            mostrarPieDePagina();
        }
        if (btn.classList.contains("btn-editar1")) {
            const item = pies[index];
            mensajeHTML(`
                <i class="fa-solid fa-pen-to-square"></i>
                Editando pie de página: <b>${item.titulo}</b>
            `);
            const nuevoTitulo = prompt("Editar título:", item.titulo);
            if (!nuevoTitulo) return;
            pies[index].titulo = nuevoTitulo.trim();
            localStorage.setItem("pie_de_pagina_tablero", JSON.stringify(pies));
            mensajeHTML(`
                <i class="fa-solid fa-pen-to-square"></i>
                El título fue cambiado a <b>${nuevoTitulo}</b>.
            `);
            mostrarPieDePagina();
        }
        if (btn.classList.contains("btn-visualizar1")) {
            const item = pies[index];
            mensajeHTML(`
                <i class="fa-solid fa-eye"></i>
                Vista previa del pie de página: <b>${item.titulo}</b>
            `);
        }
        if (btn.classList.contains("btn-anadir1")) {
            const item = pies[index];
            document.getElementById("modalOpcion1").textContent = item.pie;
            document.getElementById("modalOpcion2").textContent = item.titulo;
            document.getElementById("modalOpcion3").innerHTML =
                item.iconos.replace(/<br\s*\/?>/gi, " ");
            document.getElementById("modalOpcion4").textContent =
                item.subtitulo.replace(/<br\s*\/?>/gi, " | ");
            document.getElementById("modalOpcion5").textContent =
                item.opciones.replace(/<br\s*\/?>/gi, " | ");
            document.getElementById("modalAnadir").style.display = "flex";
        }
    });
    document.getElementById("cerrarModal").addEventListener("click", () => {
        document.getElementById("modalAnadir").style.display = "none";
    });
    const btnConfirmar = document.getElementById("btnConfirmarEnvio");
    if (btnConfirmar) {
        btnConfirmar.addEventListener("click", () => {
            const numero = parseInt(document.getElementById("inputNumeroOpcion").value);
            if (!numero || numero < 1 || numero > 5) {
                mensajeHTML("<i class='fa-solid fa-eye'></i> Número inválido.");
                return;
            }
            let textoSeleccionado =
                numero === 1 ? document.getElementById("modalOpcion1").textContent :
                numero === 2 ? document.getElementById("modalOpcion2").textContent :
                numero === 3 ? document.getElementById("modalOpcion3").innerHTML :
                numero === 4 ? document.getElementById("modalOpcion4").textContent :
                numero === 5 ? document.getElementById("modalOpcion5").textContent : "";
            colocarEnVistaPrevia(numero, textoSeleccionado);
            mensajeHTML(`
                <i class="fa-solid fa-eye"></i>
                Opción ${numero} enviada a la vista previa.
            `);
            document.getElementById("modalAnadir").style.display = "none";
        });
    } else {
        console.warn("⚠️ No se encontró el botón #btnConfirmarEnvio");
    }
});
//--------------------------------------------------//
//--|funcionalidad_vista_previa_del_pie_de_pagina|--//
//--------------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 JS de vista previa de pie de página cargado (ROBUSTO+ANTI-DUPLICADOS).");
    const descripcionPreview = document.querySelector(".descripcion_pie_pagina_preview");
    const telefonoElem = document.querySelector(".valor-telefono");
    const correoElem = document.querySelector(".valor-correo");
    const quienElem = document.querySelector(".valor-quien");
    const dondeElem = document.querySelector(".valor-donde");
    const direccionElem = document.querySelector(".valor-direccion");
    const avisoElem = document.querySelector(".valor-avisos");
    const socialElem = document.querySelector(".valor-social");
    const boxPie = document.querySelector(".header-box");
    const boxTitulo = document.querySelector(".top-right-box");
    let boxIconos = document.querySelectorAll(".mini:not(.wide)");
    let boxSubtitulos = document.querySelectorAll(".mini.wide");
    let boxOpciones = document.querySelectorAll(".item1, .item2, .item3, .item4");
    const fallbackMini = document.querySelector(".mini");
    const fallbackMiniWide = document.querySelector(".mini.wide");
    function ensureNodeLists() {
        if ((!boxIconos || boxIconos.length === 0) && fallbackMini) {
            boxIconos = [fallbackMini];
            console.warn("⚠️ No se encontraron múltiples .mini — usando fallback único");
        }
        if ((!boxSubtitulos || boxSubtitulos.length === 0) && fallbackMiniWide) {
            boxSubtitulos = [fallbackMiniWide];
            console.warn("⚠️ No se encontraron múltiples .mini.wide — usando fallback único");
        }
        if (!boxOpciones || boxOpciones.length === 0) {
            boxOpciones = [];
            console.warn("⚠️ No se encontraron .item* (opciones)");
        }
    }
    ensureNodeLists();
    const bottomBox = document.querySelector(".bottom-box");
    if (bottomBox) {
        bottomBox.addEventListener("click", () => {
            bottomBox.setAttribute("contenteditable", "true");
            bottomBox.focus();
        });
        bottomBox.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                bottomBox.removeAttribute("contenteditable");
                let datos = JSON.parse(localStorage.getItem("vista_previa_footer")) || {};
                datos.bottom = bottomBox.innerHTML.trim();
                localStorage.setItem("vista_previa_footer", JSON.stringify(datos));
                bottomBox.blur();
            }
        });
    }
    function cargarVistaPrevGuardada() {
        const raw = localStorage.getItem("vista_previa_footer");
        if (!raw) return;
        let datos;
        try { datos = JSON.parse(raw); }
        catch { return; }
        if (datos.pie && boxPie) boxPie.innerHTML = datos.pie;
        if (datos.titulo && boxTitulo) boxTitulo.innerHTML = datos.titulo;
        if (datos.iconos && Array.isArray(datos.iconos)) {
            datos.iconos.forEach((v, i) => { 
                if (boxIconos[i]) boxIconos[i].innerHTML = v; 
            });
        }
        if (datos.subtitulos && Array.isArray(datos.subtitulos)) {
            datos.subtitulos.forEach((v, i) => { 
                if (boxSubtitulos[i]) boxSubtitulos[i].innerHTML = v; 
            });
        }
        if (datos.opciones && Array.isArray(datos.opciones)) {
            datos.opciones.forEach((v, i) => { 
                if (boxOpciones[i]) boxOpciones[i].innerHTML = v; 
            });
        }
        const bottomBox = document.querySelector(".bottom-box");
        if (datos.bottom && bottomBox) {
            bottomBox.innerHTML = datos.bottom;
        }
    }
    cargarVistaPrevGuardada();
    function guardarVistaPrevia() {
        ensureNodeLists();
        const datos = {
            pie: boxPie?.innerHTML.trim() || "",
            titulo: boxTitulo?.innerHTML.trim() || "",
            iconos: Array.from(boxIconos).map(d => d.innerHTML),
            subtitulos: Array.from(boxSubtitulos).map(d => d.innerHTML),
            opciones: Array.from(boxOpciones).map(d => d.innerHTML.trim()),
        };
        localStorage.setItem("vista_previa_footer", JSON.stringify(datos));
    }
    function limpiarMinis() {
        const minis = document.querySelectorAll(".mini-row-empleo .mini");
        minis.forEach(mini => mini.innerHTML = "");
    }
    window.colocarEnVistaPrevia = function (numero, contenido) {
        ensureNodeLists();
        if (numero == 3) {
            limpiarMinis();
            const icons = contenido.split("|").map(i => i.trim());
            const minis = document.querySelectorAll(".mini-row-empleo .mini");
            minis.forEach((mini, i) => {
                if (icons[i] && icons[i] !== "") {
                    mini.innerHTML = icons[i];
                }
            });
            guardarVistaPrevia();
            return;
        }
        function assignToList(list, value) {
            if (!list || list.length === 0) return;
            if (Array.isArray(value)) {
                value.forEach((v, i) => {
                    if (list[i]) list[i].innerHTML = v;
                });
                return;
            }
            if (typeof value === "string" && value.includes("|")) {
                const parts = value.split("|").map(s => s.trim());
                parts.forEach((p, i) => {
                    if (list[i]) list[i].innerHTML = p;
                });
                return;
            }
            if (typeof value === "string") {
                if (list[0]) list[0].innerHTML = value;
                return;
            }
        }
        if (numero == 1 && boxPie) boxPie.innerHTML = contenido;
        if (numero == 2 && boxTitulo) boxTitulo.innerHTML = contenido;
        if (numero == 4) assignToList(boxSubtitulos, contenido);
        if (numero == 5) {
            const lista = Array.isArray(contenido)
                ? contenido
                : (typeof contenido === "string"
                    ? contenido.split("|").map(t => t.trim())
                    : []);
            boxOpciones.forEach((div, i) => {
                div.innerHTML = lista[i] ?? "";
            });
        }
        guardarVistaPrevia();
    };
    function cargarDatosIniciales() {
        if (localStorage.getItem("vista_previa_footer")) return;
        ensureNodeLists();
        boxIconos.forEach(m => { if (!m.innerHTML.trim()) m.innerHTML = ""; });
        boxSubtitulos.forEach(m => { if (!m.innerHTML.trim()) m.innerHTML = ""; });
    }
    cargarDatosIniciales();
    function mostrarMensaje(texto, tipo = "info") {
        const estado = document.getElementById("estadoEdicion");
        if (!estado) return;
        estado.innerHTML = "";
        const mensaje = document.createElement("div");
        mensaje.className = `mensaje ${tipo}`;
        mensaje.textContent = texto;
        estado.appendChild(mensaje);
    }
    window.actualizarPieDePagina = function (data) {
        if (descripcionPreview && data.descripcion) descripcionPreview.textContent = data.descripcion;
        if (telefonoElem && data.telefono) telefonoElem.textContent = data.telefono;
        if (correoElem && data.correo) correoElem.textContent = data.correo;
        if (quienElem && data.quien) quienElem.textContent = data.quien;
        if (dondeElem && data.donde) dondeElem.textContent = data.donde;
        if (direccionElem && data.direccion) direccionElem.textContent = data.direccion;
        if (avisoElem && data.aviso) avisoElem.textContent = data.aviso;
        if (socialElem && data.social) socialElem.textContent = data.social;
        mostrarMensaje("Vista previa actualizada correctamente.");
    };
    const btnEliminarPie = document.querySelector(".btn-eliminar-pie") || document.querySelector(".btn1");
    const btnEnviarPie   = document.querySelector(".btn-enviar-pie")   || document.querySelector(".btn2");
    if (btnEliminarPie) {
        btnEliminarPie.addEventListener("click", () => {
            if (boxPie) boxPie.innerHTML = "";
            if (boxTitulo) boxTitulo.innerHTML = "";
            if (bottomBox) bottomBox.innerHTML = "";
            boxIconos.forEach(m => m.innerHTML = "");
            boxSubtitulos.forEach(m => m.innerHTML = "");
            boxOpciones.forEach(m => m.innerHTML = "");
            localStorage.removeItem("vista_previa_footer");
            mostrarMensaje(
                "Se ha borrado completamente la vista previa del pie de página.",
                "success"
            );
        });
    }
    if (btnEnviarPie) {
        btnEnviarPie.addEventListener("click", () => {
            const contenidoPie = boxPie?.innerHTML.trim();
            const contenidoTitulo = boxTitulo?.innerHTML.trim();
            const contenidoBottom = bottomBox?.innerHTML.trim();
            const hayContenido =
                contenidoPie || contenidoTitulo || contenidoBottom;
            if (!hayContenido) {
                mostrarMensaje(
                    "No ha añadido ningún contenido al pie de página.",
                    "error"
                );
                return;
            }
            mostrarMensaje(
                "El pie de página se ha enviado correctamente.",
                "success"
            );
        });
    }
});