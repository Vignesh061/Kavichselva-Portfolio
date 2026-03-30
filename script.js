// ===== STOCK TICKER DATA =====
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
    { symbol: 'WIPRO', price: '467.80', change: '+0.89%', direction: 'up' },
    { symbol: 'ADANIENT', price: '2,345.60', change: '+4.21%', direction: 'up' },
    { symbol: 'BANKNIFTY', price: '48,234.15', change: '+0.67%', direction: 'up' },
    { symbol: 'GOLD', price: '₹72,450', change: '+0.34%', direction: 'up' },
    { symbol: 'CRUDE OIL', price: '$82.45', change: '-1.12%', direction: 'down' },
];

// ===== INITIALIZE TICKER =====
function initTicker() {
    const tickerContent = document.getElementById('ticker-content');
    if (!tickerContent) return;

    let html = '';
    // Duplicate for seamless loop
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

// ===== TYPING EFFECT =====
const typingPhrases = [
    'Technical Analysis Expert 📊',
    'Equity & Derivatives Trader 💹',
    'B.Com Capital Market Student 🎓',
    'Swing & Positional Trader 📈',
    'Market Research Analyst 🔍',
    'Risk Management Specialist ⚡',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
    const output = document.getElementById('typed-output');
    if (!output) return;

    const currentPhrase = typingPhrases[phraseIndex];

    if (isDeleting) {
        output.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        output.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
}

// ===== PARTICLES ANIMATION =====
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.5 ? '0, 255, 136' : '0, 123, 255';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    function createParticles() {
        const count = Math.min(80, Math.floor(window.innerWidth * 0.05));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 136, ${0.05 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        drawLines();
        animationId = requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-links');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlight
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===== SCROLL REVEAL ANIMATION =====
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered delay
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

// ===== COUNTER ANIMATION =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '';
                let current = 0;
                const increment = target / 60;
                const duration = 2000;
                const stepTime = duration / 60;

                function updateCounter() {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + suffix;
                        setTimeout(updateCounter, stepTime);
                    } else {
                        counter.textContent = target + suffix;
                    }
                }

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100; // navbar + ticker height
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const btn = form.querySelector('.btn-submit');
        const originalText = btn.textContent;
        btn.textContent = '⏳ Sending...';
        btn.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                btn.textContent = '✅ Message Sent!';
                btn.style.background = 'linear-gradient(135deg, #00cc6a, #00ff88)';
                form.reset();
            } else {
                btn.textContent = '❌ Failed. Try Again';
                btn.style.background = 'linear-gradient(135deg, #ff4444, #cc3333)';
            }
        } catch (error) {
            btn.textContent = '❌ Network Error';
            btn.style.background = 'linear-gradient(135deg, #ff4444, #cc3333)';
        }

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    });
}

// ===== CANDLESTICK MINI CHART (Hero decoration) =====
function drawMiniCandlestickChart() {
    // Add a small decorative candlestick pattern to hero
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '200');
    svg.setAttribute('height', '100');
    svg.style.position = 'absolute';
    svg.style.bottom = '100px';
    svg.style.right = '10%';
    svg.style.opacity = '0.15';
    svg.style.zIndex = '1';

    const candlesticks = [
        { o: 70, c: 40, h: 80, l: 30, color: '#00ff88' },
        { o: 40, c: 55, h: 60, l: 35, color: '#ff4444' },
        { o: 55, c: 35, h: 65, l: 25, color: '#00ff88' },
        { o: 35, c: 50, h: 55, l: 30, color: '#ff4444' },
        { o: 50, c: 30, h: 60, l: 20, color: '#00ff88' },
        { o: 30, c: 45, h: 50, l: 25, color: '#ff4444' },
        { o: 45, c: 25, h: 55, l: 15, color: '#00ff88' },
        { o: 25, c: 40, h: 45, l: 20, color: '#ff4444' },
    ];

    candlesticks.forEach((c, i) => {
        const x = i * 24 + 8;
        // Wick
        const wick = document.createElementNS(svgNS, 'line');
        wick.setAttribute('x1', x + 6);
        wick.setAttribute('y1', c.h);
        wick.setAttribute('x2', x + 6);
        wick.setAttribute('y2', c.l);
        wick.setAttribute('stroke', c.color);
        wick.setAttribute('stroke-width', '1');
        svg.appendChild(wick);

        // Body
        const body = document.createElementNS(svgNS, 'rect');
        body.setAttribute('x', x);
        body.setAttribute('y', Math.min(c.o, c.c));
        body.setAttribute('width', '12');
        body.setAttribute('height', Math.abs(c.o - c.c) || 2);
        body.setAttribute('fill', c.color);
        body.setAttribute('rx', '1');
        svg.appendChild(body);
    });

    const hero = document.querySelector('.hero');
    if (hero) hero.appendChild(svg);
}

// ===== TILT EFFECT ON CARDS =====
function initTiltEffect() {
    const cards = document.querySelectorAll('.skill-card, .cert-card, .blog-card, .referral-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== CERTIFICATE LIGHTBOX MODAL =====
function openCertModal(src) {
    const modal = document.getElementById('cert-modal');
    const img = document.getElementById('cert-modal-img');
    if (modal && img) {
        img.src = src;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertModal();
});

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    initTicker();
    typeEffect();
    initParticles();
    initNavbar();
    initScrollReveal();
    initCounters();
    initSmoothScroll();
    initContactForm();
    drawMiniCandlestickChart();

    // Initialize tilt effect after a small delay for DOM to settle
    setTimeout(initTiltEffect, 500);

    // Add page load animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});
