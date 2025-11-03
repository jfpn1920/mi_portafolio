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
            filaVacia.innerHTML = `<td colspan="3" style="text-align:center; color:#555;">No hay carruseles creados</td>`;
            tablaBody.appendChild(filaVacia);
            return;
        }
        carruseles.forEach((carrusel, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${carrusel.nombre}</td>
                <td class="celda-imagenes">Sin imágenes</td>
                <td>
                    <button class="btn-anadir" data-index="${index}">Añadir</button>
                    <button class="btn-visualizar" data-index="${index}">Ver</button>
                    <button class="btn-editar" data-index="${index}">Editar</button>
                    <button class="btn-eliminar" data-index="${index}">Eliminar</button>
                </td>
            `;
            tablaBody.appendChild(fila);
        });
    }
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
            const nuevoNombre = prompt(`Editar nombre del carrusel "${nombreActual}":`, nombreActual);
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