//-----------------------------------------------//
//--|funcionalidad_menu_de_navegacion_dinamico|--//
//-----------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const dataMenu = JSON.parse(
        localStorage.getItem("menu_navegacion_dinamico")
    );
    if (!dataMenu) {
        console.warn("No hay datos de menú");
        return;
    }
    const menuLogo = document.getElementById("menuLogo");
    const menuLogoTexto = document.getElementById("menuLogoTexto");
    const menuLogoImg = document.getElementById("menuLogoImg");
    menuLogoTexto.textContent = dataMenu.nombre || "Mi Web";
    if (dataMenu.logo) {
        menuLogoImg.style.display = "none";
        const iconoLogo = document.createElement("i");
        iconoLogo.className = dataMenu.logo;
        iconoLogo.style.fontSize = "20px";
        iconoLogo.style.marginRight = "8px";
        menuLogo.prepend(iconoLogo);
    }
    const menuOpciones = document.getElementById("menuOpciones");
    menuOpciones.innerHTML = "";
    dataMenu.paginas.forEach(pagina => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#">${pagina}</a>`;
        menuOpciones.appendChild(li);
    });
    if (dataMenu.submenus && dataMenu.submenus.length > 0) {
        const submenuData = dataMenu.submenus[0];
        const liSubmenu = document.createElement("li");
        liSubmenu.className = "submenu";
        liSubmenu.innerHTML = `
            <button class="submenu-btn">
                ${submenuData.nombre} <i class="fa-solid fa-chevron-down"></i>
            </button>
            <ul class="submenu-lista"></ul>
        `;
        const listaSubmenu = liSubmenu.querySelector(".submenu-lista");
        submenuData.paginas.forEach(pagina => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="#">${pagina}</a>`;
            listaSubmenu.appendChild(li);
        });
        menuOpciones.appendChild(liSubmenu);
        const btnSubmenu = liSubmenu.querySelector(".submenu-btn");
        btnSubmenu.addEventListener("click", (e) => {
            e.stopPropagation();
            listaSubmenu.style.display =
                listaSubmenu.style.display === "block" ? "none" : "block";
        });
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".submenu")) {
                listaSubmenu.style.display = "none";
            }
        });
    }
    const menuIconos = document.getElementById("menuIconos");
    menuIconos.innerHTML = "";
    dataMenu.iconos.forEach(ic => {
        const icono = document.createElement("i");
        icono.className = ic;
        icono.style.marginLeft = "10px";
        menuIconos.appendChild(icono);
    });
});