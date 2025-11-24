//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//-----------------------------------------//
//--|funcionalidad_agregar_pie_de_pagina|--//
//-----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".campo input");
    const botonCrear = document.querySelector(".crear");
    botonCrear.addEventListener("click", () => {
        const valor = input.value.trim();
        if (valor === "") {
            alert("No hay ningún pie de página");
            return;
        }
        let pies = JSON.parse(localStorage.getItem("pie_de_pagina_tablero")) || [];
        const nuevoPie = {
            pie: valor,   
            titulo: "—",     
            iconos: "—",
            subtitulo: "—"
        };
        pies.push(nuevoPie);
        localStorage.setItem("pie_de_pagina_tablero", JSON.stringify(pies));
        input.value = "";
        alert(`El pie de página "${valor}" ha sido creado exitosamente`);
        document.dispatchEvent(new Event("actualizar_tabla"));
    });
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
document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 Script de pie_de_pagina cargado correctamente.");
    function mensajeHTML(texto) {
        alert(texto);
        console.log("📨 Mensaje JS:", texto);
    }
    const tablaBody = document.querySelector(".tabla-paginas1 tbody");
    function pintarListaPaginas(paginas) {
        const listaPaginas = document.querySelector(".lista-paginas1");
        if (!listaPaginas) return;
        listaPaginas.innerHTML = "";
        paginas.forEach(pagina => {
            const item = document.createElement("div");
            item.classList.add("pagina-item-lista");
            item.innerHTML = `
                <div class="pagina-box">
                    <i class="fa-solid fa-file"></i>
                    <span>${pagina.nombre}</span>
                </div>
            `;
            listaPaginas.appendChild(item);
        });
        console.log("📌 Lista actualizada en lista-paginas1");
    }
    document.addEventListener("actualizar_lista_paginas", (e) => {
        pintarListaPaginas(e.detail || []);
    });
    window.addEventListener("storage", (evt) => {
        if (evt.key === "paginasAgregadasMenu") {
            const paginas = JSON.parse(evt.newValue) || [];
            pintarListaPaginas(paginas);
        }
    });
    const inicialLista = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
    if (inicialLista.length) pintarListaPaginas(inicialLista);
    function mostrarPieDePagina() {
        tablaBody.innerHTML = "";
        const pies = JSON.parse(localStorage.getItem("pie_de_pagina_tablero")) || [];
        if (pies.length === 0) {
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
                <td>${item.iconos}</td>
                <td>${item.subtitulo}</td>
                <td class="col-opciones"></td>
                <td class="col-acciones">
                    <button class="btn-editar1" data-index="${index}">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-visualizar1" data-index="${index}">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn-eliminar1" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tablaBody.appendChild(tr);
        });
    }
    mostrarPieDePagina();
    document.addEventListener("actualizar_tabla", () => {
        mostrarPieDePagina();
    });
    tablaBody.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        let pies = JSON.parse(localStorage.getItem("pie_de_pagina_tablero")) || [];
        const index = btn.dataset.index;
        if (btn.classList.contains("btn-eliminar1")) {
            const nombre = pies[index].pie;
            pies.splice(index, 1);
            localStorage.setItem("pie_de_pagina_tablero", JSON.stringify(pies));
            mensajeHTML(`El pie de página "${nombre}" fue eliminado.`);
            mostrarPieDePagina();
        }
        if (btn.classList.contains("btn-editar1")) {
            const item = pies[index];
            const nuevoTitulo = prompt("Editar título:", item.titulo);
            if (!nuevoTitulo) return;
            pies[index].titulo = nuevoTitulo.trim();
            localStorage.setItem("pie_de_pagina_tablero", JSON.stringify(pies));
            mensajeHTML(`El título fue cambiado a "${nuevoTitulo}".`);
            mostrarPieDePagina();
        }
        if (btn.classList.contains("btn-visualizar1")) {
            const item = pies[index];
            mensajeHTML(`Vista previa del pie de página: "${item.titulo}"`);
        }
    });
    const btnAgregar = document.getElementById("btnAgregar");
    const inputTitulo = document.querySelector(".input_titulo");
    const inputSub = document.querySelector(".input-sub");
    const botonGuardarSub = document.querySelector(".icono-sub");
    let subtitulosGuardados = [];
    botonGuardarSub.addEventListener("click", () => {
        const subtitulo = inputSub.value.trim();
        if (!subtitulo) {
            mensajeHTML("Debe escribir un subtítulo.");
            return;
        }
        subtitulosGuardados.push(subtitulo);
        mensajeHTML(`Subtítulo "${subtitulo}" añadido.`);
        inputSub.value = "";
        if (subtitulosGuardados.length === 4) {
            mensajeHTML("Se añadieron 4 subtítulos con éxito.");
        }
    });
    const inputNuevaOpcion = document.querySelector(".input-opciones");
    if (inputNuevaOpcion) {
        inputNuevaOpcion.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                const nuevaOpcion = inputNuevaOpcion.value.trim();
                if (!nuevaOpcion) {
                    mensajeHTML("Debe escribir una opción.");
                    return;
                }
                let paginas = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
                paginas.push({ nombre: nuevaOpcion });
                localStorage.setItem("paginasAgregadasMenu", JSON.stringify(paginas));
                pintarListaPaginas(paginas);
                document.dispatchEvent(new CustomEvent("actualizar_lista_paginas", {
                    detail: paginas
                }));
                mensajeHTML(`La opción "${nuevaOpcion}" fue añadida.`);
                inputNuevaOpcion.value = "";
            }
        });
    }
    const botonesMas = document.querySelectorAll(".mas2");
    const modal = document.getElementById("modalIconos");
    const iconosEnModal = document.querySelectorAll(".modal-iconos .iconos-grid i");
    let cajaSeleccionada = null;
    botonesMas.forEach((boton) => {
        boton.addEventListener("click", () => {
            cajaSeleccionada = boton;
            modal.style.display = "block";
        });
    });
    iconosEnModal.forEach((icono) => {
        icono.addEventListener("click", () => {
            if (cajaSeleccionada) {
                cajaSeleccionada.innerHTML = `<i class="${icono.className}"></i>`;
            }
            modal.style.display = "none";
        });
    });
    document.getElementById("cerrarModal").addEventListener("click", () => {
        modal.style.display = "none";
    });
    btnAgregar.addEventListener("click", () => {
        const titulo = inputTitulo.value.trim();
        if (!titulo) {
            mensajeHTML("Debe escribir un título.");
            return;
        }
        const subtitulosFinal = subtitulosGuardados.length
            ? subtitulosGuardados.join(", ")
            : "Sin subtítulos";
        const paginas = JSON.parse(localStorage.getItem("paginasAgregadasMenu")) || [];
        const opcionesFinal = paginas.length
            ? paginas.map(p => p.nombre).join(", ")
            : "Sin opciones";
        const iconBoxes = document.querySelectorAll(".mas2");
        const iconosFinal = [...iconBoxes].map(div => {
            const icn = div.querySelector("i");
            return icn ? icn.outerHTML : "";
        }).join(" ");
        const nuevoPie = {
            pie: `Pie ${Date.now()}`,
            titulo: titulo,
            iconos: iconosFinal,
            subtitulo: subtitulosFinal,
            opciones: opcionesFinal
        };
        const pies = JSON.parse(localStorage.getItem("pie_de_pagina_tablero")) || [];
        pies.push(nuevoPie);
        localStorage.setItem("pie_de_pagina_tablero", JSON.stringify(pies));
        mensajeHTML(`El pie de página "${titulo}" fue creado.`);
        document.dispatchEvent(new CustomEvent("actualizar_tabla"));
        inputTitulo.value = "";
        subtitulosGuardados = [];
    });
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
                <td>${item.iconos}</td>
                <td>${item.subtitulo}</td>
                <!-- AHORA SI MUESTRA LAS OPCIONES DEL FORMULARIO -->
                <td class="col-opciones">${item.opciones}</td>
                <td class="col-acciones">
                    <button class="btn-editar1" data-index="${index}">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-visualizar1" data-index="${index}">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn-eliminar1" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
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