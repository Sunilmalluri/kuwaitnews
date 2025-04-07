<!DOCTYPE html>
<html lang="te">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="ఆంధ్రప్రదేశ్ మరియు తెలంగాణలోని తాజా వార్తలు - కువైట్ తెలుగు వార్తలు">
    <meta name="keywords" content="తెలుగు రాష్ట్రాలు, ఆంధ్రప్రదేశ్, తెలంగాణ, వార్తలు">
    <title>తెలుగు రాష్ట్రాల వార్తలు - కువైట్ తెలుగు వార్తలు</title>
    <link rel="stylesheet" href="/kuwaitnews/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        /* Custom styles for news content */
        .state-tabs {
            margin: 1rem 0;
            display: flex;
            gap: 1rem;
        }
        .tab-btn {
            background-color: var(--kuwait-green);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s;
        }
        .tab-btn:hover, .tab-btn.active {
            background-color: var(--primary);
        }
        .news-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin: 1rem 0;
        }
        .news-card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .news-img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        .news-content {
            padding: 1rem;
        }
        .news-title {
            color: var(--primary);
            font-size: 1.2rem;
            margin: 0 0 0.5rem;
        }
        .news-meta span {
            margin-right: 1rem;
            color: #666;
            font-size: 0.9rem;
        }
        .news-excerpt {
            margin: 0.5rem 0;
            color: var(--dark);
        }
        .read-more {
            color: var(--secondary);
            text-decoration: none;
            font-weight: bold;
        }
        .read-more:hover {
            color: var(--accent);
        }
        @media (max-width: 768px) {
            .news-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation will be injected here via scripts.js -->
    <div class="container">
        <main class="main-content">
            <section class="news-section">
                <h2 class="section-title">తెలుగు రాష్ట్రాల వార్తలు</h2>
                <p class="news-meta">నవీకరణ తేదీ: 04-04-2025 | సమయం: 03:30 PM</p>

                <!-- State Tabs -->
                <div class="state-tabs">
                    <button class="tab-btn active" data-state="andhra">ఆంధ్రప్రదేశ్</button>
                    <button class="tab-btn" data-state="telangana">తెలంగాణ</button>
                </div>

                <!-- News Grid -->
                <div class="news-grid">
                    <!-- News Item 1 -->
                    <article class="news-card" data-state="andhra">
                        <img src="/kuwaitnews/images/news5.jpg" alt="News" class="news-img">
                        <div class="news-content">
                            <h3 class="news-title">ఆంధ్రప్రదేశ్‌లో కొత్త ప్రాజెక్ట్</h3>
                            <div class="news-meta">
                                <span><i class="far fa-calendar-alt"></i> 2025-04-03</span>
                                <span><i class="far fa-clock"></i> 11:00 AM</span>
                            </div>
                            <p class="news-excerpt">ఆంధ్రప్రదేశ్ ప్రభుత్వం కొత్త రహదారి ప్రాజెక్ట్‌ను ప్రకటించింది, ఇది రాష్ట్రంలోని రవాణా సౌలభ్యాన్ని మెరుగుపరుస్తుంది. ఈ ప్రాజెక్ట్‌కు సుమారు 500 కోట్ల రూపాయలు ఖర్చు అవుతుందని అంచనా.</p>
                            <a href="#" class="read-more">మరిన్ని చదవండి <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </article>
                    
                    <!-- News Item 2 -->
                    <article class="news-card" data-state="telangana">
                        <img src="/kuwaitnews/images/news6.jpg" alt="News" class="news-img">
                        <div class="news-content">
                            <h3 class="news-title">తెలంగాణలో వర్షాలు</h3>
                            <div class="news-meta">
                                <span><i class="far fa-calendar-alt"></i> 2025-04-04</span>
                                <span><i class="far fa-clock"></i> 03:30 PM</span>
                            </div>
                            <p class="news-excerpt">తెలంగాణలో భారీ వర్షాలు కురుస్తున్నాయి, దీనివల్ల పలు ప్రాంతాల్లో వరదలు సంభవించాయి. ప్రభుత్వం సహాయక చర్యలను ప్రారంభించింది మరియు ప్రజలను సురక్షిత ప్రాంతాలకు తరలించింది.</p>
                            <a href="#" class="read-more">మరిన్ని చదవండి <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </article>
                </div>

                <!-- Social Sharing -->
                <div class="social-share">
                    <p>ఈ సమాచారాన్ని షేర్ చేయండి:</p>
                    <a href="#" class="share-btn whatsapp"><i class="fab fa-whatsapp"></i></a>
                    <a href="#" class="share-btn twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="share-btn facebook"><i class="fab fa-facebook"></i></a>
                </div>
            </section>
        </main>

        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="widget">
                <h3 class="widget-title">ప్రకటన</h3>
                <div class="ad-banner">ప్రకటన స్థలం</div>
            </div>
            <div class="widget">
                <h3 class="widget-title">సబ్‌స్క్రైబ్ చేయండి</h3>
                <form class="subscribe-form">
                    <input type="email" class="subscribe-input" placeholder="మీ ఇమెయిల్">
                    <button type="submit" class="subscribe-btn">సబ్‌స్క్రైబ్</button>
                </form>
            </div>
            <div class="widget">
                <h3 class="widget-title">మమ్మల్ని అనుసరించండి</h3>
                <div class="social-links">
                    <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </aside>
    </div>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-links">
            <a href="#">గోప్యతా విధానం</a>
            <a href="#">సంప్రదించండి</a>
        </div>
        <p class="copyright">© 2025 కువైట్ తెలుగు వార్తలు. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.</p>
    </footer>

    <!-- JavaScript -->
    <script src="/kuwaitnews/scripts.js"></script>
    <script>
        // State Tabs Functionality
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const state = this.dataset.state;
                document.querySelectorAll('.news-card').forEach(card => {
                    if (card.dataset.state === state) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Social Sharing
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const url = window.location.href;
                const text = 'తెలుగు రాష్ట్రాల వార్తలు - కువైట్ తెలుగు వార్తలు';
                if (btn.classList.contains('whatsapp')) {
                    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
                } else if (btn.classList.contains('twitter')) {
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
                } else if (btn.classList.contains('facebook')) {
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
                }
            });
        });
    </script>
</body>
</html>
