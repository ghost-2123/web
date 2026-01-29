/**
 * LAPG ENGINE 2026
 * Senior Portfolio Controller - High Performance
 * Status: 100% Operational // Target: xkoryqjl
 */

const LAPG_Engine = (() => {
    
    // --- Selectores Globales ---
    const ui = {
        nav: document.getElementById('main-nav'),
        form: document.getElementById('contact-form'),
        progressBar: null,
        cursor: null,
        follower: null,
    };

    // --- 1. Sistema de Cursor Magnético ---
    const initCursor = () => {
        const cursor = document.createElement('div');
        const follower = document.createElement('div');
        cursor.className = 'custom-cursor';
        follower.className = 'cursor-follower';
        document.body.appendChild(cursor);
        document.body.appendChild(follower);

        ui.cursor = cursor;
        ui.follower = follower;

        window.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                ui.cursor.style.left = `${e.clientX}px`;
                ui.cursor.style.top = `${e.clientY}px`;
                
                // Seguidor con interpolación visual
                ui.follower.style.left = `${e.clientX - 16}px`;
                ui.follower.style.top = `${e.clientY - 16}px`;
            });
        });

        // Feedback visual en elementos clicables
        const interactives = document.querySelectorAll('a, button, input, textarea, .glass-card, .group');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
        });
    };

    // --- 2. Sistema de Scroll y Barra de Progreso ---
    const initScrollSystem = () => {
        const progress = document.createElement('div');
        progress.id = 'scroll-progress';
        progress.style.cssText = `
            position: fixed; top: 0; left: 0; height: 3px; 
            background: #E60026; z-index: 1000; transition: width 0.1s ease-out;
            box-shadow: 0 0 15px rgba(230, 0, 38, 0.6);
        `;
        document.body.appendChild(progress);
        ui.progressBar = progress;

        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            ui.progressBar.style.width = `${scrolled}%`;

            // Efecto Glass en Nav al hacer scroll
            if (winScroll > 50) {
                ui.nav.style.padding = '0.8rem 0';
                ui.nav.style.background = 'rgba(10, 10, 10, 0.9)';
                ui.nav.style.backdropFilter = 'blur(10px)';
            } else {
                ui.nav.style.padding = '1.5rem 0';
                ui.nav.style.background = 'transparent';
                ui.nav.style.backdropFilter = 'none';
            }
        });
    };

    // --- 3. Sistema de Revelación (Intersection Observer) ---
    const initRevealSystem = () => {
        const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    revealObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const targets = document.querySelectorAll('.glass-card, section h2, .animate-reveal, #contacto form');
        targets.forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
            el.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
            revealObserver.observe(el);
        });
    };

    // --- 4. Controlador de Formulario (ENVÍO REAL A GMAIL) ---
    const initFormController = () => {
        if (!ui.form) return;

        ui.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = ui.form.querySelector('button');
            const originalText = btn.innerText;

            // Bloqueo de UI
            btn.disabled = true;
            btn.innerText = "PROTOCOL_TRANSMITTING...";
            btn.style.opacity = "0.6";

            const formData = new FormData(ui.form);
            
            try {
                // TU ID DE FORMSPREE ACTUALIZADO
                const response = await fetch('https://formspree.io/f/xkoryqjl', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    btn.style.backgroundColor = "#28a745"; 
                    btn.innerText = "SYSTEM: SUCCESS_DELIVERED";
                    ui.form.reset();
                } else {
                    throw new Error('Server failure');
                }
            } catch (error) {
                btn.style.backgroundColor = "#E60026";
                btn.innerText = "ERROR_NETWORK_FAILURE";
            } finally {
                setTimeout(() => {
                    btn.style.backgroundColor = "";
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.opacity = "1";
                }, 4000);
            }
        });
    };

    // --- 5. Efecto de Spotlight Mouse ---
    const initInteractions = () => {
        document.querySelectorAll('.glass-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            });
        });
    };

    // --- Inicialización ---
    return {
        init: () => {
            console.log("%cLAPG_ENGINE_2026_ACTIVE", "color: #E60026; font-weight: bold; padding: 10px; background: #000; border: 1px solid #E60026;");
            initCursor();
            initScrollSystem();
            initRevealSystem();
            initFormController();
            initInteractions();
        }
    };
})();

document.addEventListener('DOMContentLoaded', LAPG_Engine.init);