let page = 1;

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

        document.querySelector(`#${view[page]}`).scrollIntoView({ behavior: "smooth" });
    });
});

window.addEventListener('scroll', () => {
    document.querySelectorAll('body > section').forEach((element) => {
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
    event.stopPropagation;
    const optionsMenuIcons = document.querySelectorAll("#options__menu");
    optionsMenuIcons.forEach(icon => {
        icon.style.transform = `translateY(calc(((var(--fontsize-menu) + 16px) + var(--gap-menu)) * ${page}))`;
    });
}