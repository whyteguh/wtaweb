// ── FADE IN ON SCROLL ──
        const faders = document.querySelectorAll('.fade-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(el => {
                if (el.isIntersecting) {
                    el.target.classList.add('visible');
                    observer.unobserve(el.target);
                }
            });
        }, { threshold: 0.1 });
        faders.forEach(f => observer.observe(f));

        // Trigger hero fade-in immediately
        setTimeout(() => {
            document.querySelectorAll('.hero .fade-in').forEach(el => el.classList.add('visible'));
        }, 100);

        // ── LANGUAGE TOGGLE ──
        const langBtn = document.getElementById('langBtn');
        let currentLang = 'en';
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'id' : 'en';
            document.body.classList.toggle('lang-id', currentLang === 'id');
            langBtn.textContent = currentLang === 'en' ? 'ID' : 'EN';
        });

        // ── SMOOTH NAV ACTIVE STATE ──
        const sections = document.querySelectorAll('section[id]');
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            sections.forEach(sec => {
                const top = sec.offsetTop - 100;
                const bottom = top + sec.offsetHeight;
                if (scrollY >= top && scrollY < bottom) {
                    document.querySelectorAll('.nav-links a').forEach(a => {
                        a.style.color = '';
                    });
                    const active = document.querySelectorAll(`.nav-links a[href="#${sec.id}"]`);
                    active.forEach(a => a.style.color = 'var(--accent)');
                }
            });
        });