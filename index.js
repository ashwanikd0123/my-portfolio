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

    // Slow back-and-forth micro-animation for each petal
    function startPermanentPetalAnimation() {
        const petals = document.querySelectorAll('.petal');
        petals.forEach((p, idx) => {
            let angle = p.style.transform.replace('rotate(', '').replace('deg)', '');
            angle = parseFloat(angle);
            const delay = (idx % 2 === 0) ? 0 : 100;
            p.animate([
                { transform: `rotate(${angle}deg)` },
                { transform: `rotate(${angle + 2}deg)` },
                { transform: `rotate(${angle}deg)` },
                { transform: `rotate(${angle - 2}deg)` },
                { transform: `rotate(${angle}deg)` }
            ], {
                duration: 3000,
                iterations: Infinity,
                easing: 'linear',
                direction: 'alternate',
                delay: delay
            });
        });
    }

    // Delay start until entrance transition is completed
    setTimeout(startPermanentPetalAnimation, 4200);

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

    // Sticky header shadow change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

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

                // Trigger Reveal Entry Animations
                const reveals = entry.target.querySelectorAll('.reveal');
                reveals.forEach((el, index) => {
                    // Stagger animation slightly for child elements
                    setTimeout(() => {
                        el.classList.add('revealed');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});