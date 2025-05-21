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

// Agregar evento a los enlaces del menú para manejar la clase 'active'
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        // Remover la clase 'active' de todos los enlaces primero
        navLinks.forEach(l => l.classList.remove('active'));

        // Añadir la clase 'active' al enlace que fue clickeado
        link.classList.add('active');

        // Ocultar el menú (esto ya estaba aquí)
        if (navMenu.classList.contains('active')) { // Solo ocultar si está visible (en móvil)
            navMenu.classList.remove('active');
        }

        const targetId = link.getAttribute('href');
        scrollToSection(targetId); // Usar la nueva función para desplazarse
    });
});

// Función para desplazarse suavemente a una sección
function scrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;

        window.scrollTo({
            top: targetElement.offsetTop - navbarHeight,
            behavior: 'smooth' // Desplazamiento suave
        });
         // Asegurar que el foco vaya a la sección para accesibilidad
         targetElement.focus();
    }
}

// Script para el botón de ayuda (movido desde index.html)
const btnAyuda = document.getElementById('btn-ayuda');
const ayudaNavegacion = document.getElementById('ayuda-navegacion');

// Asegúrate de que los elementos existen antes de añadir listeners
if (btnAyuda && ayudaNavegacion) {
    // Inicializa el estado visual si es necesario (ya se hace con la clase 'hidden' en CSS)
    // ayudaNavegacion.classList.add('hidden'); // Asegurar que está oculto inicialmente si no lo está CSS

    btnAyuda.addEventListener('click', () => {
        // Toggle la clase 'hidden' para mostrar/ocultar
        ayudaNavegacion.classList.toggle('hidden');

        // Cambia el texto del botón basado en si el div está visible (no tiene la clase 'hidden')
        const isHidden = ayudaNavegacion.classList.contains('hidden');
        btnAyuda.textContent = isHidden ? '¿Cómo navegar el sitio?' : 'Ocultar ayuda';

        // Asegurarse de que el foco vaya al contenedor de ayuda cuando se muestra
        if (!isHidden) {
             // ayudaNavegacion.focus(); // Si el div puede recibir foco (tabindex="-1" en HTML)
             // Nota: Para que .focus() funcione en divs, deben ser focusable.
             // Considera añadir tabindex="-1" al div #ayuda-navegacion en tu HTML si quieres que reciba foco programáticamente.
        }
    });
    // Opcional: Añadir tabindex="-1" al div ayuda-navegacion en index.html
    // para que pueda recibir foco programáticamente
} else {
    console.warn("Botón de ayuda o contenedor de navegación no encontrados.");
}

// Script para el botón de alto contraste
const btnContraste = document.getElementById('btn-contraste');
const body = document.body; // Obtener una referencia al body

// Función para activar o desactivar el modo de alto contraste
function toggleHighContrast() {
    body.classList.toggle('high-contrast');

    // Guardar la preferencia en localStorage
    if (body.classList.contains('high-contrast')) {
        localStorage.setItem('highContrastMode', 'enabled');
        // Cambiar a innerHTML para renderizar el icono
        btnContraste.innerHTML = '&#9728;'; // Icono de sol para indicar que está activo
        btnContraste.setAttribute('aria-label', 'Desactivar alto contraste');
    } else {
        localStorage.setItem('highContrastMode', 'disabled');
        // Cambiar a innerHTML para renderizar el icono
        btnContraste.innerHTML = '&#127769;'; // Icono de luna para indicar que está inactivo
        btnContraste.setAttribute('aria-label', 'Activar alto contraste');
    }
}

// Verificar si el modo de alto contraste estaba activado en la última visita
document.addEventListener('DOMContentLoaded', () => {
    const highContrastPreference = localStorage.getItem('highContrastMode');

    if (highContrastPreference === 'enabled') {
        body.classList.add('high-contrast');
        // Asegurarse de que el texto del botón refleje el estado
        if (btnContraste) {
             // Cambiar a innerHTML para renderizar el icono
             btnContraste.innerHTML = '&#9728;'; // Icono de sol
             btnContraste.setAttribute('aria-label', 'Desactivar alto contraste');
        }
    } else {
         // Asegurarse de que el texto del botón refleje el estado si no estaba activo
         if (btnContraste) {
              // Cambiar a innerHTML para renderizar el icono
              btnContraste.innerHTML = '&#127769;'; // Icono de luna
              btnContraste.setAttribute('aria-label', 'Activar alto contraste');
         }
    }

    // Añadir listener al botón DESPUÉS de verificar la preferencia para evitar un toggle inmediato
    if (btnContraste) {
        btnContraste.addEventListener('click', toggleHighContrast);
    } else {
        console.warn("Botón de contraste no encontrado.");
    }

    // --- Script para el botón de Volver al Inicio ---
    const backToTopButton = document.getElementById('back-to-top');

    // Mostrar u ocultar el botón basado en el desplazamiento de la página
    window.addEventListener('scroll', () => {
        // Verifica si la posición de desplazamiento vertical es mayor que, por ejemplo, 200px
        if (window.scrollY > 200) { // Puedes ajustar este valor según necesites
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Desplazarse suavemente al inicio al hacer clic en el botón
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0, // Desplazarse a la parte superior de la página
                behavior: 'smooth' // Desplazamiento suave
            });
        });
    } else {
         console.warn("Botón de volver al inicio no encontrado.");
    }

    // --- Script para la funcionalidad de búsqueda ---
    const searchContainer = document.querySelector('.search-container'); // Referencia al contenedor
    const searchInput = document.getElementById('search-input');
    const searchIcon = document.getElementById('search-icon');

    if (searchContainer && searchInput && searchIcon) {

        // Función para togglear la visibilidad del input en móvil
        function toggleSearchInput() {
             // Solo aplicar en pantallas pequeñas (menos de 769px)
            if (window.innerWidth <= 768) {
                 searchContainer.classList.toggle('expanded');
                 // Si se expande, enfocar el input para que el usuario pueda empezar a escribir inmediatamente
                 if (searchContainer.classList.contains('expanded')) {
                      searchInput.focus();
                 }
            } else {
                 // En escritorio, asegurar que no tenga la clase expanded y el input sea visible (aunque CSS ya lo controla)
                 searchContainer.classList.remove('expanded');
            }
        }


        searchIcon.addEventListener('click', (event) => {
            // Si el input está oculto (en móvil), lo mostramos y prevenimos la búsqueda inmediata
            if (window.innerWidth <= 768 && !searchContainer.classList.contains('expanded')) {
                 toggleSearchInput(); // Expande el input
                 event.stopPropagation(); // Evita que el clic se propague y cierre algo más (como el menú si estuviera abierto)
            } else {
                // Si el input está visible (escritorio o ya expandido en móvil), realizamos la búsqueda
                performSearch();
            }
        });

        // Permitir búsqueda al presionar Enter en el input (funciona tanto si está expandido como no)
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Evitar que se envíe un formulario si existiera
                performSearch();
                 // En móvil, después de buscar con Enter, podrías querer cerrar el input de nuevo
                 if (window.innerWidth <= 768 && searchContainer.classList.contains('expanded')) {
                      // toggleSearchInput(); // Descomentar si quieres que se repliegue
                 }
            }
        });

        // Opcional: Cerrar el campo de búsqueda si se hace clic fuera de él en móvil
        document.addEventListener('click', (event) => {
             // Solo en pantallas pequeñas y si el input está expandido
            if (window.innerWidth <= 768 && searchContainer.classList.contains('expanded')) {
                const isClickInsideSearch = searchContainer.contains(event.target);
                // Si el clic fue fuera del contenedor de búsqueda
                if (!isClickInsideSearch) {
                    searchContainer.classList.remove('expanded'); // Repliega el input
                }
            }
             // Nota: Esto también podría cerrar el menú hamburguesa si ambos están abiertos y se hace clic fuera.
             // La lógica para cerrar el menú hamburguesa al hacer clic fuera ya existe y está bien.
        });


        function performSearch() {
            const query = searchInput.value.trim().toLowerCase(); // Obtener valor, quitar espacios y convertir a minúsculas

            if (query === '') {
                 // Si la búsqueda está vacía, en móvil, puedes replegar el input si está expandido
                 if (window.innerWidth <= 768 && searchContainer.classList.contains('expanded')) {
                      searchContainer.classList.remove('expanded');
                 }
                // Opcional: Podrías mostrar un mensaje indicando que ingrese texto
                return;
            }

            // Mapa extendido de palabras clave a IDs de sección
            // Incluye formas singulares y plurales relevantes
            const keywordMap = {
                'inicio': '#introduccion',
                'bienvenido': '#introduccion',
                'navegar': '#introduccion',
                'proposito': '#introduccion',
                'sitio': '#introduccion',

                'matricula': '#matricula',
                'inscripcion': '#matricula',
                'requisitos': '#matricula',
                'requisito': '#matricula', // Añadido singular
                'bachiller': '#matricula',
                'examen de estado': '#matricula',
                'formulario': '#matricula',
                'legalizar': '#matricula',
                'acta': '#matricula',
                'diploma': '#matricula',
                'grado': '#matricula',
                'icfes': '#matricula',
                'documento de identidad': '#matricula',
                'documento': '#matricula', // Añadido singular
                'identidad': '#matricula', // Añadido
                'caracterizacion': '#matricula',
                'pecuniarios': '#matricula',
                'pecuniario': '#matricula', // Añadido singular
                'estudiantil': '#matricula',
                'sena': '#matricula',
                'tecnologia': '#matricula',
                'tecnico': '#matricula',
                'paso a paso': '#matricula',
                'programas': '#matricula',
                'programa': '#matricula', // Añadido singular
                'fechas': '#matricula',
                'fecha': '#matricula', // Añadido singular
                'costos': '#matricula',
                'costo': '#matricula', // Añadido singular
                'admision': '#matricula',
                'financiacion': '#matricula',
                'descuentos': '#matricula',
                'descuento': '#matricula', // Añadido singular
                'pagar': '#matricula',
                'formalizar': '#matricula',
                'cursos academicos': '#matricula',
                'curso academico': '#matricula', // Añadido singular
                'cursos': '#matricula', // Añadido

                'servicios academicos': '#servicios',
                'servicio academico': '#servicios', // Añadido singular
                'servicios': '#servicios', // Añadido
                'academico': '#servicios', // Añadido
                'academicos': '#servicios', // Añadido
                'biblioteca': '#servicios',
                'e-biblioteca': '#servicios',
                'recursos digitales': '#servicios',
                'recurso digital': '#servicios', // Añadido singular
                'recursos': '#servicios', // Añadido
                'digitales': '#servicios', // Añadido
                'libros electronicos': '#servicios',
                'libro electronico': '#servicios', // Añadido singular
                'libros': '#servicios', // Añadido
                'electronicos': '#servicios', // Añadido
                'bases de datos': '#servicios',
                'base de datos': '#servicios', // Añadido singular
                'consejeria': '#servicios',
                'orientacion academica': '#servicios',
                'orientacion': '#servicios', // Añadido
                'estrategias de estudio': '#servicios',
                'estrategia de estudio': '#servicios', // Añadido singular
                'estrategias': '#servicios', // Añadido
                'estudio': '#servicios', // Añadido
                'apoyo emocional': '#servicios',
                'apoyo': '#servicios', // Añadido
                'emocional': '#servicios', // Añadido

                'plataformas virtuales': '#plataformas',
                'plataforma virtual': '#plataformas', // Añadido singular
                'plataformas': '#plataformas', // Añadido
                'virtuales': '#plataformas', // Añadido
                'campus': '#plataformas',
                'aula virtual': '#plataformas',
                'aula': '#plataformas', // Añadido
                'virtual': '#plataformas', // Añadido
                'calificaciones': '#plataformas',
                'calificacion': '#plataformas', // Añadido singular
                'materiales educativos': '#plataformas',
                'material educativo': '#plataformas', // Añadido singular
                'materiales': '#plataformas', // Añadido
                'educativos': '#plataformas', // Añadido
                'foros': '#plataformas',
                'foro': '#plataformas', // Añadido singular
                'entregar trabajos': '#plataformas',
                'entregar trabajo': '#plataformas', // Añadido singular
                'trabajos': '#plataformas', // Añadido
                'trabajo': '#plataformas', // Añadido

                'extracurriculares': '#extracurriculares',
                'extracurricular': '#extracurriculares', // Añadido singular
                'grupos': '#extracurriculares',
                'grupo': '#extracurriculares', // Añadido singular
                'semilleros': '#extracurriculares',
                'semillero': '#extracurriculares', // Añadido singular
                'investigacion': '#extracurriculares',
                'proyectos innovadores': '#extracurriculares',
                'proyecto innovador': '#extracurriculares', // Añadido singular
                'proyectos': '#extracurriculares', // Añadido
                'innovadores': '#extracurriculares', // Añadido
                'eventos': '#extracurriculares',
                'evento': '#extracurriculares', // Añadido singular
                'talleres': '#extracurriculares',
                'taller': '#extracurriculares', // Añadido singular
                'conferencias': '#extracurriculares',
                'conferencia': '#extracurriculares', // Añadido singular
                'seminarios': '#extracurriculares',
                'seminario': '#extracurriculares', // Añadido singular
                'culturales': '#extracurriculares',
                'cultural': '#extracurriculares', // Añadido singular
                'deportivos': '#extracurriculares',
                'deportivo': '#extracurriculares', // Añadido singular

                'atencion': '#soporte',
                'soporte': '#soporte',
                'preguntas frecuentes': '#soporte',
                'pregunta frecuente': '#soporte', // Añadido singular
                'preguntas': '#soporte',
                'pregunta': '#soporte', // Añadido singular
                'frecuentes': '#soporte',
                'frecuente': '#soporte', // Añadido singular
                'pqr': '#soporte',
                'ayuda': '#soporte',
                'canales de soporte': '#soporte',
                'canal de soporte': '#soporte', // Añadido singular
                'canales': '#soporte', // Añadido
                'canal': '#soporte', // Añadido
                'chat': '#soporte',
                'correo electronico': '#soporte',
                'correo': '#soporte', // Añadido
                'electronico': '#soporte', // Añadido
                'llamadas telefonicas': '#soporte',
                'llamada telefonica': '#soporte', // Añadido singular
                'llamadas': '#soporte', // Añadido
                'telefonicas': '#soporte', // Añadido
                'contacto': '#soporte',
                'telefono': '#soporte',
                'sede principal': '#soporte',
                'sede': '#soporte', // Añadido
                'principal': '#soporte', // Añadido
                'bogota': '#soporte', // Añadido
                'colombia': '#soporte', // Añadido
                'directorio': '#soporte',
                'datos de contacto': '#soporte', // Añadido
                'datos': '#soporte', // Añadido para capturar "datos" solo
                'dato': '#soporte' // Añadido para capturar "dato" solo
                // Puedes añadir más palabras clave según necesites
            };

            let targetSectionId = null;

            // Buscar si la consulta contiene alguna de las palabras clave (desde las más largas a las más cortas para evitar coincidencias parciales incorrectas)
            // Ordenar las palabras clave por longitud descendente
            const sortedKeywords = Object.keys(keywordMap).sort((a, b) => b.length - a.length);

            for (const keyword of sortedKeywords) {
                // Usar includes para verificar si la consulta CONTIENE la palabra clave
                // La conversión a minúsculas ya se hizo al inicio
                if (query.includes(keyword)) {
                    targetSectionId = keywordMap[keyword];
                    console.log(`Coincidencia encontrada para "${keyword}". Redirigiendo a ${targetSectionId}`); // Log para depuración
                    break; // Encontramos una coincidencia, podemos parar de buscar
                }
            }


            // Si encontramos una sección, desplazarse a ella
            if (targetSectionId) {
                scrollToSection(targetSectionId); // Usar la función de desplazamiento existente

                // Opcional: Marcar el enlace del menú correspondiente si lo deseas
                 const correspondingNavLink = document.querySelector(`.nav-menu a[href="${targetSectionId}"]`);
                 if(correspondingNavLink) {
                      navLinks.forEach(l => l.classList.remove('active')); // Remover de todos
                      correspondingNavLink.classList.add('active'); // Añadir al encontrado
                     // Cerrar menú móvil después de la búsqueda si está abierto
                      if (navMenu.classList.contains('active')) {
                          navMenu.classList.remove('active');
                      }
                 }
                 // Limpiar el campo de búsqueda después de una búsqueda exitosa
                 searchInput.value = '';
                 // En móvil, replegar el input después de una búsqueda exitosa
                 if (window.innerWidth <= 768 && searchContainer.classList.contains('expanded')) {
                      searchContainer.classList.remove('expanded');
                 }

            } else {
                // Mostrar un mensaje si no se encuentra nada
                 alert(`No se encontró información relacionada con "${query}". Por favor, intente con otras palabras clave.`);
                console.log(`No se encontró información relacionada con "${query}". No se encontró coincidencia en el mapa de palabras clave.`); // Log para depuración

                // Opcional: Limpiar el campo de búsqueda después de una búsqueda fallida
                 searchInput.value = '';
                 // En móvil, replegar el input después de una búsqueda fallida
                 if (window.innerWidth <= 768 && searchContainer.classList.contains('expanded')) {
                      searchContainer.classList.remove('expanded');
                 }
            }
        }

    } else {
        console.warn("Contenedor, campo de búsqueda o ícono no encontrados.");
    }
});