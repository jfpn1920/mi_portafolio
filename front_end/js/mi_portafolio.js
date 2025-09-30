//--------------------------------------//
//--|funcionalidad_menu_de_navegacion|--//
//--------------------------------------//
const hamburguesa = document.getElementById("hamburguesa");
const navLinks = document.getElementById("nav-links1");
const icons = document.getElementById("icons1");
hamburguesa.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    icons.classList.toggle("active");
});
//---------------------------------------------//
//--|funcionalidad_demostracion_de_proyectos|--//
//---------------------------------------------//
const carousel = document.querySelector(".carousel3");
const dots = document.querySelectorAll(".dot3");
const prevBtn = document.querySelector(".prev3");
const nextBtn = document.querySelector(".next3");
let index = 0;
function updateCarousel() {
    carousel.style.transform = `translateX(${-index * 180}px)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}
nextBtn.addEventListener("click", () => {
    if (index < dots.length - 1) {
        index++;
        updateCarousel();
    }
});
prevBtn.addEventListener("click", () => {
    if (index > 0) {
        index--;
        updateCarousel();
    }
});
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
    });
});
