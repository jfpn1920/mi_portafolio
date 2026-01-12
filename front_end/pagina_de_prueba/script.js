//------------------------------------------//
//--|funcionalidad_formulario_de_carrusel|--//
//------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const btnCrear_carrusel = document.querySelector(".btn-crear");
    const inputNombre_carrusel = document.querySelector(".input-carrusel");
    const selectTiempo_carrusel = document.querySelector("select");
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
            tiempoCarrusel === "Ningún tiempo" ||
            imagenesSeleccionadas_carrusel.length === 0 ||
            !chkAutomatico.checked ||
            !chkIndicadores.checked ||
            !chkControladores.checked
        ) {
            alert("No hay ningún carrusel creado");
            return;
        }
        let carruseles =
            JSON.parse(localStorage.getItem("carruselesCreados_tablero_del_carrusel")) || [];
        if (carruseles.some(c => c.nombre === nombreCarrusel)) {
            alert(`Ya existe un carrusel con el nombre "${nombreCarrusel}"`);
            return;
        }
        const nuevoCarrusel = {
            nombre: nombreCarrusel,
            imagenes: imagenesSeleccionadas_carrusel,
            tiempo: tiempoCarrusel,
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
        alert("Se ha creado el carrusel exitosamente");
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
                    <!-- 🔹 BOTÓN AÑADIR -->
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
            alert("Se ha añadido con éxito");
        }
        if (e.target.closest(".btn-eliminar")) {
            const index = e.target.closest(".btn-eliminar").dataset.index;
            let carruseles_tablero_del_carrusel =
                JSON.parse(localStorage.getItem("carruselesCreados_tablero_del_carrusel")) || [];
            const nombreCarrusel = carruseles_tablero_del_carrusel[index].nombre;
            const confirmar = confirm(
                `¿Seguro que deseas eliminar el carrusel "${nombreCarrusel}"?`
            );
            if (!confirmar) return;
            carruseles_tablero_del_carrusel.splice(index, 1);
            localStorage.setItem(
                "carruselesCreados_tablero_del_carrusel",
                JSON.stringify(carruseles_tablero_del_carrusel)
            );
            alert(`Se ha eliminado el carrusel "${nombreCarrusel}"`);
            mostrarCarruseles_tablero_del_carrusel();
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
            if (!nuevoNombre || nuevoNombre.trim() === "") {
                alert("El nombre no puede estar vacío");
                return;
            }
            if (
                carruseles_tablero_del_carrusel.some(
                    (c, i) => c.nombre === nuevoNombre && i !== Number(index)
                )
            ) {
                alert(`Ya existe un carrusel con el nombre "${nuevoNombre}"`);
                return;
            }
            carruseles_tablero_del_carrusel[index].nombre = nuevoNombre.trim();
            localStorage.setItem(
                "carruselesCreados_tablero_del_carrusel",
                JSON.stringify(carruseles_tablero_del_carrusel)
            );
            mostrarCarruseles_tablero_del_carrusel();
            alert("Se ha editado correctamente");
        }
        if (e.target.closest(".btn-visualizar")) {
            const index = e.target.closest(".btn-visualizar").dataset.index;
            const carruseles_tablero_del_carrusel =
                JSON.parse(localStorage.getItem("carruselesCreados_tablero_del_carrusel")) || [];
            const carrusel = carruseles_tablero_del_carrusel[index];
            alert(`Vista previa del carrusel "${carrusel.nombre}"`);
        }
    });
    mostrarCarruseles_tablero_del_carrusel();
});