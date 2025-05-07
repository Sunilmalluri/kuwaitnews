/* Ensure the body uses flexbox to push the footer to the bottom */
body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.content-bg {
    flex: 1 0 auto;
}

/* Footer wrapper styles */
.footer-wrapper {
    flex-shrink: 0;
}

/* Container for added side space */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 13rem;
}

/* Main content */
.main-content {
    width: 100%;
}

/* Section Title */
.section-title {
    font-family: 'Ramabhadra', 'Noto Sans Telugu', sans-serif;
    font-size: 1.8rem;
    color: #333;
    margin: 1rem 0;
    border-bottom: 2px solid #007bff;
    padding-bottom: 0.5rem;
}

/* Sub-Section Title */
.sub-section-title {
    font-family: 'Ramabhadra', 'Noto Sans Telugu', sans-serif;
    font-size: 1.4rem;
    color: #333;
    margin: 1.5rem 0 0.5rem;
    border-bottom: 1px solid #d4af37;
    padding-bottom: 0.3rem;
}

/* Featured News Section */
.featured-news {
    margin-bottom: 2rem;
}

.featured-news-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    padding: 1rem 0;
}

.featured-card {
    display: flex;
    flex-direction: row;
    background: #fff;
    border-bottom: 1px solid #d4af37;
    overflow: hidden;
    cursor: pointer;
    min-height: 120px; /* Increased for more content */
}

.featured-image-wrapper {
    flex: 0 0 80px;
    height: 80px;
}

.featured-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.featured-content {
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}

.featured-title {
    font-family: 'Ramabhadra', 'Noto Sans Telugu', sans-serif;
    font-size: 1.1rem; /* Slightly larger */
    font-weight: normal;
    color: #333;
    margin: 0 0 0.5rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Allow 2 lines */
    -webkit-box-orient: vertical;
}

.featured-meta {
    display: none;
    gap: 1rem;
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
}

.featured-meta i {
    margin-right: 0.3rem;
}

.featured-excerpt {
    font-family: 'Noto Sans Telugu', sans-serif;
    font-size: 0.95rem; /* Slightly larger */
    color: #444;
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Increased to 3 lines */
    -webkit-box-orient: vertical;
}

.featured-full-text {
    font-family: 'Noto Sans Telugu', sans-serif;
    font-size: 1rem;
    color: #444;
    line-height: 1.6;
    display: none;
}

.featured-full-text p {
    margin: 0 0 0.5rem;
}

.featured-full-text ul {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0;
}

.featured-full-text li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.3rem;
}

.featured-full-text li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #007bff;
    font-size: 1.2rem;
}

/* Latest News Section */
.latest-news {
    margin-bottom: 2rem;
}

.latest-news-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    padding: 1rem 0;
}

.latest-card {
    display: flex;
    flex-direction: row;
    background: #fff;
    border-bottom: 1px solid #d4af37;
    overflow: hidden;
    cursor: pointer;
    min-height: 120px;
}

.latest-image-wrapper {
    flex: 0 0 80px;
    height: 80px;
}

.latest-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.latest-content {
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}

.latest-title {
    font-family: 'Ramabhadra', 'Noto Sans Telugu', sans-serif;
    font-size: 1.1rem;
    font-weight: normal;
    color: #333;
    margin: 0 0 0.5rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.latest-meta {
    display: none;
    gap: 1rem;
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
}

.latest-meta i {
    margin-right: 0.3rem;
}

.latest-excerpt {
    font-family: 'Noto Sans Telugu', sans-serif;
    font-size: 0.95rem;
    color: #444;
    margin: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.latest-full-text {
    font-family: 'Noto Sans Telugu', sans-serif;
    font-size: 1rem;
    color: #444;
    line-height: 1.6;
    display: none;
}

.latest-full-text p {
    margin: 0 0 0.5rem;
}

.latest-full-text ul {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0;
}

.latest-full-text li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.3rem;
}

.latest-full-text li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #007bff;
    font-size: 1.2rem;
}

/* Gold Price Section */
.gold-price-section {
    margin-bottom: 2rem;
}

.gold-price-date {
    font-family: 'Noto Sans Telugu', sans-serif;
    font-size: 1rem;
    color: #666;
    margin-bottom: 1rem;
}

.gold-price-date i {
    margin-right: 0.3rem;
}

/* Filter Wrapper */
.filter-wrapper {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.filter-wrapper label {
    font-family: 'Noto Sans Telugu', sans-serif;
    font-size: 1rem;
    color: #333;
}

.filter-wrapper select {
    padding: 0.3rem;
    font-family: 'Noto Sans Telugu', sans-serif;
    font-size: 1rem;
    border: 1px solid #d4af37;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
}

.filter-wrapper select:focus {
    outline: 2px solid #007bff;
}

/* Gold Price Tables */
.gold-price-table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-family: 'Noto Sans Telugu', sans-serif;
    margin-bottom: 1.5rem;
}

.gold-price-table th,
.gold-price-table td {
    border: 1px solid #d4af37;
    padding: 0.5rem;
    text-align: center;
    font-size: 0.9rem;
    color: #333;
    transition: background 0.2s ease;
}

.gold-price-table th {
    background: #d4af37;
    color: #fff;
    font-weight: bold;
}

.gold-price-table td {
    background: #fff;
}

.gold-price-table tbody tr:nth-child(even) {
    background: #fff5e6;
}

.gold-price-table tbody tr:hover td {
    background: #fff9e6;
}

.gold-price-table td:first-child {
    background: #f5f5dc;
    font-weight: bold;
}

/* Social Share Buttons */
.social-share {
    display: flex;
    gap: 0.5rem;
    margin: 0.5rem 0 0;
    justify-content: flex-start;
}

.share-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #f0f0f0;
    color: #333;
    text-decoration: none;
    transition: background 0.2s ease, transform 0.2s ease;
}

.share-btn:hover {
    transform: scale(1.1);
}

.share-btn:focus {
    outline: 2px solid #007bff;
}

.share-btn i {
    font-size: 1rem;
}

.share-btn.whatsapp {
    background: #25D366;
    color: #fff;
}

.share-btn.facebook {
    background: #4267B2;
    color: #fff;
}

.share-btn.twitter {
    background: #000000;
    color: #fff;
}

.share-btn.telegram {
    background: #0088cc;
    color: #fff;
}

/* News Grid and Card Styles (for other pages) */
.news-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 0 auto;
    max-width: 1200px;
    padding: 0.5rem 0;
}

.news-card {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    background: #fff;
    border-bottom: 1px solid #d4af37;
    overflow: hidden;
    cursor: pointer;
}

.news-image-wrapper {
    flex: 0 0 80px;
    height: 80px;
}

.news-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.news-content {
    flex: 1;
    padding: 1rem;
}

.news-title {
    font-family: 'Ramabhadra', 'Noto Sans Telugu', sans-serif;
    font-size: 1rem;
    font-weight: normal;
    margin: 0 0 0.5rem;
    color: #333;
}

.news-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
}

.news-card.preview .news-meta {
    display: none;
}

.news-meta i {
    margin-right: 0.3rem;
}

.news-excerpt {
    font-family: 'Noto Sans Telugu', sans-serif;
    font-size: 0.9rem;
    color: #444;
    margin: 0 0 0.5rem;
}

.full-text {
    font-family: 'Noto Sans Telugu', sans-serif;
    font-size: 1rem;
    color: #444;
    line-height: 1.6;
    display: none;
}

.full-text p {
    margin: 0 0 0.5rem;
}

.full-text ul {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0;
}

.full-text li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.3rem;
}

.full-text li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #007bff;
    font-size: 1.2rem;
}

/* Styles for article.html */
.article-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.article-image-wrapper {
    width: 100%;
    max-height: 400px;
    margin-bottom: 1.5rem;
}

.article-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.article-content {
    flex: 1;
    padding: 1rem;
}

.article-title {
    font-family: 'Ramabhadra', 'Noto Sans Telugu', sans-serif;
    font-size: 2rem;
    color: #333;
    margin: 0 0 0.5rem;
}

.article-meta {
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1rem;
}

.article-meta i {
    margin-right: 0.3rem;
}

.article-full-text {
    font-family: 'Noto Sans Telugu', sans-serif;
    font-size: 1rem;
    color: #444;
    line-height: 1.6;
}

.article-full-text p {
    margin: 0 0 0.5rem;
}

.article-full-text ul {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0;
}

.article-full-text li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.3rem;
}

.article-full-text li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #007bff;
    font-size: 1.2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 0 1rem;
    }

    .section-title {
        font-size: 1.5rem;
    }

    .sub-section-title {
        font-size: 1.2rem;
    }

    /* Featured News */
    .featured-news-grid {
        grid-template-columns: 1fr;
    }

    .featured-card {
        display: flex;
        flex-direction: row;
        min-height: auto;
    }

    .featured-image-wrapper {
        flex: 0 0 30%;
        height: auto;
        aspect-ratio: 1/1;
    }

    .featured-image {
        object-fit: cover;
    }

    .featured-content {
        max-height: none;
    }

    .featured-title {
        font-size: 0.9rem;
        font-weight: normal;
        -webkit-line-clamp: 3; /* Allow 3 lines on mobile */
    }

    .featured-excerpt {
        font-size: 0.8rem;
        -webkit-line-clamp: 4; /* Allow 4 lines on mobile */
    }

    .featured-full-text {
        font-size: 0.9rem;
    }

    /* Latest News */
    .latest-news-grid {
        grid-template-columns: 1fr;
    }

    .latest-card {
        display: flex;
        flex-direction: row;
        min-height: auto;
    }

    .latest-image-wrapper {
        flex: 0 0 30%;
        height: auto;
        aspect-ratio: 1/1;
    }

    .latest-image {
        object-fit: cover;
    }

    .latest-content {
        max-height: none;
    }

    .latest-title {
        font-size: 0.9rem;
        font-weight: normal;
        -webkit-line-clamp: 3;
    }

    .latest-excerpt {
        font-size: 0.8rem;
        -webkit-line-clamp: 4;
    }

    .latest-full-text {
        font-size: 0.9rem;
    }

    /* Gold Price Tables */
    .gold-price-table {
        font-size: 0.8rem;
    }

    .gold-price-table th,
    .gold-price-table td {
        padding: 0.3rem;
    }

    .filter-wrapper {
        flex-direction: column;
        align-items: flex-start;
    }

    .filter-wrapper select {
        width: 100%;
        max-width: 200px;
    }

    /* News Grid (for other pages) */
    .news-grid {
        padding: 0.5rem 0;
    }

    .news-card {
        display: flex;
        flex-direction: row;
    }

    .news-image-wrapper {
        flex: 0 0 30%;
        height: auto;
        aspect-ratio: 1/1;
    }

    .news-image {
        object-fit: cover;
    }

    .news-content {
        padding: 0.5rem;
    }

    .news-title {
        font-size: 0.9rem;
        font-weight: normal;
    }

    .news-excerpt, .full-text {
        font-size: 0.8rem;
    }

    /* Article Page */
    .article-container {
        padding: 1rem;
    }

    .article-image-wrapper {
        flex: 0 0 30%;
        max-height: 250px;
    }

    .article-image {
        object-fit: cover;
    }

    .article-title {
        font-size: 1.5rem;
    }

    .social-share {
        gap: 0.4rem;
    }

    .share-btn {
        width: 1.4rem;
        height: 1.4rem;
    }

    .share-btn i {
        font-size: 0.9rem;
    }
}

/* Updated on May 8, 2025: Fixed short preview content and blank card appearance in desktop view */
