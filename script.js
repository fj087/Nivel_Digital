// NIVEL DIGITAL | Interacciones de la página
// Cambia aquí el comportamiento del menú, las animaciones y el año del pie de página.

// 1. MENÚ: obtiene el botón hamburguesa y la lista de navegación del HTML.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

// 2. MENÚ: al tocar el botón, alterna entre mostrar y ocultar la navegación.
menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  const willOpen = !isOpen;

  // Actualiza el estado accesible del botón.
  menuButton.setAttribute('aria-expanded', String(willOpen));

  // La clase "open" permite que styles.css muestre u oculte el menú móvil.
  navigation?.classList.toggle('open', willOpen);
});

// 3. MENÚ: cierra la navegación después de elegir una de sus secciones.
navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  });
});

// 4. ANIMACIONES: muestra elementos con la clase "reveal" cuando entran en pantalla.
// Si el navegador no admite IntersectionObserver, los elementos se muestran normalmente.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Deja de observar el elemento después de mostrarlo.
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => {
    observer.observe(element);
  });
} else {
  document.querySelectorAll('.reveal').forEach((element) => {
    element.classList.add('visible');
  });
}

// 5. PIE DE PÁGINA: escribe el año actual dentro del elemento con id="year".
const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}