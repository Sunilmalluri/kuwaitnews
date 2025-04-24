async function loadComponent(url, targetElement, position = 'beforeend') {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${url}: ${response.statusText}`);
        const html = await response.text();
        const target = document.querySelector(targetElement);
        if (!target) throw new Error(`Target element '${targetElement}' not found`);
        target.insertAdjacentHTML(position, html);
        return true;
    } catch (error) {
        console.error('Error loading component:', error.message);
        return false;
    }
}

async function fetchNews(category = null, retries = 3, delay = 100) {
    for (let i = 0; i < retries; i++) {
        try {
            if (typeof window.newsData === 'undefined' || !Array.isArray(window.newsData)) {
                if (i === retries - 1) {
                    throw new Error('newsData is not defined or not an array after retries.');
                }
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            return category ? window.newsData.filter(article => article.category === category) : window.newsData;
        } catch (error) {
            console.error('Error fetching news:', error.message);
            return [];
        }
    }
    return [];
}

async function renderNews(category = null) {
    const newsContainer = document.querySelector('.news-grid');
    if (!newsContainer) {
        console.error('News container (.news-grid) not found');
        return;
    }

    const articles = await fetchNews(category);
    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>వార్తలు అందుబాటులో లేవు.</p>';
        return;
    }

    newsContainer.innerHTML = articles.map(article => {
        const fullText = article.fullText
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n- /g, '</li><li>')
            .replace(/\n/g, ' ')
            .replace(/<li>/, '<ul><li>')
            .replace(/<\/li>$/, '</li></ul>')
            .replace(/^/, '<p>')
            .replace(/$/, '</p>');
        const articleUrl = `${window.location.origin}/news/andhra-pradesh.html#${article.id}`;
        const encodedTitle = encodeURIComponent(article.title);
        const encodedUrl = encodeURIComponent(articleUrl);
        const socialShare = `
            <div class="social-share">
                <a href="https://wa.me/?text=${encodedTitle}%20${encodedUrl}" class="share-btn whatsapp" target="_blank" aria-label="Share on WhatsApp" tabindex="0">
                    <i class="fab fa-whatsapp"></i>
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}" class="share-btn facebook" target="_blank" aria-label="Share on Facebook" tabindex="0">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}" class="share-btn twitter" target="_blank" aria-label="Share on Twitter" tabindex="0">
                    <svg class="x-icon" viewBox="0 0 24 24" width="1rem" height="1rem" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
</svg>
                </a>
                <a href="https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}" class="share-btn telegram" target="_blank" aria-label="Share on Telegram" tabindex="0">
                    <i class="fab fa-telegram-plane"></i>
                </a>
            </div>
        `;
        return `
            <article class="news-card preview" id="${article.id}" tabindex="0" aria-expanded="false">
                <div class="news-image-wrapper">
                    <img src="${article.image}" alt="${article.alt}" class="news-image" loading="lazy">
                </div>
                <div class="news-content">
                    <h3 class="news-title">${article.title}</h3>
                    <div class="news-meta">
                        <span><i class="far fa-calendar-alt"></i> ${article.date}</span>
                        <span><i class="far fa-clock"></i> ${article.time}</span>
                    </div>
                    <p class="news-excerpt">${article.excerpt}</p>
                    <div class="full-text">${fullText}</div>
                    ${socialShare}
                </div>
            </article>
        `;
    }).join('');

    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('click', () => {
            const fullText = card.querySelector('.full-text');
            const imageWrapper = card.querySelector('.news-image-wrapper');
            const isExpanded = card.getAttribute('aria-expanded') === 'true';
            fullText.style.display = isExpanded ? 'none' : 'block';
            card.setAttribute('aria-expanded', !isExpanded);
            card.classList.toggle('preview', isExpanded);
            card.classList.toggle('expanded', !isExpanded);
            imageWrapper.classList.toggle('expanded', !isExpanded);
        });
    });
}

async function loadCommonComponents() {
    try {
        const existingWrapper = document.querySelector('.top-wrapper');
        if (existingWrapper) existingWrapper.remove();

        document.body.insertAdjacentHTML('afterbegin', `<div class="top-wrapper"></div>`);

        const headerLoaded = await loadComponent('/includes/header.html', '.top-wrapper');
        if (!headerLoaded) throw new Error('Header failed to load');

        const navLoaded = await loadComponent('/includes/navigation.html', '.top-wrapper');
        if (!navLoaded) throw new Error('Navigation failed to load');

        const menuBtn = document.querySelector('.menu-btn');
        const navMenuToggle = document.querySelector('.nav-menu-toggle');
        if (menuBtn && navMenuToggle) {
            menuBtn.addEventListener('click', () => {
                const isActive = navMenuToggle.classList.toggle('active');
                menuBtn.setAttribute('aria-expanded', isActive);
                menuBtn.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
                if (isActive) {
                    document.querySelectorAll('.nav-menu-horizontal .dropdown').forEach(dropdown => {
                        dropdown.classList.remove('open');
                    });
                }
            });

            if (window.innerWidth >= 769) {
                menuBtn.addEventListener('mouseenter', () => {
                    navMenuToggle.classList.add('active');
                    menuBtn.setAttribute('aria-expanded', 'true');
                    menuBtn.innerHTML = '<i class="fas fa-times"></i>';
                    document.querySelectorAll('.nav-menu-horizontal .dropdown').forEach(dropdown => {
                        dropdown.classList.remove('open');
                    });
                });

                menuBtn.addEventListener('mouseleave', () => {
                    if (!navMenuToggle.classList.contains('active')) {
                        navMenuToggle.classList.remove('active');
                        menuBtn.setAttribute('aria-expanded', 'false');
                        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });

                navMenuToggle.addEventListener('mouseleave', () => {
                    if (!menuBtn.matches(':hover')) {
                        navMenuToggle.classList.remove('active');
                        menuBtn.setAttribute('aria-expanded', 'false');
                        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                        document.querySelectorAll('.nav-menu-toggle .dropdown').forEach(dropdown => {
                            dropdown.classList.remove('open');
                        });
                    }
                });
            }
        }

        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const dropdown = toggle.closest('.dropdown');
                e.preventDefault();
                if (dropdown) {
                    document.querySelectorAll('.dropdown').forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('open');
                        }
                    });
                    dropdown.classList.toggle('open');
                    if (dropdown.closest('.nav-menu-horizontal') && dropdown.classList.contains('open')) {
                        navMenuToggle.classList.remove('active');
                        menuBtn.setAttribute('aria-expanded', 'false');
                        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });

        if (window.innerWidth >= 769) {
            const horizontalDropdowns = document.querySelectorAll('.nav-menu-horizontal .dropdown');
            horizontalDropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseleave', () => {
                    dropdown.classList.remove('open');
                });
            });
        }

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown') && !e.target.closest('.menu-btn')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('open');
                });
            }
        });

        const pageCategory = document.body.dataset.category || null;
        renderNews(pageCategory);
    } catch (error) {
        console.error('Error in loadCommonComponents:', error);
    }
}

const style = document.createElement('style');
style.textContent = `
    .top-wrapper {
        width: 100%;
        position: relative;
        z-index: 1000;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    loadCommonComponents();
});
