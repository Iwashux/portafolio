let page = 1;
let isAnimating = false;

window.onload = function() {
    setTimeout(function() {
        // Aseguramos que el scroll se ejecute después de que la página esté completamente cargada
        window.scrollTo(0, 0);
    }, 10); // Timeout de 10ms para garantizar que se ejecute después de la carga
};

document.querySelectorAll("#menu > i").forEach(item => {
    item.addEventListener("click", function() {
        if (isAnimating) return;

        let move = 0;
        if (this.id === "up" && page < 1) {
            move = 1;
        } else if (this.id === "down" && page > -2) {
            move = -1;
        }
        
        changePage(move);
    });
});

window.addEventListener('wheel', function(event) {
    if (isAnimating) return;

    let move = 0;
    if (event.deltaY > 0 && page > -2) {
        move = -1;
    } else if (event.deltaY < 0 && page < 1) {
        move = 1;
    }

    changePage(move);
});

// let touchStartY = 0;
// let touchEndY = 0;

// window.addEventListener('touchstart', function(event) {
//     touchStartY = event.changedTouches[0].screenY;
// });

// window.addEventListener('touchend', function(event) {
//     if (isAnimating) return;

//     touchEndY = event.changedTouches[0].screenY;
//     let move = 0;

//     if (touchStartY - touchEndY > 50 && page > -2) {
//         move = -1;
//     } else if (touchEndY - touchStartY > 50 && page < 1) {
//         move = 1;
//     }

//     changePage(move);
// });

function changePage(move) {
    if (move === 0) return;

    isAnimating = true;
    page += move;

    const optionsMenuIcons = document.querySelectorAll("#options__menu");
    optionsMenuIcons.forEach(icon => {
        icon.style.transform = `translateY(calc(((var(--fontsize-menu) + 16px) + var(--gap-menu)) * ${page}))`;
    });

    window.scrollTo({
        top: window.scrollY + window.innerHeight * move * -1,
        behavior: 'smooth'
    });

    // Esperar a que la animación de scroll termine
    setTimeout(() => {
        isAnimating = false;
    }, 500); // Ajusta el tiempo según la duración de tu animación
}