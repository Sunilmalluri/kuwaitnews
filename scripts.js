// Function to load HTML components (header/nav)
async function loadComponent(url, targetElement, position = 'beforeend') {
    try {
        console.log(`Attempting to load ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.statusText}`);
        }
        const html = await response.text();
        const target = document.querySelector(targetElement);
        if (!target) {
            throw new Error(`Target element '${targetElement}' not found`);
        }
        target.insertAdjacentHTML(position, html);
        console.log(`Successfully loaded ${url}`);
        return true;
    } catch (error) {
        console.error('Error loading component:', error.message);
        return false;
    }
}

// Main function to load components with retry mechanism
async function loadCommonComponents() {
    try {
        // Clear any existing top-wrapper to prevent duplicates
        const existingWrapper = document.querySelector('.top-wrapper');
        if (existingWrapper) existingWrapper.remove();

        // Create a single wrapper with menu-btn as a direct child
        document.body.insertAdjacentHTML('afterbegin', `
            <div class="top-wrapper">
                <button class="menu-btn" aria-label="Toggle navigation">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        `);
        const wrapper = document.querySelector('.top-wrapper');

        // Load header
        const headerLoaded = await loadComponent('/kuwaitnews/includes/header.html', '.top-wrapper', 'beforeend');
        if (!headerLoaded) throw new Error('Header failed to load');

        // Load navigation
        const navLoaded = await loadComponent('/kuwaitnews/includes/navigation.html', '.top-wrapper', 'beforeend');
        if (!navLoaded) throw new Error('Navigation failed to load');

        // Wait briefly for DOM to update
        await new Promise(resolve => setTimeout(resolve, 100));

        // Initialize mobile menu toggle
        const menuBtn = document.querySelector('.menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        if (menuBtn && navMenu) {
            console.log('Menu button and nav menu found, initializing toggle');
            menuBtn.addEventListener('click', () => {
                const isActive = navMenu.classList.toggle('active');
                menuBtn.setAttribute('aria-expanded', isActive);
                menuBtn.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
                document.body.classList.toggle('nav-open');
            });
        } else {
            console.warn('Mobile menu elements not found:', { menuBtn: !!menuBtn, navMenu: !!navMenu });
        }

        // Initialize search bar toggle
        const searchToggle = document.querySelector('.search-toggle');
        const searchBar = document.querySelector('.search-bar');
        if (searchToggle && searchBar) {
            console.log('Search toggle and bar found, initializing');
            searchToggle.addEventListener('click', () => {
                searchBar.classList.toggle('active');
            });
        } else {
            console.warn('Search bar elements not found:', { searchToggle: !!searchToggle, searchBar: !!searchBar });
        }

        document.dispatchEvent(new Event('commonComponentsLoaded'));
        console.log('Common components loaded successfully');
    } catch (error) {
        console.error('Error in loadCommonComponents:', error);
    }
}

// Add styling for both views
const style = document.createElement('style');
style.textContent = `
    .top-wrapper {
        width: 100%;
        background: linear-gradient(135deg, #CE1126, #007A3D);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header-bg {
        background: transparent;
        width: 100%;
        height: 100%;
    }
    .menu-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: white;
        padding: 0;
        display: none;
    }
    .menu-btn i {
        display: block;
    }
    @media (max-width: 768px) {
        .top-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0.5rem;
            position: relative;
            min-height: 70px; /* Increased from 60px */
        }
        .menu-btn {
            display: block;
            order: -1;
            margin-right: 0.25rem;
        }
        .header-container {
            flex-grow: 1;
            justify-content: center;
            align-items: center;
            gap: 5px;
            order: 0;
        }
        .logo-container {
            flex-direction: column;
            align-items: center;
            max-width: 200px;
        }
        .site-title {
            font-size: 1.2rem;
            white-space: nowrap;
            margin: 0;
        }
        .site-tagline {
            font-size: 0.85rem; /* Increased from 0.8rem */
            color: rgba(255, 255, 255, 0.8);
            margin: 0;
            white-space: nowrap;
        }
        .nav-container {
            background: transparent;
            padding: 0;
            order: 1;
        }
        nav {
            display: flex;
            justify-content: flex-end;
        }
        .search-bar {
            margin-left: 0.25rem;
            min-width: 30px;
        }
    }
    @media (min-width: 769px) {
        .top-wrapper {
            display: block;
        }
        .header-container {
            justify-content: center;
        }
        .nav-container {
            margin-top: 0;
        }
    }
`;
document.head.appendChild(style);

// Start the process
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded, starting component load');
    loadCommonComponents();
});
