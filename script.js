/* =============================================
   Máncora – Menú del Día | script.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ── Menú hamburguesa móvil ──
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    let overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function closeMenu() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
    }
    function openMenu() {
        menuToggle.classList.add('active');
        navLinks.classList.add('open');
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    menuToggle.addEventListener('click', () => {
        navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });
    overlay.addEventListener('click', closeMenu);

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ── Navbar efecto scroll ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // ── Smooth scroll ──
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const el = document.getElementById(targetId);
            if (el) {
                const offset = navbar.offsetHeight + 10;
                const top = el.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── Botón WhatsApp principal ──
    const btnOrder = document.getElementById('whatsappOrderBtn');
    if (btnOrder) {
        btnOrder.addEventListener('click', () => {
            const phone = '56936818881';
            const msg = encodeURIComponent('Hola, quiero realizar un pedido del Menú del día. ¿Cómo puedo ordenar? 📋');
            window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
        });
    }

    // ── Botón flotante WhatsApp (aparece al hacer scroll) ──
    const fab = document.getElementById('fabWhatsapp');
    if (fab) {
        window.addEventListener('scroll', () => {
            fab.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
    }

    // ── Scroll animations (IntersectionObserver) ──
    const animatedElements = document.querySelectorAll('[data-animate]');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // Stagger animation delay
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, i * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all
        animatedElements.forEach(el => el.classList.add('animate-in'));
    }

    // ── Active nav link on scroll ──
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + navbar.offsetHeight + 50;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }, { passive: true });
});
