<div class="nav-container">
    <nav>
        <div class="menu-wrapper">
            <button class="menu-btn" aria-label="Toggle vertical menu">
                <i class="fas fa-bars"></i>
            </button>
            <ul class="nav-menu-horizontal" id="horizontalMenu">
                <li><a href="/kuwaitnews/index.html" class="nav-link">హోమ్</a></li>
                <li class="dropdown">
                    <a href="#" class="nav-link dropdown-toggle">వార్తలు <i class="fas fa-caret-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="/kuwaitnews/news/kuwait.html" class="nav-link">కువైట్</a></li>
                        <li><a href="/kuwaitnews/news/andhra-pradesh.html" class="nav-link">ఆంధ్రప్రదేశ్</a></li>
                        <li><a href="/kuwaitnews/news/telangana.html" class="nav-link">తెలంగాణ</a></li>
                        <li><a href="/kuwaitnews/news/india.html" class="nav-link">భారత</a></li>
                    </ul>
                </li>
                <li><a href="/kuwaitnews/sports.html" class="nav-link">క్రీడలు</a></li>
                <li><a href="/kuwaitnews/gold-price.html" class="nav-link">గోల్డ్ ధర</a></li>
                <li><a href="/kuwaitnews/money-exchange-rate.html" class="nav-link">మనీ ఎక్స్ఛేంజ్ రేటు</a></li>
            </ul>
        </div>

        <!-- Vertical toggle menu -->
        <ul class="nav-menu-toggle" id="toggleMenu">
            <li><a href="/kuwaitnews/index.html" class="nav-link">హోమ్</a></li>
            <li class="dropdown">
                <a href="#" class="nav-link dropdown-toggle">వార్తలు <i class="fas fa-caret-right"></i></a>
                <ul class="dropdown-menu">
                    <li><a href="/kuwaitnews/news/kuwait.html" class="nav-link">కువైట్</a></li>
                    <li><a href="/kuwaitnews/news/andhra-pradesh.html" class="nav-link">ఆంధ్రప్రదేశ్</a></li>
                    <li><a href="/kuwaitnews/news/telangana.html" class="nav-link">తెలంగాణ</a></li>
                    <li><a href="/kuwaitnews/news/india.html" class="nav-link">భారత</a></li>
                </ul>
            </li>
            <li><a href="/kuwaitnews/sports.html" class="nav-link">క్రీడలు</a></li>
            <li><a href="/kuwaitnews/gold-price.html" class="nav-link">గోల్డ్ ధర</a></li>
            <li><a href="/kuwaitnews/money-exchange-rate.html" class="nav-link">మనీ ఎక్స్ఛేంజ్ రేటు</a></li>
        </ul>
    </nav>
</div>

<style>
    /* Base Navigation Styles */
    .nav-container {
        background: #333333;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        width: 100%;
        position: relative;
        z-index: 1000;
        overflow: visible;
    }

    nav {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0.5rem 1rem;
    }

    .menu-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background: #333333;
        padding: 0.5rem 0;
        position: relative;
        min-height: 48px; /* Ensure enough space for dropdown positioning */
    }

    .menu-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #ffffff;
        padding: 0.5rem;
        margin-right: 1rem;
    }

    .nav-menu-horizontal,
    .nav-menu-toggle {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .nav-menu-horizontal {
        display: flex;
        gap: 6px;
    }

    .nav-menu-toggle {
        display: none;
        flex-direction: column;
        background: #333333;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.4s ease, opacity 0.4s ease;
        opacity: 0;
        width: 100%;
    }

    .nav-menu-toggle.active {
        display: flex;
        max-height: 700px;
        opacity: 1;
    }

    .nav-link {
        font-family: 'Noto Sans Telugu', 'Open Sans', sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        color: #ffffff;
        text-decoration: none;
        padding: 0.6rem 1rem;
        display: block;
        border-radius: 4px;
        white-space: nowrap;
    }

    .nav-link:hover,
    .nav-link.active {
        background: rgba(255, 255, 255, 0.1);
    }

    .dropdown {
        position: relative;
    }

    .dropdown-toggle {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
    }

    .dropdown-menu {
        display: none;
        background: #4a4a4a;
        border-radius: 4px;
        list-style: none;
        padding: 0.5rem 0;
        z-index: 1001;
        min-width: 180px;
    }

    .dropdown.open .dropdown-menu {
        display: block;
    }

    .dropdown-menu .nav-link {
        padding: 0.5rem 1rem;
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
        .menu-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
        }

        .menu-btn {
            display: block;
            flex-shrink: 0;
        }

        .nav-menu-horizontal {
            display: flex;
            gap: 4px;
            flex-wrap: nowrap;
            overflow-x: auto;
            white-space: nowrap;
        }

        .nav-menu-horizontal::-webkit-scrollbar {
            height: 4px;
        }

        .nav-menu-horizontal::-webkit-scrollbar-thumb {
            background: #4a4a4a;
            border-radius: 4px;
        }

        .nav-menu-horizontal::-webkit-scrollbar-track {
            background: #333333;
        }

        .nav-menu-horizontal .nav-link {
            font-size: 0.85rem;
            padding: 0.5rem 0.8rem;
        }

        .nav-menu-horizontal .dropdown-menu {
            position: absolute;
            top: 48px; /* Match .menu-wrapper min-height to position below header */
            left: 0;
            min-width: 100%;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 1001;
        }

        .nav-menu-horizontal .dropdown.open .dropdown-menu {
            display: block;
            position: absolute;
            top: 48px;
            left: 0;
            margin: 0;
            z-index: 1001;
        }

        ul.nav-menu-toggle li.dropdown.open > .dropdown-menu {
            display: block;
            position: relative;
            top: 0;
            left: 0;
            padding: 0.5rem 0;
            min-width: 100%;
            box-shadow: none;
        }

        .dropdown-menu .nav-link {
            padding: 0.4rem 1rem;
        }
    }

    @media (min-width: 769px) {
        .nav-menu-horizontal {
            display: flex;
        }

        .nav-menu-toggle {
            display: none;
        }
    }
</style>
