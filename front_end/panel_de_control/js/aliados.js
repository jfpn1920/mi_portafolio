//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//--------------------------------------------------//
//--|funcionalidad_edicion_predeterminada_aliados|--//
//--------------------------------------------------//
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
    console.log("✅ Script agregar imagen aliado cargado correctamente.");
    const botonAgregar = document.querySelector(".imagen-btn");
    const contenedorImagenes = document.querySelector(".imagen-box");
    const iconoImagen = contenedorImagenes?.querySelector("i");
    if (!botonAgregar || !contenedorImagenes || !iconoImagen) {
        console.warn("⚠️ Elementos de agregar imagen no encontrados.");
        return;
    }
    const STORAGE_KEY = "imagenesAliado";
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.multiple = true;
    inputFile.style.display = "none";
    document.body.appendChild(inputFile);
    const imagenesGuardadas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    imagenesGuardadas.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Imagen aliado";
        contenedorImagenes.appendChild(img);
    });
    iconoImagen.addEventListener("click", () => {
        inputFile.click();
    });
    inputFile.addEventListener("change", () => {
        const archivos = Array.from(inputFile.files);
        archivos.forEach((archivo) => {
            const lector = new FileReader();
            lector.onload = (evento) => {
                const base64 = evento.target.result;
                const img = document.createElement("img");
                img.src = base64;
                img.alt = "Imagen aliado";
                contenedorImagenes.appendChild(img);
                imagenesGuardadas.push(base64);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(imagenesGuardadas));
            };
            lector.readAsDataURL(archivo);
        });
        inputFile.value = "";
    });
    botonAgregar.addEventListener("click", () => {
        const imagenesActuales = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        if (imagenesActuales.length > 0) {
            mostrarMensaje(
                "La imagen se ha agregado exitosamente",
                "exito"
            );
        } else {
            mostrarMensaje(
                "Debes agregar una imagen",
                "warning"
            );
        }
    });
});
//-----------------------------------------//
//--|funcionalidad_formulario_de_aliados|--//
//-----------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Script formulario aliados cargado.");
    const btnCrear = document.querySelector(".btn-crear1");
    const inputNombre = document.querySelector(".input-icono1 input");
    const inputsUbicacion = document.querySelectorAll(".campos1 input");
    const selectIcono = document.querySelector(".campos1 select");
    const textareaDescripcion = document.querySelector(".describirtexto");
    const STORAGE_KEY = "aliados";
    if (!btnCrear) {
        console.warn("⚠️ Botón crear aliado no encontrado.");
        return;
    }
    btnCrear.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();
        const ciudad = inputsUbicacion[0].value.trim();
        const departamento = inputsUbicacion[1].value.trim();
        const urbanizacion = inputsUbicacion[2].value.trim();
        const icono = selectIcono.value;
        const descripcion = textareaDescripcion.value.trim();
        if (!nombre || !ciudad || !descripcion) {
            mostrarMensaje(
                "Debes completar los campos obligatorios",
                "warning"
            );
            return;
        }
        const nuevoAliado = {
            nombre,
            ciudad,
            departamento,
            urbanizacion,
            icono,
            descripcion,
            fecha: new Date().toLocaleString()
        };
        const aliadosGuardados =
            JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        aliadosGuardados.push(nuevoAliado);
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(aliadosGuardados)
        );
        mostrarMensaje(
            "Aliado creado exitosamente",
            "exito"
        );
        inputNombre.value = "";
        inputsUbicacion.forEach(input => input.value = "");
        selectIcono.value = "";
        textareaDescripcion.value = "";
        document.dispatchEvent(new Event("aliadoCreado"));
    });
});
//--------------------------------------//
//--|funcionalidad_tablero_de_aliados|--//
//--------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    console.log("📌 Script tablero_de_aliado cargado correctamente.");
    const tbody = document.querySelector(".tabla-paginas tbody");
    const STORAGE_KEY = "aliados";
    if (!tbody) return;
    window.mostrarTableroAliados = function () {
        tbody.innerHTML = "";
        const aliados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        if (aliados.length === 0) {
            const filaVacia = document.createElement("tr");
            filaVacia.classList.add("fila-vacia");
            filaVacia.innerHTML = `<td>No hay aliados creados</td>`;
            tbody.appendChild(filaVacia);
            return;
        }
        aliados.forEach((aliado, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${aliado.nombre || "—"}</td>
                <td>${aliado.ciudad || "—"}</td>
                <td>${aliado.departamento || "—"}</td>
                <td>${aliado.urbanizacion || "—"}</td>
                <td style="text-align:center;">
                    ${
                        aliado.icono
                            ? `<i class="fa-solid fa-${aliado.icono}"></i>`
                            : "—"
                    }
                </td>
                <td class="celda-descripcion">
                    ${aliado.descripcion || "—"}
                </td>
                <td style="text-align:center;">
                    <button class="btn-editar" data-index="${index}">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-ver" data-index="${index}">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn-agregar" data-index="${index}">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    <button class="btn-eliminar" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(fila);
        });
    };
    mostrarTableroAliados();
    document.addEventListener("aliadoCreado", () => {
        mostrarTableroAliados();
    });
    tbody.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const index = btn.dataset.index;
        let aliados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        if (!aliados[index]) return;
        if (btn.classList.contains("btn-editar")) {
            const nuevoNombre = prompt(
                "Editar nombre del aliado:",
                aliados[index].nombre
            );
            if (!nuevoNombre || !nuevoNombre.trim()) return;
            aliados[index].nombre = nuevoNombre.trim();
            mostrarMensaje("Aliado editado correctamente", "exito");
        }
        if (btn.classList.contains("btn-ver")) {
            const nombreAliado = aliados[index].nombre || "Aliado sin nombre";
            mostrarMensaje(`Vista previa del aliado "${nombreAliado}"`, "info");
        }
        if (btn.classList.contains("btn-agregar")) {
            mostrarMensaje("Aliado añadido exitosamente", "exito");
        }
        if (btn.classList.contains("btn-eliminar")) {
            const nombreAliado = aliados[index].nombre || "Aliado sin nombre";
            aliados.splice(index, 1);
            mostrarMensaje(`El aliado "${nombreAliado}" ha sido eliminado`, "warning");
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(aliados));
        mostrarTableroAliados();
    });
});