const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active'); // Alternar la clase 'active' en el menú
});

// Cerrar el menú al hacer clic fuera de él
document.addEventListener('click', (event) => {
    const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
    if (!isClickInside) {
        navMenu.classList.remove('active'); // Cierra el menú si el clic fue fuera
    }
});