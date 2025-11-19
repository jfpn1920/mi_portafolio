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
//----------------------------------//
//--|funcionalidad_agregar_imagen|--//
//----------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    mostrarMensaje("Script de agregar imagen cargado correctamente.", "info");
    const imagenBox_categorias = document.querySelector(".imagen-box");
    const botonAgregar_categorias = document.querySelector(".imagen-btn");
    const inputImagen_categorias = document.createElement("input");
    inputImagen_categorias.type = "file";
    inputImagen_categorias.accept = "image/*";
    inputImagen_categorias.style.display = "none";
    document.body.appendChild(inputImagen_categorias);
    let imagenSeleccionada_categorias = null;
    const imagenGuardada = localStorage.getItem("imagenSeleccionada_categorias");
    if (imagenGuardada) {
        mostrarMensaje("Imagen encontrada en memoria. Cargada correctamente.", "info");
        if (window.EstiloCategoria) {
            EstiloCategoria.actualizarImagenCentral(imagenGuardada);
        }
        imagenBox_categorias.innerHTML = `<i class="fa-regular fa-image"></i>`;
    }
    imagenBox_categorias.addEventListener("click", () => {
        inputImagen_categorias.click();
    });
    inputImagen_categorias.addEventListener("change", (e) => {
        const archivo = e.target.files[0];
        if (!archivo) return;
        const lector = new FileReader();
        lector.onload = (evento) => {
            imagenSeleccionada_categorias = evento.target.result;
            imagenBox_categorias.innerHTML = `
                <img src="${imagenSeleccionada_categorias}"
                        alt="Vista previa"
                        style="width: 100%; height: 95%; object-fit:contain; border-radius:6px;">
            `;
            mostrarMensaje("Imagen cargada para vista previa.", "info");
        };
        lector.readAsDataURL(archivo);
    });
    botonAgregar_categorias.addEventListener("click", () => {
        if (!imagenSeleccionada_categorias) {
            mostrarMensaje("No has seleccionado ninguna imagen.", "error");
            return;
        }
        if (window.EstiloCategoria && typeof EstiloCategoria.actualizarImagenCentral === "function") {
            EstiloCategoria.actualizarImagenCentral(imagenSeleccionada_categorias);
        } else {
            mostrarMensaje("Error: EstiloCategoria.actualizarImagenCentral no existe.", "error");
            return;
        }
        localStorage.setItem("imagenSeleccionada_categorias", imagenSeleccionada_categorias);
        mostrarMensaje("La imagen fue agregada correctamente.", "success");
        imagenBox_categorias.innerHTML = `<i class="fa-regular fa-image"></i>`;
        inputImagen_categorias.value = "";
        imagenSeleccionada_categorias = null;
    });
});
//-------------------------------------------//
//--|funcionalidad_formulario_de_categoria|--//
//-------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    mostrarMensaje("Script de formulario de categoría cargado.", "info");
    const campoCategoria = document.querySelectorAll(".campo")[0];
    const campoPrecio = document.querySelectorAll(".campo")[1];
    const selectTipo = document.querySelectorAll(".select")[0];
    const selectIcono = document.querySelectorAll(".select")[1];
    const botonGuardar = document.querySelector(".btn-guardar");
    campoCategoria.addEventListener("input", () => {
        console.log("📌 Categoría:", campoCategoria.value);
    });
    campoPrecio.addEventListener("input", () => {
        console.log("💲 Precio:", campoPrecio.value);
    });
    selectTipo.addEventListener("change", () => {
        console.log("🔧 Tipo seleccionado:", selectTipo.value);
    });
    selectIcono.addEventListener("change", () => {
        console.log("🎨 Icono seleccionado:", selectIcono.value);
    });
    botonGuardar.addEventListener("click", () => {
        mostrarMensaje("Intentando guardar la categoría...", "info");
        const formularioIncompleto =
            campoCategoria.value.trim() === "" ||
            campoPrecio.value.trim() === "" ||
            selectTipo.value.includes("Seleccionar") ||
            selectIcono.value.includes("Seleccionar");
        if (formularioIncompleto) {
            mostrarMensaje("No has llenado el formulario.", "error");
            return;
        }
        let categorias = JSON.parse(localStorage.getItem("categorias_tablero")) || [];
        if (categorias.length >= 19) {
            mostrarMensaje("Has alcanzado el máximo permitido en el tablero.", "error");
            return;
        }
        mostrarMensaje("Se ha guardado con éxito.", "success");
        const nuevaCategoria = {
            nombre: campoCategoria.value,
            imagen: "sin imagen",
            tipo: selectTipo.value,
            icono: selectIcono.value,
            precio: campoPrecio.value
        };
        categorias.push(nuevaCategoria);
        localStorage.setItem("categorias_tablero", JSON.stringify(categorias));
        mostrarMensaje("Categoría guardada en memoria.", "success");
    });
});
//----------------------------------------//
//--|funcionalidad_estilo_de_categorias|--//
//----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    mostrarMensaje("JS de categorías cargado.", "info");
    const btnAnadir = document.querySelector(".btn-anadir");
    const vistaCategoria = document.querySelector(".vista-categoria");
    const celda1 = vistaCategoria.querySelector(".col-1");
    const celda2 = vistaCategoria.querySelector(".col-2");
    const cajaCentral = vistaCategoria.querySelector(".caja-central");
    const pieInfo = vistaCategoria.querySelector(".pie-info");
    function guardarEstado() {
        const estado = {
            celda1: celda1.innerHTML.trim(),
            celda2: celda2.textContent.trim(),
            contenidoCentral: cajaCentral.innerHTML.trim(),
            pie: pieInfo.innerHTML.trim()
        };
        localStorage.setItem("estado_categoria_vista", JSON.stringify(estado));
        mostrarMensaje("Estado guardado.", "success");
    }
    function cargarEstado() {
        const estadoGuardado = JSON.parse(localStorage.getItem("estado_categoria_vista"));
        if (!estadoGuardado) {
            mostrarMensaje("No hay nada en la visualización de categoría", "error");
            return;
        }
        const sinContenido =
            (!estadoGuardado.celda1 || estadoGuardado.celda1.trim() === "") &&
            (!estadoGuardado.celda2 || estadoGuardado.celda2.trim() === "") &&
            (!estadoGuardado.contenidoCentral || estadoGuardado.contenidoCentral.trim() === "") &&
            (!estadoGuardado.pie || estadoGuardado.pie.trim() === "");
        if (sinContenido) {
            mostrarMensaje("No hay nada en la visualización de categoría", "error");
            return;
        }
        celda1.innerHTML = estadoGuardado.celda1;
        celda2.textContent = estadoGuardado.celda2;
        cajaCentral.innerHTML = estadoGuardado.contenidoCentral;
        pieInfo.innerHTML = estadoGuardado.pie;
        mostrarMensaje("Estado restaurado correctamente.", "success");
    }
    cargarEstado();
    btnAnadir.addEventListener("click", () => {
        const estadoActual = JSON.parse(localStorage.getItem("estado_categoria_vista"));
        if (!estadoActual) {
            mostrarMensaje("No hay nada en la visualización de categoría", "error");
            return;
        }
        guardarEstado();
        mostrarMensaje("Se ha añadido la categoría con éxito", "success");
    });
    function actualizarCeldas(iconoHTML, nombre) {
        celda1.innerHTML = iconoHTML;
        celda2.textContent = nombre;
        guardarEstado();
    }
    function actualizarContenidoCentral(texto) {
        cajaCentral.textContent = texto;
        guardarEstado();
    }
    function actualizarPie(tipo, precio) {
        pieInfo.innerHTML = `
            <p><strong>Tipo:</strong> ${tipo}</p>
            <p><strong>Precio:</strong> ${precio}</p>
        `;
        guardarEstado();
    }
    function actualizarImagenCentral(base64) {
        cajaCentral.innerHTML = `
            <img src="${base64}"
                alt="Imagen"
                style="width: 100%; height: 100%; object-fit:cover;">
        `;
        guardarEstado();
    }
    const imagenGuardada = localStorage.getItem("imagenSeleccionada_categorias");
    if (imagenGuardada) {
        mostrarMensaje("Mostrando imagen guardada.", "info");
        actualizarImagenCentral(imagenGuardada);
    }
    window.EstiloCategoria = {
        actualizarCeldas,
        actualizarContenidoCentral,
        actualizarPie,
        actualizarImagenCentral
    };
});
//-------------------------------------//
//--|funcionalidad_tablero_categoria|--//
//-------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 Script de categorías cargado correctamente.");
    const estadoEdicion = document.getElementById("estadoEdicion");
    function mensajeHTML(texto) {
        estadoEdicion.innerHTML = texto;
        estadoEdicion.style.display = "block";
    }
    const tablaBody = document.querySelector(".tabla-paginas tbody");
    const nombresTipo = {
        "tipo1": "Paginas web",
        "tipo2": "Juegos",
        "tipo3": "Aplicación"
    };
    const iconosTipo = {
        "tipo1": '<i class="fa-solid fa-code"></i>',
        "tipo2": '<i class="fa-solid fa-gamepad"></i>',
        "tipo3": '<i class="fa-solid fa-mobile-screen"></i>'
    };
    const iconosCategoria = {
        "icono1": '<i class="fa-solid fa-shop"></i>',
        "icono2": '<i class="fa-solid fa-gamepad"></i>',
        "icono3": '<i class="fa-solid fa-film"></i>'
    };
    function mostrarCategorias() {
        tablaBody.innerHTML = "";
        const categorias = JSON.parse(localStorage.getItem("categorias_tablero")) || [];
        if (categorias.length === 0) {
            mensajeHTML("No hay categorías creadas");
            const fila = document.createElement("tr");
            fila.innerHTML = `<td colspan="6" style="text-align:center;">No hay categorías creadas</td>`;
            tablaBody.appendChild(fila);
            return;
        }
        categorias.forEach((categoria, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${categoria.nombre}</td>
                <td>${nombresTipo[categoria.tipo] || categoria.tipo}</td>
                <td>${iconosCategoria[categoria.icono] || categoria.icono}</td>
                <td>${categoria.precio}</td>
                <td>
                    <button class="btn-eliminar" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <button class="btn-editar" data-index="${index}">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-visualizar" data-index="${index}">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn-anadir2" data-index="${index}">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </td>
            `;
            tablaBody.appendChild(tr);
        });
    }
    tablaBody.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const index = btn.dataset.index;
        let categorias = JSON.parse(localStorage.getItem("categorias_tablero")) || [];
        if (btn.classList.contains("btn-eliminar")) {
            const nombreEliminado = categorias[index].nombre;
            categorias.splice(index, 1);
            localStorage.setItem("categorias_tablero", JSON.stringify(categorias));
            mensajeHTML(`Has eliminado la categoría <b>${nombreEliminado}</b>.`);
            mostrarCategorias();
        }
        if (btn.classList.contains("btn-editar")) {
            const nombreAnterior = categorias[index].nombre;
            mensajeHTML(`Editando categoría <b>${nombreAnterior}</b>`);
            const nuevoNombre = prompt("Editar nombre:", nombreAnterior);
            if (!nuevoNombre || nuevoNombre.trim() === "") return;
            categorias[index].nombre = nuevoNombre.trim();
            localStorage.setItem("categorias_tablero", JSON.stringify(categorias));
            mensajeHTML(
                `La categoría <b>${nombreAnterior}</b> fue cambiada por <b>${nuevoNombre.trim()}</b>.`
            );
            mostrarCategorias();
        }
        if (btn.classList.contains("btn-visualizar")) {
            mensajeHTML(`Vista previa de categoría: <b>${categorias[index].nombre}</b>`);
        }
        if (btn.classList.contains("btn-anadir2")) {
            const categoria = categorias[index];
            EstiloCategoria.actualizarCeldas(
                iconosCategoria[categoria.icono],
                categoria.nombre
            );
            EstiloCategoria.actualizarPie(
                nombresTipo[categoria.tipo],
                categoria.precio
            );
            mensajeHTML(`Datos de <b>${categoria.nombre}</b> enviados a la vista.`);
        }
    });
    mostrarCategorias();
});