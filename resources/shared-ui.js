// Inject CSS Styles for the Web Components
const sharedStyles = `
:root {
  --su-cream: #FAF7F2;
  --su-cream-dark: #F0EBE1;
  --su-earth: #8B6F47;
  --su-charcoal: #2C2825;
  --su-stone: #9A9390;
}

.su-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: rgba(250, 247, 242, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(139, 111, 71, 0.12);
  transition: background-color 0.3s, border-color 0.3s;
  box-sizing: border-box;
  font-family: 'DM Sans', system-ui, sans-serif;
}

html.dark .su-nav {
  background: rgba(44, 40, 37, 0.88);
  border-bottom: 1px solid rgba(154, 147, 144, 0.2);
}

.su-logo {
  color: var(--su-charcoal);
  font-family: 'Lora', Georgia, serif;
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: -0.025em;
  text-decoration: none;
  transition: color 0.15s;
}

html.dark .su-logo {
  color: var(--su-cream);
}

.su-logo:hover, html.dark .su-logo:hover {
  color: var(--su-earth);
}

.su-nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.su-link {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--su-stone);
  text-decoration: none;
  transition: color 0.15s;
}

.su-link:hover {
  color: var(--su-charcoal);
}

html.dark .su-link:hover {
  color: var(--su-cream);
}

.su-theme-btn {
  background: transparent;
  border: none;
  color: var(--su-stone);
  cursor: pointer;
  transition: color 0.15s;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.su-theme-btn:hover {
  color: var(--su-charcoal);
}
html.dark .su-theme-btn:hover {
  color: var(--su-cream);
}
.su-theme-btn i {
  font-size: 1.25rem;
}

.su-icon-sun { display: none; }
.su-icon-moon { display: block; }
html.dark .su-icon-sun { display: block; }
html.dark .su-icon-moon { display: none; }

.su-footer {
  background-color: var(--su-cream);
  border-top: 1px solid var(--su-cream-dark);
  transition: background-color 0.3s, border-color 0.3s;
  margin-top: 2rem;
  padding: 4rem 2rem;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  font-family: 'DM Sans', system-ui, sans-serif;
}

html.dark .su-footer {
  background-color: var(--su-charcoal);
  border-top: 1px solid rgba(154, 147, 144, 0.2);
}

.su-footer-name {
  font-family: 'Lora', Georgia, serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--su-charcoal);
  margin-top: 0;
  margin-bottom: 1.5rem;
}
html.dark .su-footer-name {
  color: var(--su-cream);
}

.su-footer-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.su-footer-link {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--su-charcoal);
  text-decoration: none;
  transition: color 0.15s;
}
html.dark .su-footer-link {
  color: var(--su-cream);
}
.su-footer-link:hover, html.dark .su-footer-link:hover {
  color: var(--su-earth);
}

.su-footer-copy {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--su-stone);
  margin: 0;
}

@media print {
  .su-nav, .su-footer {
    display: none !important;
  }
}
@media (max-width: 640px) {
  .su-nav-resources-link {
    display: none;
  }
}
`;

if (!document.getElementById('shared-ui-styles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'shared-ui-styles';
    styleEl.textContent = sharedStyles;
    document.head.appendChild(styleEl);
}

class SiteHeader extends HTMLElement {
    connectedCallback() {
        const hasTheme = this.hasAttribute('has-theme');
        
        let themeToggleHtml = '';
        if (hasTheme) {
            themeToggleHtml = `
            <button id="theme-toggle" class="su-theme-btn" aria-label="Toggle Dark Mode">
                <i class="fa-solid fa-sun su-icon-sun"></i>
                <i class="fa-solid fa-moon su-icon-moon"></i>
            </button>
            `;
        }

        this.innerHTML = `
        <nav class="su-nav">
            <a href="/" class="su-logo">Wahyu Teguh A.</a>
            <div class="su-nav-right">
                <a href="/#resources" class="su-link su-nav-resources-link">Resources</a>
                ${themeToggleHtml}
            </div>
        </nav>
        `;

        if (hasTheme) {
            const themeToggleBtn = this.querySelector('#theme-toggle');
            const htmlDoc = document.documentElement;
            
            themeToggleBtn.addEventListener('click', () => {
                if (htmlDoc.classList.contains('dark')) {
                    htmlDoc.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                } else {
                    htmlDoc.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                }
                window.dispatchEvent(new Event('theme-changed'));
            });
        }
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="su-footer">
            <p class="su-footer-name">Wahyu Teguh Arifianto</p>
            <ul class="su-footer-links">
                <li><a href="/#about" class="su-footer-link">About</a></li>
                <li><a href="/#expertise" class="su-footer-link">Expertise</a></li>
                <li><a href="/#writing" class="su-footer-link">Writing</a></li>
                <li><a href="/#resources" class="su-footer-link">Resources</a></li>
                <li><a href="/#youtube" class="su-footer-link">YouTube</a></li>
                <li><a href="/#contact" class="su-footer-link">Contact</a></li>
            </ul>
            <p class="su-footer-copy">© 2026 Wahyu Teguh Arifianto · wahyuteguh.com</p>
        </footer>
        `;
    }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
