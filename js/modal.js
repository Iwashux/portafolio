const proyectos = [
    {
        id: 1,
        name: "Administrador de documentos",
        lenguajes: ["html5", "css3", "js", "laravel", "php"],
        descrip: "Plataforma para gestionar y organizar documentos de autores, facilitando la creación, edición y almacenamiento de manuscritos de libros de manera eficiente.", 
        img: [
            "img/proyectos/mi_autor/cap1.png", 
            "img/proyectos/mi_autor/cap2.png", 
            "img/proyectos/mi_autor/cap3.png",
            "img/proyectos/mi_autor/cap4.png",
            "img/proyectos/mi_autor/cap5.png",
            "img/proyectos/mi_autor/cap6.png"
        ]
    },
    {
        id: 2,
        name: "Tienda de Intercambio",
        lenguajes: ["html5", "css3", "js", "laravel", "php"],
        descrip: "Plataforma para facilitar y gestionar intercambios de productos o servicios entre usuarios de manera sencilla y segura.", 
        img: []
    },
    {
        id: 3,
        name: "Sistema de gestion administrativa", 
        lenguajes: ["html5", "css3", "js", "laravel", "php"],
        descrip: "Plataforma web para la gestión integral de procesos administrativos, que permite administrar usuarios, registros, pagos, certificaciones y controlar accesos mediante un sistema de roles y permisos personalizables.",
        img: [
            "img/proyectos/gestion_administrativa/cap1.png", 
            "img/proyectos/gestion_administrativa/cap2.png", 
            "img/proyectos/gestion_administrativa/cap3.png"
        ]
    }
];

const ambiciosoContainer = document.querySelector('.ambicioso');

proyectos.forEach(proyecto => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card__proyect';
    cardDiv.setAttribute('data-id', proyecto.id);
    if (proyecto.img.length > 0) cardDiv.style.cursor = 'pointer';
    
    const title = document.createElement('h3');
    title.textContent = proyecto.name;
    
    const lenguajesDiv = document.createElement('div');
    lenguajesDiv.className = 'lenguajes__container';
    
    proyecto.lenguajes.forEach(lenguaje => {
        const icon = document.createElement('i');
        icon.className = `fa-brands fa-${lenguaje}`;
        lenguajesDiv.appendChild(icon);
    });
    
    const description = document.createElement('p');
    description.textContent = proyecto.descrip;
    
    cardDiv.appendChild(title);
    cardDiv.appendChild(lenguajesDiv);
    cardDiv.appendChild(description);
    
    ambiciosoContainer.appendChild(cardDiv);
});

ambiciosoContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.card__proyect');
    if (card) {
        const proyectoId = parseInt(card.getAttribute('data-id'));
        const proyecto = proyectos.find(p => p.id === proyectoId);
        if (proyecto.img.length > 0) {
            swal.fire({
                title: proyecto.name,
                html: `<div class="swiper">
                        <div class="swiper-wrapper">
                            ${proyecto.img.map(imgSrc => `<div class="swiper-slide">
                                <img src="${imgSrc}" class="d-block w-100" alt="...">
                            </div>`).join('')}
                        </div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>`,
                showCloseButton: true,
                showConfirmButton: false,
                theme: 'dark',
                width: '80%',
                customClass: {popup: 'swal-wide'},
                didOpen: () => {
                    const swiper = new Swiper('.swiper', {
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                    });
                }
            });
        }
    }
});