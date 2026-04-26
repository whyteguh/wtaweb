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

        // ── FETCH LATEST POSTS FROM POSTS.JSON ──
        async function fetchLatestPosts() {
            const container = document.getElementById('blog-posts-container');
            if (!container) return;

            try {
                // Fetch our static catalog of markdown posts
                const response = await fetch('/posts/posts.json');
                if (!response.ok) throw new Error('Failed to load posts catalog');
                
                const posts = await response.json();

                if (posts && posts.length > 0) {
                    // Bersihkan card static/fallback hanya jika berhasil dapat data
                    container.innerHTML = '';
                    
                    const gradients = [
                        '', // Default CSS gradient
                        'linear-gradient(135deg, #e8d5c0, #c4a882)',
                        'linear-gradient(135deg, #d5e8d5, #8fb88f)'
                    ];

                    // Ambil maksimal 3 artikel terbaru
                    const latestPosts = posts.slice(0, 3);

                    latestPosts.forEach((post, index) => {
                        const gradient = gradients[index % gradients.length];
                        const gradientStyle = gradient ? `style="background: ${gradient};"` : '';
                        const cat = post.category || 'Blog';
                        
                        const cardHTML = `
                            <a href="/article.html?id=${post.id}" class="post-card fade-in visible">
                                <div class="post-thumb">
                                    <div class="post-thumb-gradient" ${gradientStyle}></div>
                                    <span class="post-thumb-icon">On ${cat.toLowerCase()}</span>
                                </div>
                                <div class="post-body">
                                    <span class="post-cat">${cat}</span>
                                    <h3 data-lang="en">${post.title}</h3>
                                    <h3 data-lang="id">${post.title}</h3>
                                    <p data-lang="en">${post.description || ''}</p>
                                    <p data-lang="id">${post.description || ''}</p>
                                    <div class="post-meta">
                                        <span>${post.date || ''}</span>
                                        <span data-lang="en">Read Article</span>
                                        <span data-lang="id">Baca Artikel</span>
                                    </div>
                                </div>
                            </a>
                        `;
                        container.innerHTML += cardHTML;
                    });
                }
            } catch (error) {
                console.error('Error fetching static posts:', error);
                // Biarkan konten fallback (Coming Soon) tetap tampil jika terjadi error (misal tes lokal tanpa server)
            }
        }

        // ── DYNAMIC SOCIAL LINKS FROM socials.md ──
        async function loadSocialLinks() {
            try {
                const response = await fetch('/socials.md');
                if (!response.ok) return; // Silent fail if file doesn't exist
                const text = await response.text();
                
                // Parse markdown links: - [Name](url)
                const regex = /-\s+\[(.*?)\]\((.*?)\)/g;
                let links = [];
                let match;
                while ((match = regex.exec(text)) !== null) {
                    links.push({ name: match[1], url: match[2] });
                }

                // Inject into Contact section (index.html)
                const contactContainer = document.getElementById('dynamic-social-contact');
                if (contactContainer) {
                    contactContainer.innerHTML = links.map(link => {
                        let icon = '🔗';
                        const n = link.name.toLowerCase();
                        if(n.includes('email') || n.includes('mail')) icon = '✉';
                        if(n.includes('linkedin')) icon = 'in';
                        if(n.includes('instagram') || n.includes('ig')) icon = 'ig';
                        if(n.includes('twitter') || n.includes('x')) icon = 'x';
                        if(n.includes('medium')) icon = 'M';
                        
                        return `<a href="${link.url}" class="contact-link" target="_blank">
                                    <span class="contact-icon">${icon}</span>
                                    ${link.name}
                                </a>`;
                    }).join('');
                }

                // Inject into Halo page
                const haloContainer = document.getElementById('dynamic-social-halo');
                if (haloContainer) {
                    haloContainer.innerHTML = links.map(link => {
                        let icon = '🔗';
                        const n = link.name.toLowerCase();
                        if(n.includes('email') || n.includes('mail')) icon = '✉';
                        if(n.includes('linkedin')) icon = 'in';
                        if(n.includes('instagram') || n.includes('ig')) icon = 'ig';
                        if(n.includes('twitter') || n.includes('x')) icon = 'x';
                        if(n.includes('medium')) icon = 'M';

                        return `<a href="${link.url}" target="_blank" style="display:flex; align-items:center; gap:6px;">
                                    <span class="contact-icon" style="width:28px; height:28px; font-size:0.75rem;">${icon}</span>
                                    ${link.name}
                                </a>`;
                    }).join('');
                }

            } catch (error) {
                console.error("Failed to load socials:", error);
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            fetchLatestPosts();
            loadSocialLinks();
        });