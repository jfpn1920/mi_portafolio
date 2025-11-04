//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//------------------------------------//
//--|funcionalidad_agregar_carrusel|--//
//------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script del carrusel cargado correctamente.");
    const botonCrear = document.querySelector(".crear");
    const inputPagina = document.querySelector(".campo input");
    botonCrear.addEventListener("click", () => {
        const nombreCarrusel = inputPagina.value.trim();
        if (nombreCarrusel === "") {
            alert("⚠️ No hay carrusel creado");
            inputPagina.focus();
            return;
        }
        const carruseles = JSON.parse(localStorage.getItem("carruselesCreados")) || [];
        const nuevoCarrusel = { nombre: nombreCarrusel, imagenes: [] };
        carruseles.push(nuevoCarrusel);
        localStorage.setItem("carruselesCreados", JSON.stringify(carruseles));
        alert(`✅ El carrusel "${nombreCarrusel}" ha sido creado`);
        inputPagina.value = "";
    });
});
//----------------------------------//
//--|funcionalidad_agregar_imagen|--//
//----------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script de agregar imagen cargado correctamente.");
    const imagenBox = document.querySelector(".imagen-box");
    const botonAgregar = document.querySelector(".imagen-btn");
    const inputImagen = document.createElement("input");
    inputImagen.type = "file";
    inputImagen.accept = "image/*";
    inputImagen.multiple = true;
    inputImagen.style.display = "none";
    document.body.appendChild(inputImagen);
    let imagenesSeleccionadas = [];
    imagenBox.addEventListener("click", () => {
        inputImagen.click();
    });
    inputImagen.addEventListener("change", (e) => {
        const archivos = Array.from(e.target.files);
        if (archivos.length === 0) return;
        imagenesSeleccionadas = archivos;
        imagenBox.innerHTML = ""; 
        archivos.forEach((archivo) => {
            const lector = new FileReader();
            lector.onload = (evento) => {
                const img = document.createElement("img");
                img.src = evento.target.result;
                img.style.width = "100px";
                img.style.height = "100px";
                img.style.objectFit = "cover";
                img.style.margin = "5px";
                img.style.borderRadius = "5px";
                imagenBox.appendChild(img);
            };
            lector.readAsDataURL(archivo);
        });
    });
    botonAgregar.addEventListener("click", () => {
        if (imagenesSeleccionadas.length === 0) {
            alert("⚠️ No hay imágenes seleccionadas.");
            return;
        }
        localStorage.setItem("imagenesSeleccionadas", imagenesSeleccionadas.length);
        alert(`✅ Se han agregado ${imagenesSeleccionadas.length} imágenes con éxito.`);
        imagenesSeleccionadas = [];
        inputImagen.value = "";
        imagenBox.innerHTML = `<i class="fa-regular fa-image"></i>`;
    });
});
//---------------------------------------//
//--|funcionalidad_tablero_de_imagenes|--//
//---------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script del tablero cargado correctamente.");
    const tablaBody = document.querySelector(".tabla-carruseles tbody");
    const btnAgregarTodo = document.querySelector(".btn-agregar");
    function mostrarCarruseles() {
        const carruseles = JSON.parse(localStorage.getItem("carruselesCreados")) || [];
        tablaBody.innerHTML = "";
        if (carruseles.length === 0) {
            const filaVacia = document.createElement("tr");
            filaVacia.classList.add("fila-vacia");
            filaVacia.innerHTML = `
                <td colspan="3" style="text-align:center; color:#555;">
                    No hay carruseles creados
                </td>
            `;
            tablaBody.appendChild(filaVacia);
            return;
        }
        const cantidadImagenes = localStorage.getItem("imagenesSeleccionadas") || 0;
        carruseles.forEach((carrusel, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${carrusel.nombre}</td>
                <td class="celda-imagenes">${
                    cantidadImagenes > 0
                        ? `${cantidadImagenes} imágenes`
                        : "Sin imágenes"
                }</td>
                <td class="acciones">
                    <button class="btn-icono btn-anadir" data-index="${index}" title="Añadir">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <button class="btn-icono btn-visualizar" data-index="${index}" title="Ver">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn-icono btn-editar" data-index="${index}" title="Editar">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-icono btn-eliminar" data-index="${index}" title="Eliminar">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tablaBody.appendChild(fila);
        });
    }
    window.addEventListener("storage", (e) => {
        if (e.key === "imagenesSeleccionadas") {
            mostrarCarruseles();
        }
    });
    tablaBody.addEventListener("click", (e) => {
        const carruseles = JSON.parse(localStorage.getItem("carruselesCreados")) || [];
        if (e.target.closest(".btn-eliminar")) {
            const index = e.target.closest(".btn-eliminar").dataset.index;
            const nombreEliminado = carruseles[index].nombre;
            carruseles.splice(index, 1);
            localStorage.setItem("carruselesCreados", JSON.stringify(carruseles));
            mostrarCarruseles();
            alert(`🗑️ El carrusel "${nombreEliminado}" fue eliminado.`);
        }
        if (e.target.closest(".btn-editar")) {
            const index = e.target.closest(".btn-editar").dataset.index;
            const nombreActual = carruseles[index].nombre;
            const nuevoNombre = prompt(
                `Editar nombre del carrusel "${nombreActual}":`,
                nombreActual
            );
            if (!nuevoNombre || nuevoNombre.trim() === "") return;
            carruseles[index].nombre = nuevoNombre.trim();
            localStorage.setItem("carruselesCreados", JSON.stringify(carruseles));
            mostrarCarruseles();
            alert(`✏️ El carrusel fue renombrado a "${nuevoNombre}"`);
        }
        if (e.target.closest(".btn-visualizar")) {
            const index = e.target.closest(".btn-visualizar").dataset.index;
            alert(`👁️ Vista previa del carrusel "${carruseles[index].nombre}"`);
        }
        if (e.target.closest(".btn-anadir")) {
            const index = e.target.closest(".btn-anadir").dataset.index;
            alert(`➕ Carrusel "${carruseles[index].nombre}" añadido al menú (simulado)`);
        }
    });
    btnAgregarTodo.addEventListener("click", () => {
        const carruseles = JSON.parse(localStorage.getItem("carruselesCreados")) || [];
        if (carruseles.length === 0) {
            alert("⚠️ No hay carruseles creados para agregar.");
            return;
        }
        alert(`✅ Se han agregado ${carruseles.length} carruseles al menú.`);
    });
    mostrarCarruseles();
});