let page = 1;
let isScrolling = false;

const view = {
    "1": "portada",
    "0": "sobre-mi",
    "-1": "proyectos",
    "-2": "contacto"
}

window.onload = function() {
    setTimeout(function() {
        // Aseguramos que el scroll se ejecute después de que la página esté completamente cargada
        window.scrollTo(0, 0);
    }, 10); // Timeout de 10ms para garantizar que se ejecute después de la carga
};

document.querySelectorAll("#menu > i").forEach(item => {
    item.addEventListener("click", function() {
        let move = 0;
        if (this.id === "up" && page < 1) {
            move = 1;
        } else if (this.id === "down" && page > -2) {
            move = -1;
        }
        
        if (move === 0) return;
        page += move;
        changeIconPage();

        isScrolling = true; // Indica que el desplazamiento fue iniciado por un clic en el menú
        document.querySelector(`#${view[page]}`).scrollIntoView({ behavior: "smooth" });
        setTimeout(() => { isScrolling = false; }, 500); // Restablece la bandera después de un tiempo
    });
});

window.addEventListener('scroll', () => {
    if (isScrolling) return; // Si el desplazamiento fue iniciado por un clic en el menú, no hacer nada
    console.log("scrolling");

    document.querySelectorAll('main > section').forEach((element) => {
        const rect = element.getBoundingClientRect();
    
        // Detecta si el elemento está en la parte superior de la pantalla
        if (rect.top <= 250 && rect.bottom >= 250) {
            // Extrae el número correspondiente al id usando el objeto view
            for (const [key, value] of Object.entries(view)) {
                if (value === element.id) {
                    page = parseInt(key);
                    changeIconPage();
                }
            }
        }
    });
});

function changeIconPage() {
    const optionsMenuIcons = document.querySelectorAll("#options__menu");
    optionsMenuIcons.forEach(icon => {
        icon.style.transform = `translateY(calc(((var(--fontsize-menu) + 16px) + var(--gap-menu)) * ${page}))`;
    });
}
