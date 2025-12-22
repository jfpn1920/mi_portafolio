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
            alert("La imagen se ha agregado exitosamente");
        } else {
            alert("Debes agregar una imagen");
        }
    });
});