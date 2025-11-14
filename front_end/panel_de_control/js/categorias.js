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
    console.log("✅ Script de agregar imagen (categorías) cargado correctamente.");
    const imagenBox_categorias = document.querySelector(".imagen-box");
    const botonAgregar_categorias = document.querySelector(".imagen-btn");
    const inputImagen_categorias = document.createElement("input");
    inputImagen_categorias.type = "file";
    inputImagen_categorias.accept = "image/*";
    inputImagen_categorias.style.display = "none";
    document.body.appendChild(inputImagen_categorias);
    let imagenSeleccionada_categorias = null;
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
        };
        lector.readAsDataURL(archivo);
    });
    botonAgregar_categorias.addEventListener("click", () => {
        if (!imagenSeleccionada_categorias) {
            alert("No has seleccionado ninguna imagen");
            console.warn("⚠️ No hay ninguna imagen seleccionada.");
            return;
        }
        localStorage.setItem("imagenSeleccionada_categorias", imagenSeleccionada_categorias);
        alert("La imagen ha sido agregada exitosamente");
        imagenBox_categorias.innerHTML = `<i class="fa-regular fa-image"></i>`;
        inputImagen_categorias.value = "";
        imagenSeleccionada_categorias = null;
        console.log("✅ Imagen agregada y guardada con éxito.");
    });
});
//-------------------------------------------//
//--|funcionalidad_formulario_de_categoria|--//
//-------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script de formulario de categoría cargado correctamente.");
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
        console.log("📝 Intentando guardar la categoría...");
        const formularioIncompleto =
            campoCategoria.value.trim() === "" ||
            campoPrecio.value.trim() === "" ||
            selectTipo.value.includes("Seleccionar") ||
            selectIcono.value.includes("Seleccionar");
        if (formularioIncompleto) {
            console.warn("❌ No has llenado el formulario");
            alert("No has llenado el formulario");
            return;
        }
        console.log("✅ Se ha guardado con éxito");
        alert("Se ha guardado con éxito");
        let categorias = JSON.parse(localStorage.getItem("categorias_tablero")) || [];
        const nuevaCategoria = {
            nombre: campoCategoria.value,
            imagen: "sin imagen",
            tipo: selectTipo.value,
            icono: selectIcono.value,
            precio: campoPrecio.value
        };
        categorias.push(nuevaCategoria);
        localStorage.setItem("categorias_tablero", JSON.stringify(categorias));
        console.log("📁 Categoría guardada en localStorage:", nuevaCategoria);
    });
});
//-------------------------------------//
//--|funcionalidad_tablero_categoria|--//
//-------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 Script de categorías cargado correctamente.");
    const tablaBody = document.querySelector(".tabla-paginas tbody");
    const btnAgregarTodo = document.querySelector(".btn-agregar");
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
            const fila = document.createElement("tr");
            fila.innerHTML = `<td colspan="6" style="text-align:center;">No hay categorías creadas</td>`;
            tablaBody.appendChild(fila);
            return;
        }
        categorias.forEach((categoria, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${categoria.nombre}</td>
                <td>${categoria.imagen}</td>
                <!-- TIPO → Mostrar el texto real -->
                <td>${nombresTipo[categoria.tipo] || categoria.tipo}</td>
                <!-- ICONO → Mostrar el ícono -->
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
                </td>
            `;
            tablaBody.appendChild(tr);
        });
    }
    btnAgregarTodo.addEventListener("click", () => {
        let categorias = JSON.parse(localStorage.getItem("categorias_tablero")) || [];
        categorias.push({
            nombre: "no hay categoria",
            imagen: "no hay imagen",
            tipo: "tipo1",
            icono: "icono1",
            precio: "no hay precio"
        });
        localStorage.setItem("categorias_tablero", JSON.stringify(categorias));
        mostrarCategorias();
    });
    tablaBody.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const index = btn.dataset.index;
        let categorias = JSON.parse(localStorage.getItem("categorias_tablero")) || [];
        if (btn.classList.contains("btn-eliminar")) {
            categorias.splice(index, 1);
            localStorage.setItem("categorias_tablero", JSON.stringify(categorias));
            mostrarCategorias();
        }
        if (btn.classList.contains("btn-editar")) {
            const nuevoNombre = prompt("Editar nombre:", categorias[index].nombre);
            if (!nuevoNombre || nuevoNombre.trim() === "") return;
            categorias[index].nombre = nuevoNombre.trim();
            localStorage.setItem("categorias_tablero", JSON.stringify(categorias));
            mostrarCategorias();
        }
        if (btn.classList.contains("btn-visualizar")) {
            alert(`Vista previa de categoría: ${categorias[index].nombre}`);
        }
    });
    mostrarCategorias();
});