document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. FLOWER PETALS GENERATION & ANIMATION (AR Vector Compass)
       -------------------------------------------------------------------------- */
    const flowers = document.querySelectorAll('.flower');
    flowers.forEach(flower => {
        // Clear any existing petals if reloaded
        flower.innerHTML = '';
        for (let i = 0; i < 24; i++) {
            const angle = i * 15;
            flower.insertAdjacentHTML("beforeend", `
                <div class="petal" style="transform: rotate(${angle}deg);">
                    <div class="circle"></div>
                    <div class="left"></div>
                    <div class="right"></div>
                </div>
            `);
        }
    });

    /* --------------------------------------------------------------------------
       2. THEME SWITCHER (Pro Darkroom / Clean Minimalist Light Mode)
       -------------------------------------------------------------------------- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch (e) {
            console.warn('LocalStorage unavailable for theme persistence', e);
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    }

    /* --------------------------------------------------------------------------
       3. MOBILE HAMBURGER NAVIGATION DRAWER
       -------------------------------------------------------------------------- */
    const floatButton = document.getElementById('mobile-menu-btn') || document.querySelector('.float-button');
    const navBar = document.querySelector('.nav-bar');

    if (floatButton && navBar) {
        floatButton.addEventListener('click', () => {
            const isOpen = floatButton.classList.toggle('active');
            navBar.classList.toggle('active');
            floatButton.setAttribute('aria-expanded', isOpen);
        });
    }

    /* --------------------------------------------------------------------------
       4. SMOOTH SCROLL FOR NAV LINKS & DOTS
       -------------------------------------------------------------------------- */
    const navLinks = document.querySelectorAll('.nav-link, .sidebar-dot, .hero-cta a, .scroll-indicator a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#' || !targetId.startsWith('#')) return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (floatButton && navBar) {
                    floatButton.classList.remove('active');
                    navBar.classList.remove('active');
                    floatButton.setAttribute('aria-expanded', 'false');
                }
                
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --------------------------------------------------------------------------
       5. SCROLL SPY & ENTRANCE ANIMATIONS (INTERSECTION OBSERVER)
       -------------------------------------------------------------------------- */
    const sections = document.querySelectorAll('.section');
    const header = document.querySelector('.header');
    const topNavLinks = document.querySelectorAll('.nav-link');
    const sidebarDots = document.querySelectorAll('.sidebar-dot');
    const scrollContainer = document.querySelector('.scroll-container');
    let scrollUpdateQueued = false;

    function updateHeaderOnScroll() {
        const scrollTop = Math.max(window.scrollY, scrollContainer?.scrollTop || 0);
        header.classList.toggle('scrolled', scrollTop > 40);
        scrollUpdateQueued = false;
    }

    function queueScrollUpdate() {
        if (!scrollUpdateQueued) {
            scrollUpdateQueued = true;
            requestAnimationFrame(updateHeaderOnScroll);
        }
    }

    window.addEventListener('scroll', queueScrollUpdate, { passive: true });
    scrollContainer?.addEventListener('scroll', queueScrollUpdate, { passive: true });
    updateHeaderOnScroll();

    // Intersection observer for section tracking & reveal triggers
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');

                // Update Header Links active state
                topNavLinks.forEach(link => {
                    if (link.getAttribute('data-target') === activeId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });

                // Update Sidebar Dots active state
                sidebarDots.forEach(dot => {
                    if (dot.getAttribute('data-target') === activeId) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });

                // Trigger staggered reveal animation for items inside the section
                if (!entry.target.dataset.revealed) {
                    entry.target.dataset.revealed = 'true';
                    entry.target.querySelectorAll('.reveal').forEach((el, index) => {
                        setTimeout(() => el.classList.add('revealed'), index * 60);
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});