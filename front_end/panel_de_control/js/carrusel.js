//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//-------------------------------------------------//
//--|funcionalidad_edicion_predeterminada_pagina|--//
//-------------------------------------------------//
function mostrarMensaje(texto, tipo = "info") {
    const estado = document.getElementById("estadoEdicion");
    if (!estado) return; 
    estado.innerHTML = "";
    const mensaje = document.createElement("div");
    mensaje.classList.add("mensaje", tipo);
    mensaje.textContent = texto;
    estado.appendChild(mensaje);
}
//------------------------------------------//
//--|funcionalidad_formulario_de_carrusel|--//
//------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const btnCrear_carrusel = document.querySelector(".btn-crear");
    const inputNombre_carrusel = document.querySelector(".input-carrusel");
    const selectTiempo_carrusel = document.querySelector(".select-tiempo");
    const checkboxes_carrusel = document.querySelectorAll(
        ".opciones input[type='checkbox']"
    );
    const contenedorImagen_carrusel = document.querySelector(".contenedor-imagen");
    const inputImagenes_carrusel = document.createElement("input");
    inputImagenes_carrusel.type = "file";
    inputImagenes_carrusel.multiple = true;
    inputImagenes_carrusel.accept = "image/*";
    inputImagenes_carrusel.style.display = "none";
    document.body.appendChild(inputImagenes_carrusel);
    let imagenesSeleccionadas_carrusel = [];
    console.log("Formulario de carrusel cargado correctamente ✅");
    contenedorImagen_carrusel.addEventListener("click", () => {
        inputImagenes_carrusel.click();
    });
    inputImagenes_carrusel.addEventListener("change", () => {
        const archivos = Array.from(inputImagenes_carrusel.files);
        imagenesSeleccionadas_carrusel = [];
        contenedorImagen_carrusel.innerHTML = "";
        if (archivos.length === 0) return;
        archivos.forEach(archivo => {
            if (!archivo.type.startsWith("image/")) return;
            const reader = new FileReader();
            reader.onload = e => {
                imagenesSeleccionadas_carrusel.push(e.target.result);
                const img = document.createElement("img");
                img.src = e.target.result;
                img.style.width = "60px";
                img.style.height = "60px";
                img.style.objectFit = "cover";
                img.style.margin = "4px";
                img.style.borderRadius = "5px";
                contenedorImagen_carrusel.appendChild(img);
            };
            reader.readAsDataURL(archivo);
        });
    });
    btnCrear_carrusel.addEventListener("click", () => {
        const nombreCarrusel = inputNombre_carrusel.value.trim();
        const tiempoCarrusel = selectTiempo_carrusel.value;
        const [chkAutomatico, chkIndicadores, chkControladores] = checkboxes_carrusel;
        if (
            nombreCarrusel === "" ||
            tiempoCarrusel === "" ||
            imagenesSeleccionadas_carrusel.length === 0
        ) {
            mostrarMensaje(
                "No hay ningún carrusel creado. Verifica los campos y las imágenes.",
                "error"
            );
            return;
        }
        let carruseles =
            JSON.parse(localStorage.getItem("carruselesCreados_tablero_del_carrusel")) || [];
        if (carruseles.some(c => c.nombre === nombreCarrusel)) {
            mostrarMensaje(
                `Ya existe un carrusel con el nombre "${nombreCarrusel}".`,
                "error"
            );
            return;
        }
        const nuevoCarrusel = {
            nombre: nombreCarrusel,
            imagenes: imagenesSeleccionadas_carrusel,
            tiempo: tiempoCarrusel ? Number(tiempoCarrusel) : null,
            automatico: chkAutomatico.checked,
            indicadores: chkIndicadores.checked,
            controladores: chkControladores.checked,
            creadoEn: Date.now()
        };
        carruseles.push(nuevoCarrusel);
        localStorage.setItem(
            "carruselesCreados_tablero_del_carrusel",
            JSON.stringify(carruseles)
        );
        mostrarMensaje(
            "Se ha creado el carrusel exitosamente.",
            "success"
        );
        inputNombre_carrusel.value = "";
        selectTiempo_carrusel.selectedIndex = 0;
        checkboxes_carrusel.forEach(chk => chk.checked = false);
        imagenesSeleccionadas_carrusel = [];
        inputImagenes_carrusel.value = "";
        contenedorImagen_carrusel.innerHTML =
            '<i class="fa-solid fa-image icono-imagen"></i>';
        document.dispatchEvent(
            new CustomEvent("carrusel_creado", {
                detail: nuevoCarrusel
            })
        );
    });
});
//----------------------------------------//
//--|funcionalidad_tablero_del_carrusel|--//
//----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const tablaBody_tablero_del_carrusel =
        document.querySelector(".tabla-paginas tbody");
    console.log("Script del tablero del carrusel cargado correctamente ✅");
    function mostrarCarruseles_tablero_del_carrusel() {
        tablaBody_tablero_del_carrusel.innerHTML = "";
        const carruseles_tablero_del_carrusel =
            JSON.parse(localStorage.getItem("carruselesCreados_tablero_del_carrusel")) || [];
        if (carruseles_tablero_del_carrusel.length === 0) {
            const filaVacia = document.createElement("tr");
            filaVacia.innerHTML = `
                <td colspan="7" style="text-align:center;">
                    No hay carruseles creados
                </td>
            `;
            tablaBody_tablero_del_carrusel.appendChild(filaVacia);
            return;
        }
        carruseles_tablero_del_carrusel.forEach((carrusel, index) => {
            const fila = document.createElement("tr");
            const celdaImagenes = document.createElement("td");
            const contenedorImgs = document.createElement("div");
            contenedorImgs.className = "imagenes-tablero";
            carrusel.imagenes.forEach(src => {
                const img = document.createElement("img");
                img.src = src;
                img.alt = carrusel.nombre;
                contenedorImgs.appendChild(img);
            });
            celdaImagenes.appendChild(contenedorImgs);
            fila.innerHTML = `
                <td>${carrusel.nombre}</td>
                <td></td>
                <td>${carrusel.tiempo || "-"}</td>
                <td>${carrusel.automatico ? "Sí" : "No"}</td>
                <td>${carrusel.indicadores ? "Sí" : "No"}</td>
                <td>${carrusel.controladores ? "Sí" : "No"}</td>
                <td class="contenerdor-icono">
                    <button class="btn-anadir" data-index="${index}" title="Añadir carrusel">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <button class="btn-editar" data-index="${index}" title="Editar carrusel">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-visualizar" data-index="${index}" title="Visualizar carrusel">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn-eliminar" data-index="${index}" title="Eliminar carrusel">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            fila.children[1].replaceWith(celdaImagenes);
            tablaBody_tablero_del_carrusel.appendChild(fila);
        });
    }
    tablaBody_tablero_del_carrusel.addEventListener("click", (e) => {
        if (e.target.closest(".btn-anadir")) {
            const index = e.target.closest(".btn-anadir").dataset.index;
            const carruseles_tablero_del_carrusel =
                JSON.parse(localStorage.getItem("carruselesCreados_tablero_del_carrusel")) || [];
            const carruselSeleccionado = carruseles_tablero_del_carrusel[index];
            if (!carruselSeleccionado) return;
            if (typeof window.cargarCarruselEnVistaPrevia === "function") {
                window.cargarCarruselEnVistaPrevia(carruselSeleccionado);
            }
            mostrarMensaje(
                `Carrusel "${carruselSeleccionado.nombre}" añadido a la vista previa.`,
                "success"
            );
        }
        if (e.target.closest(".btn-eliminar")) {
            const index = e.target.closest(".btn-eliminar").dataset.index;
            let carruseles_tablero_del_carrusel =
                JSON.parse(localStorage.getItem("carruselesCreados_tablero_del_carrusel")) || [];
            const nombreCarrusel = carruseles_tablero_del_carrusel[index].nombre;
            if (!confirm(`¿Seguro que deseas eliminar el carrusel "${nombreCarrusel}"?`)) return;
            carruseles_tablero_del_carrusel.splice(index, 1);
            localStorage.setItem(
                "carruselesCreados_tablero_del_carrusel",
                JSON.stringify(carruseles_tablero_del_carrusel)
            );
            mostrarCarruseles_tablero_del_carrusel();
            mostrarMensaje(
                `Carrusel "${nombreCarrusel}" eliminado correctamente.`,
                "success"
            );
        }
        if (e.target.closest(".btn-editar")) {
            const index = e.target.closest(".btn-editar").dataset.index;
            let carruseles_tablero_del_carrusel =
                JSON.parse(localStorage.getItem("carruselesCreados_tablero_del_carrusel")) || [];
            const nombreActual = carruseles_tablero_del_carrusel[index].nombre;
            const nuevoNombre = prompt(
                `Editar nombre del carrusel "${nombreActual}":`,
                nombreActual
            );
            if (!nuevoNombre || nuevoNombre.trim() === "") return;
            carruseles_tablero_del_carrusel[index].nombre = nuevoNombre.trim();
            localStorage.setItem(
                "carruselesCreados_tablero_del_carrusel",
                JSON.stringify(carruseles_tablero_del_carrusel)
            );
            mostrarCarruseles_tablero_del_carrusel();
            mostrarMensaje(
                `Carrusel renombrado a "${nuevoNombre.trim()}".`,
                "info"
            );
        }
        if (e.target.closest(".btn-visualizar")) {
            const index = e.target.closest(".btn-visualizar").dataset.index;
            const carruseles_tablero_del_carrusel =
                JSON.parse(localStorage.getItem("carruselesCreados_tablero_del_carrusel")) || [];
            const carrusel = carruseles_tablero_del_carrusel[index];
            mostrarMensaje(
                `Vista previa del carrusel "${carrusel.nombre}".`,
                "info"
            );
        }
    });
    mostrarCarruseles_tablero_del_carrusel();
});
//---------------------------------------------//
//--|funcionalidad_vista_previa_del_carrusel|--//
//---------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const STORAGE_KEY = "carruselActivo_vista_previa";
    const vistaPrevia = document.getElementById("vistaPreviaCarrusel");
    if (!vistaPrevia) {
        console.warn("❌ Vista previa del carrusel no encontrada");
        return;
    }
    const carruselContenedor = document.getElementById("contenedorImagenCarrusel");
    const btnIzquierda = document.getElementById("btnCarruselIzq");
    const btnDerecha = document.getElementById("btnCarruselDer");
    const indicadoresContainer = document.getElementById("indicadoresCarrusel");
    const titulo = document.getElementById("tituloCarrusel");
    const btnDespliegue = document.getElementById("btnDespliegue");
    let imagenes = [];
    let indiceActual = 0;
    let timeoutId = null;
    let carruselActual = null;
    const img = document.createElement("img");
    carruselContenedor.innerHTML = "";
    carruselContenedor.appendChild(img);
    window.cargarCarruselEnVistaPrevia = function (carrusel) {
        if (!carrusel || !Array.isArray(carrusel.imagenes) || carrusel.imagenes.length === 0) {
            mostrarMensaje("No hay ningún dato a desplegar", "error");
            return;
        }
        carruselActual = {
            ...carrusel,
            automatico: carrusel.automatico === true || carrusel.automatico === "true",
            indicadores: carrusel.indicadores === true || carrusel.indicadores === "true",
            controladores: carrusel.controladores === true || carrusel.controladores === "true",
            tiempo: carrusel.tiempo && Number(carrusel.tiempo) > 0
                ? Number(carrusel.tiempo) * 1000
                : null
        };
        indiceActual = 0;
        guardarEstado();
        mostrarMensaje("Carrusel cargado correctamente", "success");
    };
    if (btnDespliegue) {
        btnDespliegue.addEventListener("click", () => {
            if (!carruselActual || !Array.isArray(carruselActual.imagenes) || carruselActual.imagenes.length === 0) {
                mostrarMensaje("No hay ningún dato a desplegar", "error");
                return;
            }
            localStorage.setItem(
                "carrusel_dinamico",
                JSON.stringify(carruselActual)
            );
            mostrarMensaje("Carrusel desplegado correctamente", "success");
            window.dispatchEvent(new Event("carruselActualizado"));
        });
    }
    function renderizarCarrusel() {
        if (!carruselActual) return;
        imagenes = carruselActual.imagenes || [];
        if (imagenes.length === 0) return;
        img.src = imagenes[indiceActual];
        renderizarIndicadores();
        if (carruselActual.controladores) {
            btnIzquierda.style.display = "flex";
            btnDerecha.style.display = "flex";
            btnIzquierda.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
            btnDerecha.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
        } else {
            btnIzquierda.style.display = "none";
            btnDerecha.style.display = "none";
        }
    }
    function renderizarIndicadores() {
        indicadoresContainer.innerHTML = "";
        if (!carruselActual.indicadores) {
            indicadoresContainer.style.display = "none";
            return;
        }
        imagenes.forEach((_, i) => {
            const ind = document.createElement("div");
            ind.className = "indicador";
            if (i === indiceActual) ind.classList.add("activo");
            ind.addEventListener("click", () => {
                indiceActual = i;
                actualizarCarrusel();
                reiniciarAutoplay();
            });
            indicadoresContainer.appendChild(ind);
        });
        indicadoresContainer.style.display = "flex";
    }
    function actualizarCarrusel() {
        img.style.opacity = 0;
        setTimeout(() => {
            img.src = imagenes[indiceActual];
            img.style.opacity = 1;
            actualizarIndicadores();
        }, 150);
    }
    function actualizarIndicadores() {
        indicadoresContainer
            .querySelectorAll(".indicador")
            .forEach((el, i) =>
                el.classList.toggle("activo", i === indiceActual)
            );
    }
    function siguiente() {
        indiceActual = (indiceActual + 1) % imagenes.length;
        actualizarCarrusel();
    }
    function anterior() {
        indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
        actualizarCarrusel();
    }
    function iniciarAutoplay() {
        if (!carruselActual?.automatico || !carruselActual.tiempo || imagenes.length <= 1) return;
        timeoutId = setTimeout(() => {
            siguiente();
            iniciarAutoplay();
        }, carruselActual.tiempo);
    }
    function detenerAutoplay() {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
    function reiniciarAutoplay() {
        detenerAutoplay();
        iniciarAutoplay();
    }
    btnIzquierda.addEventListener("click", () => {
        if (!carruselActual || !carruselActual.controladores) return;
        anterior();
        reiniciarAutoplay();
    });
    btnDerecha.addEventListener("click", () => {
        if (!carruselActual || !carruselActual.controladores) return;
        siguiente();
        reiniciarAutoplay();
    });
    function guardarEstado() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            carrusel: carruselActual,
            indiceActual
        }));
    }
    function restaurarEstado() {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!data) return;
        carruselActual = data.carrusel;
        indiceActual = data.indiceActual || 0;
        renderizarCarrusel();
        iniciarAutoplay();
    }
    restaurarEstado();
});