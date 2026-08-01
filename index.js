document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. FLOWER PETALS GENERATION & ANIMATION
       -------------------------------------------------------------------------- */
    const flowers = document.querySelectorAll('.flower');
    flowers.forEach(flower => {
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
       2. MOBILE HAMBURGER NAVIGATION DRAWER
       -------------------------------------------------------------------------- */
    const floatButton = document.querySelector('.float-button');
    const navBar = document.querySelector('.nav-bar');

    if (floatButton && navBar) {
        floatButton.addEventListener('click', () => {
            floatButton.classList.toggle('active');
            navBar.classList.toggle('active');
        });
    }

    /* --------------------------------------------------------------------------
       3. SMOOTH SCROLL FOR NAV LINKS & DOTS
       -------------------------------------------------------------------------- */
    const navLinks = document.querySelectorAll('.nav-link, .sidebar-dot, .hero-cta a, .scroll-indicator a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Close mobile menu if open
                if (floatButton && navBar) {
                    floatButton.classList.remove('active');
                    navBar.classList.remove('active');
                }
                
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --------------------------------------------------------------------------
       4. SCROLL SPY & ENTRANCE ANIMATIONS (INTERSECTION OBSERVER)
       -------------------------------------------------------------------------- */
    const sections = document.querySelectorAll('.section');
    const header = document.querySelector('.header');
    const topNavLinks = document.querySelectorAll('.nav-link');
    const sidebarDots = document.querySelectorAll('.sidebar-dot');

    // Keep scroll work to one update per rendered frame. The desktop layout
    // scrolls inside `.scroll-container`; mobile scrolls the page itself.
    const scrollContainer = document.querySelector('.scroll-container');
    let scrollUpdateQueued = false;

    function updateHeaderOnScroll() {
        const scrollTop = Math.max(window.scrollY, scrollContainer?.scrollTop || 0);
        header.classList.toggle('scrolled', scrollTop > 50);
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
    // Observer options for active sections
    const observerOptions = {
        root: null,
        // Projects grows far taller than a phone viewport. A percentage threshold
        // can then never be met, leaving every `.reveal` item invisible.
        // Reveal a section as soon as it enters the viewport instead.
        rootMargin: '0px 0px -10% 0px',
        threshold: 0
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

                // Reveal each section once. Re-entering a section should not
                // queue another set of timers while the user is scrolling.
                if (!entry.target.dataset.revealed) {
                    entry.target.dataset.revealed = 'true';
                    entry.target.querySelectorAll('.reveal').forEach((el, index) => {
                        setTimeout(() => el.classList.add('revealed'), index * 75);
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});