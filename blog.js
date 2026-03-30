// ===== BLOG PAGE SCRIPTS =====

// ===== STOCK TICKER (reused from main page) =====
const tickerData = [
    { symbol: 'NIFTY 50', price: '22,456.80', change: '+1.24%', direction: 'up' },
    { symbol: 'SENSEX', price: '73,890.45', change: '+0.98%', direction: 'up' },
    { symbol: 'RELIANCE', price: '2,890.50', change: '+2.15%', direction: 'up' },
    { symbol: 'TCS', price: '3,456.20', change: '-0.45%', direction: 'down' },
    { symbol: 'INFY', price: '1,567.80', change: '+1.78%', direction: 'up' },
    { symbol: 'HDFCBANK', price: '1,678.90', change: '+0.56%', direction: 'up' },
    { symbol: 'ICICIBANK', price: '1,123.40', change: '-0.23%', direction: 'down' },
    { symbol: 'SBIN', price: '756.30', change: '+3.12%', direction: 'up' },
    { symbol: 'TATAMOTORS', price: '890.60', change: '+1.56%', direction: 'up' },
    { symbol: 'BAJFINANCE', price: '7,234.50', change: '-0.78%', direction: 'down' },
    { symbol: 'BANKNIFTY', price: '48,234.15', change: '+0.67%', direction: 'up' },
    { symbol: 'GOLD', price: '₹72,450', change: '+0.34%', direction: 'up' },
];

function initTicker() {
    const tickerContent = document.getElementById('ticker-content');
    if (!tickerContent) return;

    let html = '';
    for (let i = 0; i < 3; i++) {
        tickerData.forEach(item => {
            html += `
                <div class="ticker-item">
                    <span class="symbol">${item.symbol}</span>
                    <span class="price">${item.price}</span>
                    <span class="change ${item.direction}">${item.direction === 'up' ? '▲' : '▼'} ${item.change}</span>
                </div>
            `;
        });
    }
    tickerContent.innerHTML = html;
}

// ===== BLOG FILTERS =====
function initBlogFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const posts = document.querySelectorAll('.blog-post-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            posts.forEach((post, index) => {
                const category = post.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    post.classList.remove('hidden');
                    post.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
                } else {
                    post.classList.add('hidden');
                }
            });
        });
    });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

// ===== HAMBURGER MENU =====
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-links');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ===== FADEUP ANIMATION KEYFRAMES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    initTicker();
    initBlogFilters();
    initScrollReveal();
    initHamburger();

    // Page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});
