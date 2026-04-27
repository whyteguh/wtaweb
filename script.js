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
                const response = await fetch('posts/posts.json');
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

        // ── FETCH PINNED RESOURCES FROM RESOURCES.JSON ──
        async function fetchPinnedResources() {
            const container = document.getElementById('pinned-resources-container');
            if (!container) return;

            try {
                const response = await fetch('resources/resources.json');
                if (!response.ok) throw new Error('Failed to load resources catalog');
                
                const resources = await response.json();
                const pinnedResources = resources.filter(r => r.pinned).slice(0, 3);

                if (pinnedResources.length > 0) {
                    container.innerHTML = '';
                    pinnedResources.forEach(res => {
                        const cardHTML = `
                            <a href="${res.url}" class="post-card fade-in visible">
                                <div class="post-thumb">
                                    <div class="post-thumb-gradient" style="background: var(--cream-dark); display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">
                                        ${res.icon || '🔧'}
                                    </div>
                                    <span class="post-thumb-icon">${res.category}</span>
                                </div>
                                <div class="post-body">
                                    <span class="post-cat">${res.category}</span>
                                    <h3>${res.title}</h3>
                                    <p>${res.description}</p>
                                    <div class="post-meta">
                                        <span>Access Tool</span>
                                    </div>
                                </div>
                            </a>
                        `;
                        container.innerHTML += cardHTML;
                    });
                }
            } catch (error) {
                console.error('Error fetching pinned resources:', error);
            }
        }


        document.addEventListener('DOMContentLoaded', () => {
            fetchLatestPosts();
            fetchPinnedResources();
        });