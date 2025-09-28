//---------------------------------------------//
//--|funcionalidad_demostracion_de_proyectos|--//
//---------------------------------------------//
const carousel = document.querySelector(".carousel");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
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
