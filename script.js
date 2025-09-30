// --- REUSABLE ANIMATION INITIALIZER FUNCTION ---
function initializeScrollAnimations() {
    const animatedCards = document.querySelectorAll('.animated-card:not(.visible)');
    if (animatedCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedCards.forEach(card => observer.observe(card));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Page Transition Logic ---
    const transitionEl = document.querySelector('.page-transition');
    if (transitionEl) {
        setTimeout(() => {
            transitionEl.classList.remove('is-active');
        }, 100);
    }

    const allLinks = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href*="mailto:"])');
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const destination = link.href;
            if (transitionEl && destination !== window.location.href) {
                transitionEl.classList.add('is-active');
                setTimeout(() => { window.location.href = destination; }, 400);
            } else if (destination !== window.location.href) {
                window.location.href = destination;
            }
        });
    });

    // --- Theme Switcher ---
    const themeSwitcher = document.getElementById('theme-switcher');
    if (themeSwitcher) {
        const themeIcon = themeSwitcher.querySelector('i');
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
        themeSwitcher.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            if (themeIcon) {
                themeIcon.className = `fas ${isLight ? 'fa-sun' : 'fa-moon'}`;
            }
        });
    }

    // --- Sidebar Logic ---
    const menuIcon = document.getElementById('menu-icon');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.querySelector('.overlay');
    const toggleSidebar = (show) => {
        if (sidebar && overlay && menuIcon) {
            sidebar.classList.toggle('active', show);
            overlay.classList.toggle('active', show);
            menuIcon.classList.toggle('active', show);
        }
    };
    if (menuIcon) menuIcon.addEventListener('click', () => toggleSidebar(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleSidebar(false));
    if (overlay) overlay.addEventListener('click', () => toggleSidebar(false));

    // Initial call for any static cards (important for pages without dynamic content)
    initializeScrollAnimations();
});