//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//--------------------------------------------------------//
//--|funcionalidad_edicion_predeterminada_pie_de_pagina|--//
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
const imagenBox = document.querySelector(".imagen-box");
const iconoImagen = imagenBox.querySelector("i");
const inputImagen = document.createElement("input");
inputImagen.type = "file";
inputImagen.accept = "image/*";
inputImagen.style.display = "none";
document.body.appendChild(inputImagen);
imagenBox.addEventListener("click", () => {
    inputImagen.click();
});
inputImagen.addEventListener("change", () => {
    const archivo = inputImagen.files[0];
    if (!archivo) return;
    if (!archivo.type.startsWith("image/")) {
        mostrarMensaje("El archivo seleccionado no es una imagen.", "error");
        return;
    }
    const reader = new FileReader();
    reader.onload = () => {
        const base64 = reader.result;
        imagenBox.innerHTML = "";
        const img = document.createElement("img");
        img.src = base64;
        img.alt = "Imagen seleccionada";
        imagenBox.appendChild(img);
        localStorage.setItem("imagen_pie_de_pagina", base64);
        mostrarMensaje("Imagen agregada correctamente.", "exito");
    };
    reader.readAsDataURL(archivo);
});
window.addEventListener("load", () => {
    const imagenGuardada = localStorage.getItem("imagen_pie_de_pagina");
    if (imagenGuardada) {
        imagenBox.innerHTML = "";
        const img = document.createElement("img");
        img.src = imagenGuardada;
        img.alt = "Imagen guardada";
        imagenBox.appendChild(img);
    }
});
btnAgregar.addEventListener("click", () => {
    const listaActual = JSON.parse(localStorage.getItem("pie_de_pagina_tablero")) || [];
    const LIMITE_TABLERO = 4;
    if (listaActual.length >= LIMITE_TABLERO) {
        mostrarMensaje(
            "Has alcanzado el límite de datos en el tablero. Máximo permitido: " + LIMITE_TABLERO,
            "error"
        );
        return;
    }
    const pie = inputPie.value.trim();
    const titulo = inputTitulo.value.trim();
    const subtitulos = JSON.parse(localStorage.getItem("subtitulos")) || [];
    const opcionesExtra = JSON.parse(localStorage.getItem("opciones_extra")) || [];
    const iconosGuardados = JSON.parse(localStorage.getItem("iconos_cajas")) || {};
    const seleccionadas = JSON.parse(localStorage.getItem("paginas_seleccionadas")) || [];
    const imagen = localStorage.getItem("imagen_pie_de_pagina") || "";
    const noHayDatos =
        pie === "" &&
        titulo === "" &&
        subtitulos.length === 0 &&
        opcionesExtra.length === 0 &&
        Object.keys(iconosGuardados).length === 0 &&
        seleccionadas.length === 0 &&
        imagen === "";
    if (noHayDatos) {
        mostrarMensaje("No hay datos agregados en el formulario.", "error");
        return;
    }
    let errores = [];
    if (pie === "") errores.push("• Falta añadir el pie de página");
    else localStorage.setItem("pie_de_pagina", pie);
    if (titulo === "") errores.push("• Falta añadir el título");
    else localStorage.setItem("titulo_pagina", titulo);
    if (subtitulos.length === 0) errores.push("• Falta mínimo 1 subtítulo");
    if (subtitulos.length > 4) errores.push("• Solo se permiten 4 subtítulos");
    if (opcionesExtra.length === 0) errores.push("• Agrega al menos 1 nueva opción");
    if (Object.keys(iconosGuardados).length < 4) errores.push("• Selecciona los 4 iconos");
    if (seleccionadas.length === 0) errores.push("• Selecciona mínimo 1 opción de la lista");
    if (errores.length > 0) {
        mostrarMensaje("Faltan datos en el formulario.", "error");
        return;
    }
    mostrarMensaje("Todos los datos han sido añadidos correctamente.", "exito");
    const nuevoPie = {
        pie,
        titulo,
        imagen,
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
                <td colspan="7" style="text-align:center;">
                    No hay pies de página creados
                </td>
            `;
            tablaBody.appendChild(filaVacia);
            return;
        }
        pies.forEach((item, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${item.pie}</td>
                <td class="celda-imagen">
                    ${
                        item.imagen
                            ? `<img src="${item.imagen}" class="img-tablero" alt="Imagen pie">`
                            : `<span>Sin imagen</span>`
                    }
                </td>
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
            const datosVistaPrevia = {
                imagen: item.imagen || "",
                titulo: item.titulo || "",
                iconos: item.iconos
                    ? item.iconos.replace(/<br\s*\/?>/gi, "|")
                    : "",
                subtitulos: item.subtitulo
                    ? item.subtitulo.replace(/<br\s*\/?>/gi, "|")
                    : "",
                opciones: item.opciones
                    ? item.opciones.replace(/<br\s*\/?>/gi, "|")
                    : ""
            };
            localStorage.setItem(
                "datos_enviados_desde_tablero",
                JSON.stringify(datosVistaPrevia)
            );
            mensajeHTML(`
                <i class="fa-solid fa-circle-check"></i>
                Datos enviados a la vista previa correctamente.
            `);
        }
    });
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
    const bigLeftBox = document.querySelector(".big-left-box");
    let boxIconos = document.querySelectorAll(".mini:not(.wide)");
    let boxSubtitulos = document.querySelectorAll(".mini.wide");
    let boxOpciones = document.querySelectorAll(".item1, .item2, .item3, .item4");
    const fallbackMini = document.querySelector(".mini");
    const fallbackMiniWide = document.querySelector(".mini.wide");
    function ensureNodeLists() {
        if ((!boxIconos || boxIconos.length === 0) && fallbackMini) {
            boxIconos = [fallbackMini];
        }
        if ((!boxSubtitulos || boxSubtitulos.length === 0) && fallbackMiniWide) {
            boxSubtitulos = [fallbackMiniWide];
        }
        if (!boxOpciones || boxOpciones.length === 0) {
            boxOpciones = [];
        }
    }
    ensureNodeLists();
    const bottomBox = document.querySelector(".bottom-box");
    if (bottomBox) {
        const raw = localStorage.getItem("vista_previa_footer");
        if (raw) {
            try {
                const datos = JSON.parse(raw);
                if (datos.bottom) {
                    bottomBox.innerHTML = datos.bottom;
                }
            } catch {}
        }
    }
    if (bottomBox) {
        bottomBox.setAttribute("contenteditable", "true");
        bottomBox.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                guardarVistaPrevia();
                mostrarMensaje("Se ha guardado correctamente", "info");
                bottomBox.blur();
            }
        });
    }
    function cargarDatosDesdeTablero() {
        const raw = localStorage.getItem("datos_enviados_desde_tablero");
        if (!raw) return;
        let data;
        try { data = JSON.parse(raw); } catch { return; }
        if (bigLeftBox && data.imagen) {
            bigLeftBox.innerHTML = `<img src="${data.imagen}" alt="Imagen pie">`;
        }
        if (boxTitulo && data.titulo) {
            boxTitulo.innerHTML = data.titulo;
        }
        if (data.iconos) {
            const lista = data.iconos.split("|").map(i => i.trim());
            boxIconos.forEach((box, i) => box.innerHTML = lista[i] ?? "");
        }
        if (data.subtitulos) {
            const lista = data.subtitulos.split("|").map(s => s.trim());
            boxSubtitulos.forEach((box, i) => box.innerHTML = lista[i] ?? "");
        }
        if (data.opciones) {
            const lista = data.opciones.split("|").map(o => o.trim()).filter(Boolean);
            boxOpciones.forEach(b => b.innerHTML = "");
            lista.forEach((v, i) => boxOpciones[i] && (boxOpciones[i].innerHTML = v));
        }
        guardarVistaPrevia();
    }
    cargarDatosDesdeTablero();
    function guardarVistaPrevia() {
        ensureNodeLists();
        const datos = {
            titulo: boxTitulo?.innerHTML.trim() || "",
            iconos: Array.from(boxIconos).map(d => d.innerHTML),
            subtitulos: Array.from(boxSubtitulos).map(d => d.innerHTML),
            opciones: Array.from(boxOpciones).map(d => d.innerHTML.trim()),
            bottom: bottomBox?.innerHTML.trim() || ""
        };
        localStorage.setItem("vista_previa_footer", JSON.stringify(datos));
    }
    function cargarVistaPrevGuardada() {
        const raw = localStorage.getItem("vista_previa_footer");
        if (!raw) return;
        let datos;
        try { datos = JSON.parse(raw); } catch { return; }
        if (datos.titulo && boxTitulo) boxTitulo.innerHTML = datos.titulo;
        if (datos.iconos) datos.iconos.forEach((v, i) => boxIconos[i] && (boxIconos[i].innerHTML = v));
        if (datos.subtitulos) datos.subtitulos.forEach((v, i) => boxSubtitulos[i] && (boxSubtitulos[i].innerHTML = v));
        if (datos.bottom && bottomBox) bottomBox.innerHTML = datos.bottom;
    }
    cargarVistaPrevGuardada();
    const btnBorrar = document.querySelector(".btn1");
    const btnEnviar = document.querySelector(".btn2");
    if (btnBorrar) {
        btnBorrar.addEventListener("click", () => {
            if (bigLeftBox) bigLeftBox.innerHTML = "";
            if (boxTitulo) boxTitulo.innerHTML = "";
            if (bottomBox) bottomBox.innerHTML = "";
            boxIconos.forEach(b => b.innerHTML = "");
            boxSubtitulos.forEach(b => b.innerHTML = "");
            boxOpciones.forEach(b => b.innerHTML = "");
            localStorage.removeItem("vista_previa_footer");
            mostrarMensaje("Se ha borrado el pie de página", "info");
        });
    }
    if (btnEnviar) {
        btnEnviar.addEventListener("click", () => {
            const raw = localStorage.getItem("vista_previa_footer");
            if (!raw) {
                mostrarMensaje("No hay ningún pie de página", "info");
                return;
            }
            let datos;
            try {
                datos = JSON.parse(raw);
            } catch {
                mostrarMensaje("No hay ningún pie de página", "info");
                return;
            }
            const hayContenido =
                datos.titulo ||
                datos.bottom ||
                datos.iconos?.some(v => v.trim() !== "") ||
                datos.subtitulos?.some(v => v.trim() !== "") ||
                datos.opciones?.some(v => v.trim() !== "");
            if (!hayContenido) {
                mostrarMensaje("No hay ningún pie de página", "info");
                return;
            }
            // 🔒 Guarda la vista previa actualizada
            guardarVistaPrevia();
            // 📦 Construye el footer final que usará plataforma_dinamica.html
            const footerFinal = {
                logo: bigLeftBox?.querySelector("img")?.src || "",
                titulo: datos.titulo || "",
                iconos: datos.iconos || [],
                subtitulos: datos.subtitulos || [],
                opciones: datos.opciones || [],
                bottom: datos.bottom || ""
            };
            // 💾 Guarda DEFINITIVAMENTE el footer
            localStorage.setItem(
                "footer_plataforma_dinamica",
                JSON.stringify(footerFinal)
            );
            // ✅ Confirmación visual (sin redirección)
            mostrarMensaje("Pie de página enviado correctamente", "success");
        });
    }
});