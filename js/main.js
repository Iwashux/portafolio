document.addEventListener("DOMContentLoaded", () => {
    // Configuración compartida de iconos de tecnologías
    const iconsMap = {
        html5: { class: "fa-brands fa-html5", color: "#fc490b" },
        css3: { class: "fa-brands fa-css3", color: "#2864f0" },
        js: { class: "fa-brands fa-js", color: "#f0db4f" },
        php: { class: "fa-brands fa-php", color: "#777bb4" },
        laravel: { class: "fa-brands fa-laravel", color: "#f55247" },
    };

    // 0. Prevención de acumulación en el historial por enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");

            // Si el enlace es solo '#', ignorar o subir arriba
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
                // Cambia la URL en la barra sin crear un nuevo registro en el historial
                history.replaceState(null, null, targetId);
            }
        });
    });

    // 1. Lógica del Menú Móvil
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const navMenu = document.getElementById("nav-links");
    const mobileIcon = mobileBtn.querySelector("i");

    mobileBtn.addEventListener("click", () => {
        navMenu.classList.toggle("hidden");
        navMenu.classList.toggle("flex");

        if (navMenu.classList.contains("hidden")) {
            mobileIcon.classList.remove("fa-xmark");
            mobileIcon.classList.add("fa-bars");
        } else {
            mobileIcon.classList.remove("fa-bars");
            mobileIcon.classList.add("fa-xmark");
        }
    });

    document.querySelectorAll("#nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 768) {
                navMenu.classList.add("hidden");
                navMenu.classList.remove("flex");
                mobileIcon.classList.remove("fa-xmark");
                mobileIcon.classList.add("fa-bars");
            }
        });
    });

    // 2. Manejo del menú activo mediante scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        const scrollPosition = window.scrollY + 150;
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (scrollPosition >= sectionTop) {
                current = section.getAttribute("id");
            }
            if (isAtBottom) {
                current = sections[sections.length - 1].getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("text-brand");
            if (link.getAttribute("href").includes(current) && current !== "") {
                link.classList.add("text-brand");
            }
        });
    });

    // 3. Renderizado de Proyectos Principales (Depende de data.js)
    const container = document.getElementById("ambicioso-container");

    proyectos.forEach((proyecto) => {
        const card = document.createElement("div");
        card.className = `flex flex-col bg-brand-card p-6 rounded-xl border border-slate-700 transition-all h-full ${proyecto.img.length > 0 ? "hover:border-brand cursor-pointer hover:-translate-y-2 group" : ""}`;
        card.setAttribute("data-id", proyecto.id);

        const langHTML = proyecto.lenguajes
            .map((lang) => {
                const icon = iconsMap[lang];
                return `<i class="${icon.class} text-xl" style="color: ${icon.color}" title="${lang}"></i>`;
            })
            .join("");

        const statusClass = proyecto.estado === "En producción" ? "border-green-500 text-green-400 bg-green-500/10" : "border-yellow-500 text-yellow-400 bg-yellow-500/10";

        const statusBadge = `<span class="px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full border ${statusClass}">${proyecto.estado}</span>`;

        const galleryBadge =
            proyecto.img.length > 0
                ? `<div class="mt-4 pt-4 border-t border-slate-700/50 inline-flex items-center gap-2 text-xs font-semibold text-brand"><i class="fa-solid fa-image"></i> Ver galería</div>`
                : `<div class="mt-4 pt-4 border-t border-slate-700/50 inline-flex items-center gap-2 text-xs font-semibold text-slate-500"><i class="fa-solid fa-code"></i> Sin capturas disponibles</div>`;

        card.innerHTML = `
            <div class="flex flex-col h-full">
                <div class="flex items-start mb-4">
                    <h3 class="text-xl font-bold text-white group-hover:text-brand transition-colors min-h-[3.5rem] flex items-center">${proyecto.name}</h3>
                </div>
                <div class="flex gap-2 justify-between items-center mb-4">
                    <div class="flex gap-1 bg-slate-900/50 p-1 px-2 rounded-lg shrink-0">${langHTML}</div>
                    <div class="flex flex-col gap-3 items-start">${statusBadge}</div>
                </div>
                <p class="text-slate-400 text-sm leading-relaxed flex-grow">${proyecto.descrip}</p>
                ${galleryBadge}
            </div>
        `;

        container.appendChild(card);
    });

    // 4. Lógica del Modal con Swiper
    container.addEventListener("click", (e) => {
        const card = e.target.closest("div[data-id]");
        if (!card) return;

        const proyecto = proyectos.find((p) => p.id === parseInt(card.getAttribute("data-id")));

        if (proyecto && proyecto.img.length > 0) {
            const isMobile = window.innerWidth < 768;

            const slidesHtml = proyecto.img
                .map(
                    (imgSrc) => `
                        <div class="swiper-slide">
                            <img src="${imgSrc}" alt="Captura de ${proyecto.name}">
                        </div>
                    `,
                )
                .join("");

            Swal.fire({
                title: `<span class="text-2xl font-bold">${proyecto.name}</span>`,
                html: `
                    <div class="swiper mySwiper mt-4">
                        <div class="swiper-wrapper">${slidesHtml}</div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                    </div>
                `,
                showCloseButton: true,
                showConfirmButton: false,
                width: isMobile ? "95%" : "800px",
                background: "#1e293b",
                padding: "2rem",
                didOpen: () => {
                    new Swiper(".mySwiper", {
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true,
                        },
                        loop: true,
                        grabCursor: true,
                    });
                },
            });
        }
    });

    // 5. Renderizado de Mini Proyectos
    const miniContainer = document.getElementById("mini-proyectos-container");

    if (miniContainer && typeof miniProyectos !== "undefined") {
        miniContainer.innerHTML = ""; // Limpiar contenedor por seguridad

        miniProyectos.forEach((mini) => {
            const card = document.createElement("div");
            card.className = "group bg-brand-card rounded-xl overflow-hidden border border-slate-700 hover:border-brand transition-all hover:-translate-y-1 flex flex-col h-full shadow-lg";

            const langHTML = mini.lenguajes
                .map((lang) => {
                    const icon = iconsMap[lang];
                    return icon ? `<i class="${icon.class} text-lg" style="color: ${icon.color}" title="${lang}"></i>` : "";
                })
                .join("");

            card.innerHTML = `
                <div class="h-40 overflow-hidden bg-slate-800 relative">
                    <img src="${mini.img}" alt="Previsualización de ${mini.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                </div>
                <div class="px-5 pt-5 pb-2.5 flex flex-col flex-grow">
                    <h3 class="text-lg font-bold text-white mb-2 group-hover:text-brand transition-colors">${mini.name}</h3>
                    <p class="text-sm text-slate-400 mb-2 line-clamp-3 flex-grow">${mini.descrip}</p>
                    
                    <div class="flex items-center justify-between mt-auto border-t border-slate-800/60">
                        <div class="flex gap-2.5 items-center">
                            ${langHTML}
                        </div>
                        <div class="flex items-center gap-1">
                            <a href="${mini.repoUrl}" target="_blank" rel="noopener noreferrer" 
                            class="p-2.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 text-xl transition-all focus:outline-none focus:ring-2 focus:ring-brand" 
                            aria-label="Ver código fuente de ${mini.name} en GitHub" title="Ver Código">
                                <i class="fa-brands fa-github"></i>
                            </a>
                            <a href="${mini.pageUrl}" target="_blank" rel="noopener noreferrer" 
                            class="p-2.5 text-slate-400 hover:text-brand rounded-lg hover:bg-slate-800 text-xl transition-all focus:outline-none focus:ring-2 focus:ring-brand" 
                            aria-label="Visitar el sitio web en vivo de ${mini.name}" title="Ver Demo">
                                <i class="fa-solid fa-earth-americas"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            miniContainer.appendChild(card);
        });
    }

    // RENDERIZADO DINÁMICO DE CERTIFICADOS
    const certificadosContainer = document.getElementById("certificados-container");

    if (certificadosContainer && typeof certificaciones !== "undefined") {
        certificadosContainer.innerHTML = ""; // Limpiar contenedor

        certificaciones.forEach((cert) => {
            const certCard = document.createElement("div");
            certCard.className = "bg-brand-card p-6 rounded-xl border border-slate-700 hover:border-brand transition-all flex flex-col justify-between shadow-md";

            // Cambiar el icono y texto según el tipo de credencial
            const iconClass = cert.isLocalFile ? "fa-solid fa-file-pdf text-red-500" : "fa-solid fa-graduation-cap text-brand";
            const buttonText = cert.isLocalFile ? "Ver Documento" : "Ver Credencial";

            certCard.innerHTML = `
            <div>
                <div class="mb-1 flex items-center gap-4">
                    <i class="${iconClass} text-3xl"></i>
                    <h3 class="text-[1rem] font-bold text-white">${cert.title}</h3>
                </div>
                <span class="text-xs text-brand font-semibold block mb-2">${cert.issuer} — ${cert.date}</span>
                <p class="text-sm text-slate-400 leading-relaxed">${cert.description}</p>
            </div>
            <a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center gap-2 text-sm text-brand hover:text-brand-light font-bold transition-colors mt-6 w-fit focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-brand-card rounded">
                ${buttonText} <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </a>
        `;
            certificadosContainer.appendChild(certCard);
        });
    }
});
