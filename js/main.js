/* ============================================
   MAIN JAVASCRIPT
   Hasnain Portfolio Website
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initThemeToggle();
    initMobileMenu();
    initTypingEffect();
    initParticles();
    initCounters();
    initScrollReveal();
    initContactForm();
    initProjectDemos();
});

/* ============================================
   PRELOADER
   ============================================ */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 500);
    });
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */
function initCustomCursor() {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');

    if (!dot || !outline || window.innerWidth <= 768) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Smooth follow for outline
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        outline.style.left = outlineX + 'px';
        outline.style.top = outlineY + 'px';

        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.style.width = '60px';
            outline.style.height = '60px';
            outline.style.opacity = '0.3';
            outline.style.background = 'rgba(99, 102, 241, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            outline.style.width = '40px';
            outline.style.height = '40px';
            outline.style.opacity = '0.5';
            outline.style.background = 'transparent';
        });
    });
}

/* ============================================
   THEME TOGGLE (Dark/Light)
   ============================================ */
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

/* ============================================
   MOBILE MENU
   ============================================ */
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');

    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('open');
        const spans = btn.querySelectorAll('span');

        if (menu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close on link click
    menu.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            const spans = btn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

/* ============================================
   TYPING EFFECT
   ============================================ */
function initTypingEffect() {
    const el = document.getElementById('typingText');
    if (!el) return;

    const words = ['websites', 'animations', 'experiences', 'magic'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseEnd = 2000;
    let pauseStart = 500;
    let typeSpeed = 100;

    function type() {
        const current = words[wordIndex];

        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            typeSpeed = pauseEnd;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = pauseStart;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}

/* ============================================
   PARTICLES BACKGROUND
   ============================================ */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('span');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';

        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        const colors = ['var(--primary)', 'var(--accent)', 'var(--accent-2)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(particle);
    }
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current) + '+';
        }
    }, stepTime);
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.stat-card, .featured-card, .skill-card, .blog-card, .project-card, .project-showcase');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = 'Sending...';
        btn.disabled = true;

        // Simulate sending
        setTimeout(() => {
            btn.innerHTML = 'Message Sent! ✓';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}

/* ============================================
   PROJECT DEMOS
   ============================================ */
function initProjectDemos() {
    initSpiderManDemo();
    initProposalDemo();
    initBirthdayDemo();
}

/* ---- Spider-Man Canvas Demo ---- */
function initSpiderManDemo() {
    const canvas = document.getElementById('spidermanCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let targetX = mouseX;
    let targetY = mouseY;

    function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = 300;
    }
    resize();
    window.addEventListener('resize', resize);

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        targetX = e.touches[0].clientX - rect.left;
        targetY = e.touches[0].clientY - rect.top;
    });

    function drawSpiderMan() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Smooth follow
        mouseX += (targetX - mouseX) * 0.1;
        mouseY += (targetY - mouseY) * 0.1;

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const headRadius = 70;

        // Head tilt based on mouse
        const tiltX = (mouseX - cx) / cx * 0.15;
        const tiltY = (mouseY - cy) / cy * 0.1;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(tiltX);
        ctx.scale(1 + tiltY * 0.05, 1 - tiltY * 0.05);

        // Head shape (oval)
        ctx.beginPath();
        ctx.ellipse(0, 0, headRadius, headRadius * 1.15, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#dc2626';
        ctx.fill();
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Web pattern on head
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * headRadius, Math.sin(angle) * headRadius * 1.15);
            ctx.stroke();
        }
        // Concentric web rings
        for (let r = 15; r < headRadius; r += 15) {
            ctx.beginPath();
            ctx.ellipse(0, 0, r, r * 1.15, 0, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Eyes (white lenses with black outline)
        const eyeOffsetX = 22;
        const eyeOffsetY = -5;
        const eyeWidth = 28;
        const eyeHeight = 38;

        // Calculate eye tracking
        const eyeTrackX = (mouseX - cx) / cx * 8;
        const eyeTrackY = (mouseY - cy) / cy * 6;

        // Left eye
        drawEye(ctx, -eyeOffsetX + eyeTrackX, eyeOffsetY + eyeTrackY, eyeWidth, eyeHeight, -1);
        // Right eye
        drawEye(ctx, eyeOffsetX + eyeTrackX, eyeOffsetY + eyeTrackY, eyeWidth, eyeHeight, 1);

        ctx.restore();

        requestAnimationFrame(drawSpiderMan);
    }

    function drawEye(ctx, x, y, w, h, side) {
        ctx.save();
        ctx.translate(x, y);

        // Black outline
        ctx.beginPath();
        if (side === -1) {
            ctx.moveTo(-w, -h * 0.3);
            ctx.quadraticCurveTo(-w * 0.3, -h, w * 0.5, -h * 0.8);
            ctx.quadraticCurveTo(w * 0.8, -h * 0.3, w * 0.3, h * 0.5);
            ctx.quadraticCurveTo(0, h, -w * 0.5, h * 0.3);
            ctx.quadraticCurveTo(-w * 0.8, 0, -w, -h * 0.3);
        } else {
            ctx.moveTo(w, -h * 0.3);
            ctx.quadraticCurveTo(w * 0.3, -h, -w * 0.5, -h * 0.8);
            ctx.quadraticCurveTo(-w * 0.8, -h * 0.3, -w * 0.3, h * 0.5);
            ctx.quadraticCurveTo(0, h, w * 0.5, h * 0.3);
            ctx.quadraticCurveTo(w * 0.8, 0, w, -h * 0.3);
        }
        ctx.closePath();
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#000';
        ctx.stroke();

        // White lens
        ctx.beginPath();
        if (side === -1) {
            ctx.moveTo(-w + 4, -h * 0.3 + 2);
            ctx.quadraticCurveTo(-w * 0.3 + 2, -h + 3, w * 0.5 - 2, -h * 0.8 + 2);
            ctx.quadraticCurveTo(w * 0.8 - 3, -h * 0.3 + 2, w * 0.3 - 2, h * 0.5 - 2);
            ctx.quadraticCurveTo(0, h - 4, -w * 0.5 + 2, h * 0.3 - 2);
            ctx.quadraticCurveTo(-w * 0.8 + 3, 0, -w + 4, -h * 0.3 + 2);
        } else {
            ctx.moveTo(w - 4, -h * 0.3 + 2);
            ctx.quadraticCurveTo(w * 0.3 - 2, -h + 3, -w * 0.5 + 2, -h * 0.8 + 2);
            ctx.quadraticCurveTo(-w * 0.8 + 3, -h * 0.3 + 2, -w * 0.3 + 2, h * 0.5 - 2);
            ctx.quadraticCurveTo(0, h - 4, w * 0.5 - 2, h * 0.3 - 2);
            ctx.quadraticCurveTo(w * 0.8 - 3, 0, w - 4, -h * 0.3 + 2);
        }
        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.fill();

        // Eye shine
        ctx.beginPath();
        ctx.arc(side * 5, -8, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fill();

        ctx.restore();
    }

    drawSpiderMan();
}

/* ---- Proposal Demo ---- */
let proposalInterval;
let proposalStarted = false;

function initProposalDemo() {
    const container = document.getElementById('petalsContainer');
    const heartsContainer = document.getElementById('heartsContainer');
    if (!container) return;

    // Create falling petals
    const petals = ['🌹', '🌸', '🌺', '🌷', '💮'];
    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (4 + Math.random() * 4) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(petal);
    }

    // Create floating hearts
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '0';
        heart.style.animationDuration = (3 + Math.random() * 3) + 's';
        heart.style.animationDelay = Math.random() * 4 + 's';
        heartsContainer.appendChild(heart);
    }
}

function toggleDemo(id) {
    const demo = document.getElementById(id);
    if (!demo) return;

    const isVisible = demo.style.display !== 'none' && demo.style.display !== '';

    // Hide all demos first
    document.querySelectorAll('.project-demo').forEach(d => {
        d.style.display = 'none';
    });

    if (!isVisible) {
        demo.style.display = 'flex';

        if (id === 'proposalDemo' && !proposalStarted) {
            proposalStarted = true;
            startProposalTypewriter();
        }
    }
}

function startProposalTypewriter() {
    const text = "Will you be mine forever? 💕";
    const el = document.getElementById('proposalText');
    const buttons = document.getElementById('proposalButtons');
    let i = 0;

    el.textContent = '';
    buttons.style.display = 'none';

    proposalInterval = setInterval(() => {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(proposalInterval);
            setTimeout(() => {
                buttons.style.display = 'flex';
            }, 500);
        }
    }, 80);
}

function runAway() {
    const btn = document.getElementById('btnNo');
    if (!btn) return;

    const parent = btn.parentElement;
    const rect = parent.getBoundingClientRect();

    const maxX = rect.width - btn.offsetWidth - 20;
    const maxY = rect.height - btn.offsetHeight - 20;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    btn.style.position = 'absolute';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
}

function sayYes() {
    const result = document.getElementById('proposalResult');
    const buttons = document.getElementById('proposalButtons');
    if (!result) return;

    buttons.style.display = 'none';
    result.innerHTML = 'Yay! 🎉💍❤️ You said YES!';

    // Burst of hearts
    const scene = document.querySelector('.proposal-scene');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.textContent = ['❤️', '💖', '💕', '💗'][Math.floor(Math.random() * 4)];
        heart.style.position = 'absolute';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = '1.5rem';
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'all 1s ease-out';
        scene.appendChild(heart);

        setTimeout(() => {
            const angle = (Math.PI * 2 * i) / 20;
            const dist = 100 + Math.random() * 100;
            heart.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
            heart.style.opacity = '0';
        }, 50);

        setTimeout(() => heart.remove(), 1100);
    }
}

/* ---- Birthday Demo ---- */
function initBirthdayDemo() {
    const balloonsContainer = document.getElementById('balloonsContainer');
    if (!balloonsContainer) return;

    const balloons = ['🎈', '🎈', '🎈', '🎈', '🎈'];
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

    balloons.forEach((b, i) => {
        const el = document.createElement('div');
        el.className = 'balloon';
        el.textContent = b;
        el.style.left = (10 + i * 20) + '%';
        el.style.animationDelay = (i * 0.5) + 's';
        el.style.filter = `hue-rotate(${i * 60}deg)`;
        balloonsContainer.appendChild(el);
    });
}

function celebrate() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;

    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.top = '-10px';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = (2 + Math.random() * 2) + 's';
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        container.appendChild(piece);

        setTimeout(() => piece.remove(), 4000);
    }

    // Flash message
    const nameEl = document.getElementById('birthdayName');
    if (nameEl) {
        const original = nameEl.textContent;
        nameEl.textContent = '🎉 Make a wish! 🎉';
        nameEl.style.color = '#fbbf24';
        nameEl.style.fontWeight = '700';

        setTimeout(() => {
            nameEl.textContent = original;
            nameEl.style.color = '';
            nameEl.style.fontWeight = '';
        }, 3000);
    }
}

/* ============================================
   NAVBAR SCROLL EFFECT
   ============================================ */
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.padding = '0.75rem 0';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});


/* ============================================
   PROJECTS PAGE V2 - FILTER & MODAL
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initProjectFilter();
    initProjectModals();
});

/* ---- Filter Tabs ---- */
function initProjectFilter() {
    const tabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('.project-card-v2');

    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            // Filter cards with animation
            cards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';

                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

/* ---- Project Modals ---- */
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

function openModal(projectType) {
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('modalBody');
    if (!modal || !body) return;

    let content = '';

    if (projectType === 'spiderman') {
        content = `
            <div class="modal-demo" style="background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);">
                <canvas id="modalSpidermanCanvas" style="width:100%;height:400px;"></canvas>
                <div class="demo-hint" style="bottom:1.5rem;">Move your mouse to control the eyes</div>
            </div>
            <div class="modal-info">
                <h3>Spider-Man Mouse Follower</h3>
                <p>This interactive demo renders a Spider-Man mask entirely with HTML5 Canvas. The eyes track your cursor position with smooth interpolation, and the head tilts based on mouse direction. All graphics are drawn programmatically — no images used.</p>
                <div class="modal-actions">
                    <a href="https://github.com/technicalhasnain723" target="_blank" class="btn btn-primary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        View on GitHub
                    </a>
                </div>
            </div>
        `;
    } else if (projectType === 'proposal') {
        content = `
            <div class="modal-demo" style="background: linear-gradient(180deg, #2d1b4e 0%, #1a0a2e 100%); min-height:400px;">
                <div class="proposal-scene" style="width:100%;min-height:400px;border-radius:0;">
                    <div class="petals-container" id="modalPetals"></div>
                    <div class="hearts-container" id="modalHearts"></div>
                    <div class="proposal-content">
                        <div class="proposal-rose">🌹</div>
                        <h3 id="modalProposalText"></h3>
                        <div class="proposal-buttons" id="modalProposalButtons" style="display:none;">
                            <button class="btn-yes" onclick="modalSayYes()">Yes! 💍</button>
                            <button class="btn-no" id="modalBtnNo" onmouseover="modalRunAway()">No</button>
                        </div>
                        <div class="proposal-result" id="modalProposalResult"></div>
                    </div>
                </div>
            </div>
            <div class="modal-info">
                <h3>Animated Proposal</h3>
                <p>A romantic interactive experience built with CSS animations and JavaScript. Features falling rose petals, floating hearts, typewriter text effect, and a playful "No" button that runs away from your cursor.</p>
                <div class="modal-actions">
                    <a href="https://github.com/technicalhasnain723" target="_blank" class="btn btn-primary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        View on GitHub
                    </a>
                </div>
            </div>
        `;
    } else if (projectType === 'birthday') {
        content = `
            <div class="modal-demo" style="background: linear-gradient(180deg, #1e1b4b 0%, #312e81 100%); min-height:400px;">
                <div class="birthday-scene" style="width:100%;min-height:400px;border-radius:0;">
                    <div class="balloons-container" id="modalBalloons"></div>
                    <div class="confetti-container" id="modalConfetti"></div>
                    <div class="birthday-content">
                        <div class="birthday-cake">
                            <div class="cake-base">🎂</div>
                            <div class="candle-flame" id="modalCandleFlame">🔥</div>
                        </div>
                        <h3>Happy Birthday! 🎉</h3>
                        <p id="modalBirthdayName">To someone special</p>
                        <button class="btn btn-primary" onclick="modalCelebrate()">Celebrate!</button>
                    </div>
                </div>
            </div>
            <div class="modal-info">
                <h3>Birthday Wishes</h3>
                <p>An animated birthday celebration card with floating balloons, confetti explosions, flickering candle flame, and interactive celebration button. Customize with any name to create a personalized experience.</p>
                <div class="modal-actions">
                    <a href="https://github.com/technicalhasnain723" target="_blank" class="btn btn-primary">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        View on GitHub
                    </a>
                </div>
            </div>
        `;
    }

    body.innerHTML = content;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Initialize demo after modal opens
    setTimeout(() => {
        if (projectType === 'spiderman') {
            initModalSpiderman();
        } else if (projectType === 'proposal') {
            initModalProposal();
        } else if (projectType === 'birthday') {
            initModalBirthday();
        }
    }, 300);
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

/* ---- Modal Spider-Man ---- */
function initModalSpiderman() {
    const canvas = document.getElementById('modalSpidermanCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let targetX = mouseX;
    let targetY = mouseY;

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        mouseX += (targetX - mouseX) * 0.1;
        mouseY += (targetY - mouseY) * 0.1;

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const r = 80;

        const tiltX = (mouseX - cx) / cx * 0.15;
        const tiltY = (mouseY - cy) / cy * 0.1;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(tiltX);
        ctx.scale(1 + tiltY * 0.05, 1 - tiltY * 0.05);

        // Head
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 1.15, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#dc2626';
        ctx.fill();
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Web pattern
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r * 1.15);
            ctx.stroke();
        }
        for (let rad = 15; rad < r; rad += 15) {
            ctx.beginPath();
            ctx.ellipse(0, 0, rad, rad * 1.15, 0, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Eyes
        const trackX = (mouseX - cx) / cx * 8;
        const trackY = (mouseY - cy) / cy * 6;

        drawModalEye(ctx, -25 + trackX, -5 + trackY, 32, 42, -1);
        drawModalEye(ctx, 25 + trackX, -5 + trackY, 32, 42, 1);

        ctx.restore();
        requestAnimationFrame(draw);
    }
    draw();
}

function drawModalEye(ctx, x, y, w, h, side) {
    ctx.save();
    ctx.translate(x, y);

    ctx.beginPath();
    if (side === -1) {
        ctx.moveTo(-w, -h * 0.3);
        ctx.quadraticCurveTo(-w * 0.3, -h, w * 0.5, -h * 0.8);
        ctx.quadraticCurveTo(w * 0.8, -h * 0.3, w * 0.3, h * 0.5);
        ctx.quadraticCurveTo(0, h, -w * 0.5, h * 0.3);
        ctx.quadraticCurveTo(-w * 0.8, 0, -w, -h * 0.3);
    } else {
        ctx.moveTo(w, -h * 0.3);
        ctx.quadraticCurveTo(w * 0.3, -h, -w * 0.5, -h * 0.8);
        ctx.quadraticCurveTo(-w * 0.8, -h * 0.3, -w * 0.3, h * 0.5);
        ctx.quadraticCurveTo(0, h, w * 0.5, h * 0.3);
        ctx.quadraticCurveTo(w * 0.8, 0, w, -h * 0.3);
    }
    ctx.closePath();
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    if (side === -1) {
        ctx.moveTo(-w + 4, -h * 0.3 + 2);
        ctx.quadraticCurveTo(-w * 0.3 + 2, -h + 3, w * 0.5 - 2, -h * 0.8 + 2);
        ctx.quadraticCurveTo(w * 0.8 - 3, -h * 0.3 + 2, w * 0.3 - 2, h * 0.5 - 2);
        ctx.quadraticCurveTo(0, h - 4, -w * 0.5 + 2, h * 0.3 - 2);
        ctx.quadraticCurveTo(-w * 0.8 + 3, 0, -w + 4, -h * 0.3 + 2);
    } else {
        ctx.moveTo(w - 4, -h * 0.3 + 2);
        ctx.quadraticCurveTo(w * 0.3 - 2, -h + 3, -w * 0.5 + 2, -h * 0.8 + 2);
        ctx.quadraticCurveTo(-w * 0.8 + 3, -h * 0.3 + 2, -w * 0.3 + 2, h * 0.5 - 2);
        ctx.quadraticCurveTo(0, h - 4, w * 0.5 - 2, h * 0.3 - 2);
        ctx.quadraticCurveTo(w * 0.8 - 3, 0, w - 4, -h * 0.3 + 2);
    }
    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(side * 5, -8, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fill();

    ctx.restore();
}

/* ---- Modal Proposal ---- */
let modalProposalInterval;

function initModalProposal() {
    const petalsContainer = document.getElementById('modalPetals');
    const heartsContainer = document.getElementById('modalHearts');
    if (!petalsContainer) return;

    const petals = ['🌹', '🌸', '🌺', '🌷', '💮'];
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (4 + Math.random() * 4) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petalsContainer.appendChild(petal);
    }

    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-float';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '0';
        heart.style.animationDuration = (3 + Math.random() * 3) + 's';
        heart.style.animationDelay = Math.random() * 4 + 's';
        heartsContainer.appendChild(heart);
    }

    // Start typewriter
    const text = "Will you be mine forever? 💕";
    const el = document.getElementById('modalProposalText');
    const buttons = document.getElementById('modalProposalButtons');
    let i = 0;

    if (el) el.textContent = '';
    if (buttons) buttons.style.display = 'none';

    modalProposalInterval = setInterval(() => {
        if (el && i < text.length) {
            el.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(modalProposalInterval);
            setTimeout(() => {
                if (buttons) buttons.style.display = 'flex';
            }, 500);
        }
    }, 80);
}

function modalRunAway() {
    const btn = document.getElementById('modalBtnNo');
    if (!btn) return;
    const parent = btn.parentElement;
    const rect = parent.getBoundingClientRect();
    const maxX = rect.width - btn.offsetWidth - 20;
    const maxY = rect.height - btn.offsetHeight - 20;
    btn.style.position = 'absolute';
    btn.style.left = Math.random() * maxX + 'px';
    btn.style.top = Math.random() * maxY + 'px';
}

function modalSayYes() {
    const result = document.getElementById('modalProposalResult');
    const buttons = document.getElementById('modalProposalButtons');
    if (!result) return;
    if (buttons) buttons.style.display = 'none';
    result.innerHTML = 'Yay! 🎉💍❤️ You said YES!';

    const scene = document.querySelector('.proposal-scene');
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.textContent = ['❤️', '💖', '💕', '💗'][Math.floor(Math.random() * 4)];
        heart.style.position = 'absolute';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = '1.5rem';
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'all 1s ease-out';
        scene.appendChild(heart);
        setTimeout(() => {
            const angle = (Math.PI * 2 * i) / 20;
            const dist = 100 + Math.random() * 100;
            heart.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
            heart.style.opacity = '0';
        }, 50);
        setTimeout(() => heart.remove(), 1100);
    }
}

/* ---- Modal Birthday ---- */
function initModalBirthday() {
    const container = document.getElementById('modalBalloons');
    if (!container) return;

    for (let i = 0; i < 6; i++) {
        const el = document.createElement('div');
        el.className = 'balloon';
        el.textContent = '🎈';
        el.style.left = (8 + i * 16) + '%';
        el.style.animationDelay = (i * 0.5) + 's';
        el.style.filter = `hue-rotate(${i * 50}deg)`;
        container.appendChild(el);
    }
}

function modalCelebrate() {
    const container = document.getElementById('modalConfetti');
    if (!container) return;

    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.top = '-10px';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = (2 + Math.random() * 2) + 's';
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        container.appendChild(piece);
        setTimeout(() => piece.remove(), 4000);
    }

    const nameEl = document.getElementById('modalBirthdayName');
    if (nameEl) {
        nameEl.textContent = '🎉 Make a wish! 🎉';
        nameEl.style.color = '#fbbf24';
        nameEl.style.fontWeight = '700';
        setTimeout(() => {
            nameEl.textContent = 'To someone special';
            nameEl.style.color = '';
            nameEl.style.fontWeight = '';
        }, 3000);
    }
}
