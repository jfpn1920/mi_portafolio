//------------------------------------//
//--|funcionalidad_menu_hamburguesa|--//
//------------------------------------//
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
menuBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
//-------------------------------------//
//--|funcionalidad_sesion_de_aliados|--//
//-------------------------------------//
const btnVerAliados = document.getElementById("btnVerAliados");
if (btnVerAliados) {
    btnVerAliados.addEventListener("click", () => {
        window.location.href = "sesion_de_aliados.html";
    });
}
//----------------------------------------//
//--|funcionalidad_estado_del_sitio_web|--//
//----------------------------------------//
document.getElementById("btnVerEstado").addEventListener("click", () => {
    window.location.href = "estado.html";
});
//-------------------------------------------//
//--|funcionalidad_paginas_web_calificados|--//
//-------------------------------------------//
document.getElementById("btnClasificados").addEventListener("click", () => {
    window.location.href = "calificados.html";
});
//-----------------------------------------------//
//--|funcionalidad_comunicacion_con_el_cliente|--//
//-----------------------------------------------//
document.addEventListener("DOMContentLoaded", () => {
    const btnIrChat = document.getElementById("btnIrChat");
    if (btnIrChat) {
        btnIrChat.addEventListener("click", () => {
            window.location.href = "comunicaciones.html";
        });
    }
});
//----------------------------------------//
//--|funcionalidad_contenedor_de_basura|--//
//----------------------------------------//
const btnVerContenedor = document.getElementById("btnVerContenedor");
if (btnVerContenedor) {
    btnVerContenedor.addEventListener("click", () => {
        window.location.href = "contenedor.html";
    });
}
//--------------------------------//
//--|funcionalidad_instaladores|--//
//--------------------------------//
document.getElementById("btnVerInstalador").addEventListener("click", () => {
    window.location.href = "instaladores.html";
});