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
const container = document.querySelector(".carousel-container3");
const carousel = document.querySelector(".carousel3");
const cards = Array.from(carousel.querySelectorAll(".card3"));
const dots = document.querySelectorAll(".dot3");
const prevBtn = document.querySelector(".prev3");
const nextBtn = document.querySelector(".next3");

let index = 0;

// Obtener el ancho real de cada tarjeta + su margin-left
function getCardWidth() {
    const card = cards[0];
    if (!card) return 0;
    const style = getComputedStyle(card);
    const marginLeft = parseFloat(style.marginLeft) || 0;
    return card.offsetWidth + marginLeft; // ✅ 94px + 3px
}

// Actualizar posición del carrusel
function updateCarousel() {
    const step = getCardWidth();
    carousel.style.transform = `translateX(${-index * step}px)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });

    // Bloquear botones en los extremos
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index >= cards.length - visibleCards();
}

// Calcular cuántas tarjetas caben visibles según el ancho
function visibleCards() {
    const containerWidth = container.offsetWidth;
    const step = getCardWidth();
    return Math.floor(containerWidth / step);
}

// Botón siguiente
nextBtn.addEventListener("click", () => {
    if (index < cards.length - visibleCards()) {
        index++;
        updateCarousel();
    }
});

// Botón previo
prevBtn.addEventListener("click", () => {
    if (index > 0) {
        index--;
        updateCarousel();
    }
});

// Dots
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
    });
});

// Responsividad
window.addEventListener("resize", updateCarousel);

// Inicializar
updateCarousel();