//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//-----------------------------------//
//--|funcionalidad_agregar_paginas|--//
//-----------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const botonCrear = document.querySelector(".crear");
    const inputPagina = document.querySelector(".campo input");
    const LIMITE_PAGINAS = 18;
    console.log("Script de agregar página cargado correctamente ✅");
    botonCrear.addEventListener("click", () => {
        const nombrePagina = inputPagina.value.trim();
        if (nombrePagina === "") {
            alert("Debes escribir el nombre de la página para poder crearla.");
            return;
        }
        let paginas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
        if (paginas.length >= LIMITE_PAGINAS) {
            alert("No puedes agregar más páginas. Has alcanzado el límite máximo permitido.");
            return;
        }
        paginas.push({
            nombre: nombrePagina,
            fecha: new Date().toLocaleString()
        });
        localStorage.setItem("paginasCreadas", JSON.stringify(paginas));
        alert(`La página "${nombrePagina}" ha sido creada exitosamente.`);
        inputPagina.value = "";
    });
});
//----------------------------------------------//
//--|funcionalidad_tablero_de_paginas_creados|--//
//----------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const btnAgregarTodo = document.querySelector(".btn-agregar");
    const tablaBody = document.querySelector(".tabla-paginas tbody");
    console.log("Script del tablero cargado correctamente ✅");
    const LIMITE = 18;
    function mostrarPaginas() {
        tablaBody.innerHTML = "";
        const paginas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
        if (paginas.length === 0) {
            const filaVacia = document.createElement("tr");
            filaVacia.innerHTML = `<td colspan="2" style="text-align:center;">No hay páginas creadas</td>`;
            tablaBody.appendChild(filaVacia);
            return;
        }
        paginas.forEach((pagina, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${pagina.nombre}</td>
                <td>
                    <button class="btn-eliminar" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tablaBody.appendChild(fila);
        });
    }
    tablaBody.addEventListener("click", (e) => {
        if (e.target.closest(".btn-eliminar")) {
            const index = e.target.closest(".btn-eliminar").dataset.index;
            let paginas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
            const nombreEliminado = paginas[index].nombre;
            paginas.splice(index, 1);
            localStorage.setItem("paginasCreadas", JSON.stringify(paginas));
            alert(`La página "${nombreEliminado}" ha sido eliminada.`);
            mostrarPaginas();
        }
    });
    btnAgregarTodo.addEventListener("click", () => {
        console.log("Botón 'Agregar todo' presionado 🧩");
        let paginas = JSON.parse(localStorage.getItem("paginasCreadas")) || [];
        if (paginas.length >= LIMITE) {
            alert("Has llenado el límite, si deseas seguir agregando, elimina un bloque y agrega uno nuevo.");
            return;
        }
        const nuevoBloque = {
            nombre: `Página ${paginas.length + 1}`
        };
        paginas.push(nuevoBloque);
        localStorage.setItem("paginasCreadas", JSON.stringify(paginas));
        mostrarPaginas();
    });
    mostrarPaginas();
});