//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//----------------------------------//
//--|funcionalidad_agregar_imagen|--//
//----------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script de agregar imagen pie_de_pagina cargado correctamente.");
    const imagenBox_pie_de_pagina = document.querySelector(".imagen-box");
    const botonAgregar_pie_de_pagina = document.querySelector(".imagen-btn");
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
                if (imagenBox_pie_de_pagina) {
                    const img_pie_de_pagina = document.createElement("img");
                    img_pie_de_pagina.src = evento.target.result;
                    img_pie_de_pagina.style.width = "100px";
                    img_pie_de_pagina.style.height = "100px";
                    img_pie_de_pagina.style.objectFit = "cover";
                    img_pie_de_pagina.style.margin = "5px";
                    img_pie_de_pagina.style.borderRadius = "5px";
                    imagenBox_pie_de_pagina.appendChild(img_pie_de_pagina);
                }
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
            localStorage.setItem(
                "imagenesCarrusel_pie_de_pagina",
                JSON.stringify(imagenesSeleccionadas_pie_de_pagina)
            );
            mostrarMensaje_pie_de_pagina("has agregado las imagenes correctamente", "exito");
            if (imagenBox_pie_de_pagina) imagenBox_pie_de_pagina.innerHTML = `<i class="fa-regular fa-image"></i>`;
            inputImagen_pie_de_pagina.value = "";
            imagenesSeleccionadas_pie_de_pagina = [];
        });
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
        alert("Has alcanzado el límite de datos en el tablero. Máximo permitido: " + LIMITE_TABLERO);
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
        alert("No hay datos agregados en el formulario.");
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
        alert("Faltan datos en el formulario:\n\n" + errores.join("\n"));
        return;
    }
    alert("✔ Todos los datos del formulario han sido añadidos correctamente.");
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
    if (texto === "") return alert("Escribe un subtítulo antes de guardar.");
    let subtitulos = JSON.parse(localStorage.getItem("subtitulos")) || [];
    if (subtitulos.length === 4) {
        alert("Ya has creado los 4 subtítulos permitidos.");
        return;
    }
    subtitulos.push(texto);
    localStorage.setItem("subtitulos", JSON.stringify(subtitulos));
    inputSub.value = "";
    const numero = subtitulos.length;
    if (numero === 1) {
        alert("El primer subtítulo ha sido creado.");
    } 
    else if (numero === 2) {
        alert("El segundo subtítulo ha sido creado.");
    }
    else if (numero === 3) {
        alert("El tercer subtítulo ha sido creado.");
    }
    else if (numero === 4) {
        alert("Se han creado los 4 subtítulos con éxito.");
    }
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
        alert("Se ha creado una nueva opción correctamente");
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
            mensajeHTML("No hay pies de página creados.");
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
                <!-- ICONOS (uno debajo del otro) -->
                <td class="celda-iconos">${item.iconos}</td>
                <!-- SUBTÍTULOS -->
                <td class="celda-subtitulos">${item.subtitulo}</td>
                <!-- OPCIONES (una debajo de otra) -->
                <td class="celda-opciones">${item.opciones}</td>
                <!-- ACCIONES (botones verticales con wrapper) -->
                <td class="celda-acciones">
                    <div class="acciones-wrapper">
                        <button class="btn-editar1" data-index="${index}">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="btn-visualizar1" data-index="${index}">
                            <i class="fa-solid fa-eye"></i>
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
            mensajeHTML(`El pie de página <b>${nombre}</b> fue eliminado.`);
            mostrarPieDePagina();
        }
        if (btn.classList.contains("btn-editar1")) {
            const item = pies[index];
            mensajeHTML(`Editando pie de página: <b>${item.titulo}</b>`);
            const nuevoTitulo = prompt("Editar título:", item.titulo);
            if (!nuevoTitulo) return;
            pies[index].titulo = nuevoTitulo.trim();
            localStorage.setItem("pie_de_pagina_tablero", JSON.stringify(pies));
            mensajeHTML(`El título fue cambiado a <b>${nuevoTitulo}</b>.`);
            mostrarPieDePagina();
        }
        if (btn.classList.contains("btn-visualizar1")) {
            const item = pies[index];
            mensajeHTML(`Vista previa del pie de página: <b>${item.titulo}</b>`);
        }
    });
});
//--------------------------------------------------//
//--|funcionalidad_vista_previa_del_pie_de_pagina|--//
//--------------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 JS de vista previa de pie de página cargado.");
    const descripcionPreview = document.querySelector(".descripcion_pie_pagina_preview");
    const telefonoElem = document.querySelector(".valor-telefono");
    const correoElem = document.querySelector(".valor-correo");
    const quienElem = document.querySelector(".valor-quien");
    const dondeElem = document.querySelector(".valor-donde");
    const direccionElem = document.querySelector(".valor-direccion");
    const avisoElem = document.querySelector(".valor-avisos");
    const socialElem = document.querySelector(".valor-social");
    function cargarDatosIniciales() {
        descripcionPreview.textContent = "Este es un ejemplo de vista previa.";
        telefonoElem.textContent = "300 000 0000";
        correoElem.textContent = "ejemplo@correo.com";
        quienElem.textContent = "Empresa de ejemplo";
        dondeElem.textContent = "Colombia";
        direccionElem.textContent = "Calle falsa 123";
        avisoElem.textContent = "Todos los derechos reservados.";
        socialElem.textContent = "@mis_redes";
        console.log("📌 Datos iniciales cargados en la vista previa.");
    }
    cargarDatosIniciales();
    function mostrarMensaje(texto) {
        console.log("📢 MENSAJE: " + texto);
    }
    window.actualizarPieDePagina = function (data) {
        descripcionPreview.textContent = data.descripcion || descripcionPreview.textContent;
        telefonoElem.textContent = data.telefono || telefonoElem.textContent;
        correoElem.textContent = data.correo || correoElem.textContent;
        quienElem.textContent = data.quien || quienElem.textContent;
        dondeElem.textContent = data.donde || dondeElem.textContent;
        direccionElem.textContent = data.direccion || direccionElem.textContent;
        avisoElem.textContent = data.aviso || avisoElem.textContent;
        socialElem.textContent = data.social || socialElem.textContent;
        mostrarMensaje("Vista previa actualizada correctamente.");
    };
});