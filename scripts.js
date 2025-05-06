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

async function fetchDataFile(articleId) {
    const categoryMap = {
        'ind': '/data/news-national.js',
        'national': '/data/news-national.js',
        'international': '/data/news-international.js',
        'gulf': '/data/news-gulf.js',
        'home': '/data/home-news.js'
    };

    let category = 'home';
    if (articleId.startsWith('ind') || articleId.startsWith('national')) category = 'national';
    else if (articleId.startsWith('international')) category = 'international';
    else if (articleId.startsWith('gulf')) category = 'gulf';
    else if (articleId.startsWith('home')) category = 'home';

    const dataFile = categoryMap[category] || '/data/home-news.js';
    try {
        const response = await fetch(dataFile);
        if (!response.ok) throw new Error(`Failed to load ${dataFile}: ${response.statusText}`);
        const script = await response.text();
        const scriptElement = document.createElement('script');
        scriptElement.textContent = script;
        document.head.appendChild(scriptElement);
        return true;
    } catch (error) {
        console.error('Error loading data file:', error.message);
        return false;
    }
}

async function fetchNews(category = null, subCategory = null, retries = 5, delay = 200) {
    for (let i = 0; i < retries; i++) {
        try {
            if (typeof window.newsData === 'undefined' || !Array.isArray(window.newsData)) {
                console.warn(`Attempt ${i + 1}/${retries}: newsData is not defined or not an array. Waiting ${delay}ms...`);
                if (i === retries - 1) {
                    console.error('newsData is not defined or not an array after all retries.');
                    throw new Error('newsData is not available.');
                }
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            console.log('newsData loaded successfully:', window.newsData);
            let filteredData = window.newsData;
            if (category) {
                filteredData = filteredData.filter(article => 
                    article.category && category && 
                    article.category.toLowerCase() === category.toLowerCase()
                );
            }
            if (subCategory && subCategory !== 'All') {
                filteredData = filteredData.filter(article => 
                    article.subCategory && subCategory && 
                    article.subCategory.toLowerCase() === subCategory.toLowerCase()
                );
            }
            return filteredData;
        } catch (error) {
            console.error('Error fetching news:', error.message);
            return [];
        }
    }
    return [];
}

function generateSocialShare(articleId) {
    const article = window.newsData ? window.newsData.find(a => a.id === articleId) : null;
    if (!article) {
        console.warn(`Article with ID ${articleId} not found for social share generation.`);
        return '';
    }

    const articleUrl = `${window.location.origin}${window.location.pathname}?id=${article.id}`;
    const encodedTitle = encodeURIComponent(article.title);
    const encodedUrl = encodeURIComponent(articleUrl);
    return `
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
}

async function fetchGoldPriceIndia(retries = 3, delay = 100) {
    for (let i = 0; i < retries; i++) {
        try {
            if (typeof window.goldPriceIndiaData === 'undefined' || !Array.isArray(window.goldPriceIndiaData)) {
                if (i === retries - 1) {
                    throw new Error('goldPriceIndiaData is not defined or not an array after retries.');
                }
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            return window.goldPriceIndiaData;
        } catch (error) {
            console.error('Error fetching India gold price data:', error.message);
            return [];
        }
    }
    return [];
}

async function fetchGoldPriceGulf(retries = 3, delay = 100) {
    for (let i = 0; i < retries; i++) {
        try {
            if (typeof window.goldPriceGulfData === 'undefined' || !Array.isArray(window.goldPriceGulfData)) {
                if (i === retries - 1) {
                    throw new Error('goldPriceGulfData is not defined or not an array after retries.');
                }
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            return window.goldPriceGulfData;
        } catch (error) {
            console.error('Error fetching Gulf gold price data:', error.message);
            return [];
        }
    }
    return [];
}

function renderGoldTables(goldType = '22K') {
    const indiaTableBody = document.querySelector('.gold-price-table-body-india');
    const gulfTableBody = document.querySelector('.gold-price-table-body-gulf');
    const dateElement = document.querySelector('#gold-price-date');

    if (!indiaTableBody || !gulfTableBody || !dateElement) {
        console.error('Table bodies or date element not found');
        return;
    }

    Promise.all([fetchGoldPriceIndia(), fetchGoldPriceGulf()]).then(([indiaPrices, gulfPrices]) => {
        if (indiaPrices.length > 0) {
            dateElement.textContent = indiaPrices[0].date;
        } else if (gulfPrices.length > 0) {
            dateElement.textContent = gulfPrices[0].date;
        } else {
            dateElement.textContent = 'N/A';
        }

        if (indiaPrices.length === 0) {
            indiaTableBody.innerHTML = '<tr><td colspan="3">భారతదేశ బంగారం ధరలు అందుబాటులో లేవు.</td></tr>';
        } else {
            indiaTableBody.innerHTML = indiaPrices.map(price => `
                <tr>
                    <td>${price.location}</td>
                    <td>${price.currencySymbol}${price[`price_${goldType.toLowerCase()}_1g`]}</td>
                    <td>${price.currencySymbol}${price[`price_${goldType.toLowerCase()}_10g`]}</td>
                </tr>
            `).join('');
        }

        if (gulfPrices.length === 0) {
            gulfTableBody.innerHTML = '<tr><td colspan="4">గల్ఫ్ దేశాల బంగారం ధరలు అందుబాటులో లేవు.</td></tr>';
        } else {
            gulfTableBody.innerHTML = gulfPrices.map(price => `
                <tr>
                    <td>${price.location}</td>
                    <td>${price.currencySymbol}${price[`price_${goldType.toLowerCase()}_1g`]}</td>
                    <td>${price.currencySymbol}${price[`price_${goldType.toLowerCase()}_10g`]}</td>
                    <td>₹${price[`price_${goldType.toLowerCase()}_10g_inr`]}</td>
                </tr>
            `).join('');
        }
    }).catch(error => {
        console.error('Error rendering gold tables:', error);
        indiaTableBody.innerHTML = '<tr><td colspan="3">భారతదేశ బంగారం ధరలు అందుబాటులో లేవు.</td></tr>';
        gulfTableBody.innerHTML = '<tr><td colspan="4">గల్ఫ్ దేశాల బంగారం ధరలు అందుబాటులో లేవు.</td></tr>';
    });
}

function updateGoldTables() {
    const goldTypeFilter = document.querySelector('#gold-type-filter');
    if (goldTypeFilter) {
        const selectedGoldType = goldTypeFilter.value;
        renderGoldTables(selectedGoldType);
    }
}

async function renderGoldPrice() {
    renderGoldTables('22K');
}

async function renderNews(category = null, subCategory = null) {
    const newsContainer = document.querySelector('.news-grid');
    if (!newsContainer) {
        console.error('News container (.news-grid) not found');
        return;
    }

    const articles = await fetchNews(category, subCategory);
    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>వార్తలు అందుబాటులో లేవు. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.</p>';
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
        return `
            <article class="news-card preview" id="${article.id}" tabindex="0">
                <div class="news-image-wrapper">
                    <img src="${article.image}" alt="${article.alt}" class="news-image" loading="lazy">
                </div>
                <div class="news-content">
                    <h3 class="news-title">${article.title}</h3>
                    <div class="news-meta">
                        <span><i class="far fa-calendar-alt"></i> ${article.date}</span>
                        <span><i class="far fa-clock"></i> ${article.time}</span>
                    </div>
                    <div class="full-text">${fullText}</div>
                </div>
            </article>
        `;
    }).join('');

    document.querySelectorAll('.news-card').forEach(card => {
        card.addEventListener('click', () => {
            const articleId = card.id;
            window.location.href = `/article.html?id=${articleId}`;
        });
    });
}

async function renderHomeNews() {
    const featuredContainer = document.querySelector('.featured-news-grid');
    const latestContainer = document.querySelector('.latest-news-grid');
    if (!featuredContainer || !latestContainer) {
        console.error('Featured or latest news container not found');
        featuredContainer && (featuredContainer.innerHTML = '<p>ఫీచర్డ్ వార్తలు లోడ్ కాలేదు.</p>');
        latestContainer && (latestContainer.innerHTML = '<p>తాజా వార్తలు లోడ్ కాలేదు.</p>');
        return;
    }

    const articles = await fetchNews();
    if (articles.length === 0) {
        featuredContainer.innerHTML = '<p>వార్తలు అందుబాటులో లేవు. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.</p>';
        latestContainer.innerHTML = '<p>వార్తలు అందుబాటులో లేవు. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.</p>';
        return;
    }

    let featuredArticles = articles.filter(article => article.featured === true);
    let latestArticles = articles.filter(article => !article.featured);

    if (featuredArticles.length === 0) {
        featuredArticles = [articles[0]];
        latestArticles = articles.slice(1);
    }

    featuredContainer.innerHTML = featuredArticles.map(article => {
        const fullText = article.fullText
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n- /g, '</li><li>')
            .replace(/\n/g, ' ')
            .replace(/<li>/, '<ul><li>')
            .replace(/<\/li>$/, '</li></ul>')
            .replace(/^/, '<p>')
            .replace(/$/, '</p>');
        return `
            <article class="featured-card preview" id="${article.id}" tabindex="0">
                <div class="featured-image-wrapper">
                    <img src="${article.image}" alt="${article.alt}" class="featured-image" loading="lazy">
                </div>
                <div class="featured-content">
                    <h3 class="featured-title">${article.title}</h3>
                    <div class="featured-meta">
                        <span><i class="far fa-calendar-alt"></i> ${article.date}</span>
                        <span><i class="far fa-clock"></i> ${article.time}</span>
                    </div>
                    <div class="featured-full-text">${fullText}</div>
                </div>
            </article>
        `;
    }).join('');

    latestContainer.innerHTML = latestArticles.map(article => {
        const fullText = article.fullText
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n- /g, '</li><li>')
            .replace(/\n/g, ' ')
            .replace(/<li>/, '<ul><li>')
            .replace(/<\/li>$/, '</li></ul>')
            .replace(/^/, '<p>')
            .replace(/$/, '</p>');
        return `
            <article class="latest-card preview" id="${article.id}" tabindex="0">
                <div class="latest-image-wrapper">
                    <img src="${article.image}" alt="${article.alt}" class="latest-image" loading="lazy">
                </div>
                <div class="latest-content">
                    <h3 class="latest-title">${article.title}</h3>
                    <div class="latest-meta">
                        <span><i class="far fa-calendar-alt"></i> ${article.date}</span>
                        <span><i class="far fa-clock"></i> ${article.time}</span>
                    </div>
                    <div class="latest-full-text">${fullText}</div>
                </div>
            </article>
        `;
    }).join('');

    document.querySelectorAll('.featured-card, .latest-card').forEach(card => {
        card.addEventListener('click', () => {
            const articleId = card.id;
            window.location.href = `/article.html?id=${articleId}`;
        });
    });
}

async function renderArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const articleContainer = document.querySelector('.article-container');

    if (!articleContainer || !articleId) {
        console.error('Article container or ID not found', { articleContainer, articleId });
        if (articleContainer) {
            articleContainer.innerHTML = '<p>వార్తను లోడ్ చేయడంలో లోపం ఏర్పడింది.</p>';
        }
        return;
    }

    console.log('Attempting to fetch article with ID:', articleId);

    await fetchDataFile(articleId);

    const articles = await fetchNews();
    if (articles.length === 0) {
        console.error('No articles found in newsData');
        articleContainer.innerHTML = '<p>వార్తలు అందుబాటులో లేవు. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.</p>';
        return;
    }

    console.log('Available articles:', articles.map(a => a.id));
    const article = articles.find(a => a.id === articleId);

    if (!article) {
        console.warn(`Article with ID ${articleId} not found in newsData`);
        articleContainer.innerHTML = '<p>వార్త కనుగొనబడలేదు.</p>';
        return;
    }

    const fullText = article.fullText
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n- /g, '</li><li>')
        .replace(/\n/g, ' ')
        .replace(/<li>/, '<ul><li>')
        .replace(/<\/li>$/, '</li></ul>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>');

    articleContainer.innerHTML = `
        <div class="article-image-wrapper">
            <img src="${article.image}" alt="${article.alt}" class="article-image" loading="lazy">
        </div>
        <div class="article-content">
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta">
                <span><i class="far fa-calendar-alt"></i> ${article.date}</span>
                <span><i class="far fa-clock"></i> ${article.time}</span>
            </div>
            <div class="article-full-text">${fullText}</div>
            ${generateSocialShare(articleId)}
        </div>
    `;
}

function updateTeluguDate() {
    const teluguMonths = ['జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్', 
                         'జులై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్'];
    
    const teluguDays = ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 
                       'గురువారం', 'శుక్రవారం', 'శనివారం'];
    
    const today = new Date();
    const dateStr = `${today.getDate()} ${teluguMonths[today.getMonth()]} ${today.getFullYear()}, ${teluguDays[today.getDay()]}`;
    
    const dateElement = document.getElementById('telugu-date');
    if (dateElement) {
        dateElement.textContent = dateStr;
        dateElement.style.display = 'block'; // Ensure visibility
    } else {
        console.warn('telugu-date element not found');
    }
}

async function loadCommonComponents() {
    try {
        const existingWrapper = document.querySelector('.top-wrapper');
        if (existingWrapper) existingWrapper.remove();

        document.body.insertAdjacentHTML('afterbegin', `<div class="top-wrapper"></div>`);

        const headerLoaded = await loadComponent('/includes/header.html', '.top-wrapper');
        if (!headerLoaded) throw new Error('Header failed to load');

        // Call updateTeluguDate after header is injected
        updateTeluguDate();
        console.log('updateTeluguDate called after header load');

        const navLoaded = await loadComponent('/includes/navigation.html', '.top-wrapper');
        if (!navLoaded) throw new Error('Navigation failed to load');

        const footerWrapper = document.querySelector('.footer-wrapper');
        if (footerWrapper) {
            const footerLoaded = await loadComponent('/includes/footer.html', '.footer-wrapper');
            if (!footerLoaded) throw new Error('Footer failed to load');
            console.log('Footer loaded successfully');
        } else {
            console.warn('Footer wrapper (.footer-wrapper) not found; skipping footer load');
        }

        const menuBtn = document.querySelector('.menu-btn');
        const navMenuToggle = document.querySelector('.nav-menu-toggle');
        if (menuBtn && navMenuToggle && window.innerWidth < 769) {
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
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown') && !e.target.closest('.menu-btn')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('open');
                });
            }
        });

        const navContainer = document.querySelector('.nav-container');
        const navPlaceholder = document.querySelector('.nav-placeholder');
        const header = document.querySelector('.header-bg');
        const contentBg = document.querySelector('.content-bg');
        if (navContainer && navPlaceholder && header && contentBg) {
            const debounce = (func, wait) => {
                let timeout;
                return () => {
                    clearTimeout(timeout);
                    timeout = setTimeout(func, wait);
                };
            };

            const updateStickyNav = () => {
                const headerHeight = header.offsetHeight;
                const navHeight = navContainer.offsetHeight;
                navPlaceholder.style.height = `${navHeight}px`;
                contentBg.style.paddingTop = `1px`;
                console.log('Header height:', headerHeight, 'Nav height:', navHeight, 'Placeholder height:', navHeight, 'Content padding-top:', '1px');
                if (window.scrollY >= headerHeight) {
                    navContainer.classList.add('sticky');
                } else {
                    navContainer.classList.remove('sticky');
                }
            };

            window.addEventListener('scroll', debounce(updateStickyNav, 10));
            window.addEventListener('resize', debounce(updateStickyNav, 10));
            updateStickyNav();
        }

        const pageCategory = document.body.dataset.category || null;
        const pageSubCategory = document.body.dataset.subcategory || null;
        if (pageCategory === 'Home') {
            renderHomeNews();
        } else if (pageCategory === 'gold-price') {
            renderGoldPrice();
        } else if (pageCategory === 'article') {
            renderArticle();
        } else {
            renderNews(pageCategory, pageSubCategory);
        }
    } catch (error) {
        console.error('Error in loadCommonComponents:', error);
        document.querySelector('.main-content')?.insertAdjacentHTML('beforeend', '<p>కంటెంట్ లోడ్ చేయడంలో లోపం ఏర్పడింది. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.</p>');
    }
}

const style = document.createElement('style');
style.textContent = `
    .top-wrapper {
        width: 100%;
        position: relative;
        z-index: 1000;
        margin: 0;
        padding: 0;
    }
    .loading-message {
        font-family: 'Noto Sans Telugu', sans-serif;
        font-size: 1rem;
        color: #666;
        text-align: center;
        padding: 1rem;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    loadCommonComponents();
});

document.addEventListener('DOMContentLoaded', function() {
  const adSection = document.createElement('div');
  adSection.className = 'birthday-ad';
  adSection.innerHTML = `
    <div class="ad-image-wrapper">
      <img src="https://github.com/Sunilmalluri/kuwaitnews/raw/main/images/helen.jpeg" alt="Helen's 38th Birthday" class="ad-image">
    </div>
    <div class="ad-content">
      <h3>Birthday</h3>
      <p>Celebrate with Helen - 38!</p>
    </div>
  `;
  document.querySelector('.main-content').insertBefore(adSection, document.querySelector('.featured-news'));
});
