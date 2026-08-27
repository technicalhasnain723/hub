/* ============================================
   HASNAIN PORTFOLIO - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initNav();
    initScrollReveal();
    initSkillBars();
    initContactForm();
});

/* ============================================
   LOADER
   ============================================ */
function initLoader() {
    const loader = document.getElementById('loader');
    const percentEl = document.getElementById('loaderPercent');
    if (!loader || !percentEl) return;

    let percent = 0;
    const interval = setInterval(() => {
        percent += Math.floor(Math.random() * 8) + 3;
        if (percent >= 100) {
            percent = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 400);
        }
        percentEl.textContent = percent;
    }, 80);
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */
function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    if (!cursor || !follower || window.innerWidth <= 768) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effects
    document.querySelectorAll('a, button, .hero-btn, .project-link, .form-submit').forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.style.width = '60px';
            follower.style.height = '60px';
            follower.style.borderColor = 'rgba(255,255,255,0.5)';
        });
        el.addEventListener('mouseleave', () => {
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.borderColor = 'rgba(255,255,255,0.3)';
        });
    });
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNav() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('open');
            const spans = toggle.querySelectorAll('span');
            if (links.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.transform = 'rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }
        });

        // Close on link click
        links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                links.classList.remove('open');
                const spans = toggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            });
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.about-grid, .skill-item, .project-item, .contact-grid');

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
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // About stats counter
    const statNums = document.querySelectorAll('.about-stat-num');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateNumber(entry.target, target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(num => statObserver.observe(num));
}

function animateNumber(el, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current) + '+';
        }
    }, 30);
}

/* ============================================
   SKILL BARS
   ============================================ */
function initSkillBars() {
    const skills = document.querySelectorAll('.skill-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percent = entry.target.getAttribute('data-skill');
                const bar = entry.target.querySelector('.skill-progress');
                if (bar) {
                    setTimeout(() => {
                        bar.style.width = percent + '%';
                    }, 200);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skills.forEach(skill => observer.observe(skill));
}

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.form-submit');
        const originalHTML = btn.innerHTML;

        btn.innerHTML = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = 'Message Sent! ✓';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}

/* ============================================
   PROJECT MODALS
   ============================================ */
function openProjectModal(type) {
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('modalBody');
    if (!modal || !body) return;

    let content = '';

    if (type === 'spiderman') {
        content = `
            <div class="modal-demo" style="background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);">
                <canvas id="modalSpideyCanvas" style="width:100%;height:400px;"></canvas>
                <div style="position:absolute;bottom:1.5rem;left:50%;transform:translateX(-50%);font-size:0.8rem;color:#64748b;background:rgba(19,19,31,0.8);padding:0.5rem 1rem;border-radius:100px;border:1px solid rgba(255,255,255,0.06);">Move your mouse to control the eyes</div>
            </div>
            <div class="modal-info">
                <h3>Spider-Man Mouse Follower</h3>
                <p>This interactive demo renders a Spider-Man mask entirely with HTML5 Canvas. The eyes track your cursor position with smooth interpolation, and the head tilts based on mouse direction. All graphics are drawn programmatically — no images used.</p>
                <div class="modal-actions">
                    <a href="https://github.com/technicalhasnain723" target="_blank" class="hero-btn hero-btn-primary" style="padding:0.75rem 1.5rem;font-size:0.85rem;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        View on GitHub
                    </a>
                </div>
            </div>
        `;
    } else if (type === 'proposal') {
        content = `
            <div class="modal-demo" style="background: linear-gradient(180deg, #2d1b4e 0%, #1a0a2e 100%); min-height:400px;">
                <div class="proposal-scene" style="width:100%;min-height:400px;border-radius:0;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">
                    <div id="modalPetals" style="position:absolute;inset:0;pointer-events:none;overflow:hidden;"></div>
                    <div id="modalHearts" style="position:absolute;inset:0;pointer-events:none;overflow:hidden;"></div>
                    <div style="text-align:center;z-index:2;padding:2rem;">
                        <div style="font-size:4rem;margin-bottom:1rem;animation:rosePulse 2s ease-in-out infinite;">🌹</div>
                        <h3 id="modalProposalText" style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;color:white;margin-bottom:1.5rem;min-height:2rem;"></h3>
                        <div id="modalProposalButtons" style="display:none;gap:1rem;justify-content:center;position:relative;height:60px;">
                            <button style="padding:0.75rem 2rem;background:linear-gradient(135deg,#ec4899,#f43f5e);color:white;border:none;border-radius:8px;font-size:1rem;font-weight:600;cursor:pointer;font-family:inherit;transition:all 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="modalSayYes()">Yes! 💍</button>
                            <button id="modalBtnNo" style="padding:0.75rem 2rem;background:transparent;color:white;border:2px solid rgba(255,255,255,0.3);border-radius:8px;font-size:1rem;font-weight:600;cursor:pointer;font-family:inherit;transition:all 0.3s;position:relative;" onmouseover="modalRunAway()">No</button>
                        </div>
                        <div id="modalProposalResult" style="margin-top:1.5rem;font-size:1.5rem;animation:slideUp 0.5s ease;"></div>
                    </div>
                </div>
            </div>
            <div class="modal-info">
                <h3>Animated Proposal</h3>
                <p>A romantic interactive experience built with CSS animations and JavaScript. Features falling rose petals, floating hearts, typewriter text effect, and a playful "No" button that runs away from your cursor.</p>
                <div class="modal-actions">
                    <a href="https://github.com/technicalhasnain723" target="_blank" class="hero-btn hero-btn-primary" style="padding:0.75rem 1.5rem;font-size:0.85rem;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        View on GitHub
                    </a>
                </div>
            </div>
        `;
    } else if (type === 'birthday') {
        content = `
            <div class="modal-demo" style="background: linear-gradient(180deg, #1e1b4b 0%, #312e81 100%); min-height:400px;">
                <div class="birthday-scene" style="width:100%;min-height:400px;border-radius:0;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">
                    <div id="modalBalloons" style="position:absolute;inset:0;pointer-events:none;overflow:hidden;"></div>
                    <div id="modalConfetti" style="position:absolute;inset:0;pointer-events:none;overflow:hidden;"></div>
                    <div style="text-align:center;z-index:2;padding:2rem;">
                        <div style="position:relative;display:inline-block;margin-bottom:1rem;">
                            <span style="font-size:4rem;filter:drop-shadow(0 5px 15px rgba(0,0,0,0.3));">🎂</span>
                            <div style="position:absolute;top:-5px;left:50%;transform:translateX(-50%);font-size:1.5rem;animation:flameFlicker 0.4s ease-in-out infinite alternate;">🔥</div>
                        </div>
                        <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.5rem;color:white;margin-bottom:0.5rem;">Happy Birthday! 🎉</h3>
                        <p id="modalBirthdayName" style="color:rgba(255,255,255,0.7);margin-bottom:1.5rem;">To someone special</p>
                        <button class="hero-btn hero-btn-primary" style="padding:0.75rem 2rem;" onclick="modalCelebrate()">Celebrate!</button>
                    </div>
                </div>
            </div>
            <div class="modal-info">
                <h3>Birthday Wishes</h3>
                <p>An animated birthday celebration card with floating balloons, confetti explosions, flickering candle flame, and interactive celebration button. Customize with any name to create a personalized experience.</p>
                <div class="modal-actions">
                    <a href="https://github.com/technicalhasnain723" target="_blank" class="hero-btn hero-btn-primary" style="padding:0.75rem 1.5rem;font-size:0.85rem;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        View on GitHub
                    </a>
                </div>
            </div>
        `;
    }

    body.innerHTML = content;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        if (type === 'spiderman') initModalSpiderman();
        if (type === 'proposal') initModalProposal();
        if (type === 'birthday') initModalBirthday();
    }, 300);
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
});

/* ---- Modal Spider-Man ---- */
function initModalSpiderman() {
    const canvas = document.getElementById('modalSpideyCanvas');
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
        const r = 90;

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
        ctx.strokeStyle = 'rgba(0,0,0,0.25)';
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
        const trackX = (mouseX - cx) / cx * 10;
        const trackY = (mouseY - cy) / cy * 8;

        drawSpideyEye(ctx, -30 + trackX, -8 + trackY, 36, 46, -1);
        drawSpideyEye(ctx, 30 + trackX, -8 + trackY, 36, 46, 1);

        ctx.restore();
        requestAnimationFrame(draw);
    }
    draw();
}

function drawSpideyEye(ctx, x, y, w, h, side) {
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
    ctx.arc(side * 6, -10, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fill();

    ctx.restore();
}

/* ---- Modal Proposal ---- */
let modalProposalTimer;

function initModalProposal() {
    const petalsContainer = document.getElementById('modalPetals');
    const heartsContainer = document.getElementById('modalHearts');
    if (!petalsContainer) return;

    const petals = ['🌹', '🌸', '🌺', '🌷', '💮'];
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.cssText = `position:absolute;font-size:1.5rem;animation:fall ${4 + Math.random() * 4}s linear infinite;left:${Math.random() * 100}%;top:-20px;opacity:0;`;
        petalsContainer.appendChild(petal);
    }

    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.cssText = `position:absolute;font-size:1.2rem;animation:heartFloat ${3 + Math.random() * 3}s ease-in-out infinite;left:${Math.random() * 100}%;bottom:0;opacity:0;animation-delay:${Math.random() * 4}s;`;
        heartsContainer.appendChild(heart);
    }

    const text = "Will you be mine forever? 💕";
    const el = document.getElementById('modalProposalText');
    const buttons = document.getElementById('modalProposalButtons');
    let i = 0;

    if (el) el.textContent = '';
    if (buttons) buttons.style.display = 'none';

    modalProposalTimer = setInterval(() => {
        if (el && i < text.length) {
            el.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(modalProposalTimer);
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
        heart.style.cssText = 'position:absolute;left:50%;top:50%;font-size:1.5rem;pointer-events:none;transition:all 1s ease-out;';
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
        el.textContent = '🎈';
        el.style.cssText = `position:absolute;font-size:2rem;animation:balloonRise ${5 + Math.random() * 3}s ease-in infinite;left:${8 + i * 16}%;bottom:-50px;animation-delay:${i * 0.5}s;filter:hue-rotate(${i * 50}deg);`;
        container.appendChild(el);
    }
}

function modalCelebrate() {
    const container = document.getElementById('modalConfetti');
    if (!container) return;

    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.style.cssText = `position:absolute;width:8px;height:8px;background:${colors[Math.floor(Math.random() * colors.length)]};left:${Math.random() * 100}%;top:-10px;animation:confettiFall ${2 + Math.random() * 2}s linear infinite;animation-delay:${Math.random() * 0.5}s;border-radius:${Math.random() > 0.5 ? '50%' : '0'};`;
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


/* ============================================
   DYNAMIC PROJECTS LOADER (from projects.json)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    initDynamicFilters();
});

let allProjects = [];

async function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    const emptyState = document.getElementById('emptyState');
    const guide = document.getElementById('addGuide');

    if (!grid) return;

    try {
        const response = await fetch('projects.json');
        if (!response.ok) throw new Error('projects.json not found');
        const data = await response.json();
        allProjects = data.projects || [];

        if (allProjects.length === 0) {
            grid.style.display = 'none';
            if (emptyState) emptyState.style.display = 'block';
            if (guide) guide.style.display = 'block';
            return;
        }

        renderProjects(allProjects);
        if (guide) guide.style.display = 'block';

    } catch (err) {
        console.error('Failed to load projects:', err);
        grid.innerHTML = `
            <div class="empty-state" style="grid-column:1/-1;">
                <div class="empty-icon">⚠️</div>
                <h2>Could not load projects</h2>
                <p>Make sure <code>projects.json</code> exists in the root folder.</p>
            </div>
        `;
    }
}

function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = projects.map(p => createProjectCard(p)).join('');

    // Animate cards in
    const cards = grid.querySelectorAll('.project-card-v2');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 100);
    });
}

function createProjectCard(p) {
    const techTags = p.tech.map(t => `<span>${t}</span>`).join('');
    const previewStyle = p.preview?.gradient || 'linear-gradient(135deg, #6366f1, #8b5cf6)';
    const icon = p.preview?.icon || '🚀';
    const folderPath = p.folder || `projects/${p.id}`;
    const github = p.github || 'https://github.com/technicalhasnain723';

    return `
        <article class="project-card-v2" data-category="${p.category}">
            <div class="project-card-visual">
                <div class="project-preview" style="background: ${previewStyle};">
                    <div class="preview-emoji">${icon}</div>
                    <div class="preview-overlay">
                        <a href="${folderPath}/index.html" class="preview-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <path d="M15 3h6v6"/>
                                <path d="M10 14L21 3"/>
                            </svg>
                            Open Project
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-card-body">
                <div class="project-card-meta">
                    <span class="project-category">${p.category}</span>
                    <span class="project-year">${p.year}</span>
                </div>
                <h3 class="project-card-title">${p.title}</h3>
                <p class="project-card-desc">${p.description}</p>
                <div class="project-card-tech">
                    ${techTags}
                </div>
                <div class="project-card-actions">
                    <a href="${folderPath}/index.html" class="project-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <path d="M15 3h6v6"/>
                            <path d="M10 14L21 3"/>
                        </svg>
                        Live Demo
                    </a>
                    <a href="${github}" target="_blank" class="project-link secondary">
                        <img src="web img/25231.png" alt="GitHub" style="width:16px;height:16px;border-radius:50%;object-fit:cover;">
                        Source Code
                    </a>
                </div>
            </div>
        </article>
    `;
}

/* ---- Dynamic Filter Tabs ---- */
function initDynamicFilters() {
    const tabs = document.querySelectorAll('.filter-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');
            const filtered = filter === 'all'
                ? allProjects
                : allProjects.filter(p => p.category === filter);

            renderProjects(filtered);
        });
    });
}


/* ============================================
   DYNAMIC PROJECTS LOADER (Auto from JSON)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    initDynamicFilters();
});

let allProjects = [];

async function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    const emptyState = document.getElementById('emptyState');
    if (!grid) return;

    try {
        const res = await fetch('projects.json?v=' + Date.now()); // cache bust
        if (!res.ok) throw new Error('projects.json not found');
        const data = await res.json();
        allProjects = data.projects || [];

        if (allProjects.length === 0) {
            grid.style.display = 'none';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        renderProjects(allProjects);
    } catch (err) {
        console.error('Projects load failed:', err);
        grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><div class="empty-icon">⚠️</div><h2>projects.json not found</h2><p>Create projects.json in root folder</p></div>`;
    }
}

function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    if (projects.length === 0) {
        grid.innerHTML = '';
        return;
    }

    grid.innerHTML = projects.map(p => createProjectCard(p)).join('');

    // Animate in
    grid.querySelectorAll('.project-card-v2').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 100);
    });
}

function createProjectCard(p) {
    // AUTO-GENERATE paths from ID
    const folderPath = `projects/${p.id}`;
    const demoLink = `${folderPath}/index.html`;
    const thumbPath = p.thumb ? `${folderPath}/${p.thumb}` : null;
    const github = p.github || 'https://github.com/technicalhasnain723';
    const year = p.year || new Date().getFullYear();
    const techTags = (p.tech || []).map(t => `<span>${t}</span>`).join('');

    // Thumbnail: use image if provided, else gradient+emoji
    let previewHTML;
    if (thumbPath) {
        previewHTML = `<img src="${thumbPath}" alt="${p.title}" class="project-thumb" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"><div class="thumb-fallback" style="display:none;background:linear-gradient(135deg,#6366f1,#8b5cf6);"><span style="font-size:3rem;">${p.icon || '🚀'}</span></div>`;
    } else {
        const gradient = p.preview?.gradient || 'linear-gradient(135deg, #6366f1, #8b5cf6)';
        const icon = p.preview?.icon || p.icon || '🚀';
        previewHTML = `<div class="thumb-fallback" style="display:flex;background:${gradient};"><span style="font-size:3rem;">${icon}</span></div>`;
    }

    return `
    <article class="project-card-v2" data-category="${p.category || 'Web App'}">
        <div class="project-card-visual">
            <div class="project-preview" style="position:relative;overflow:hidden;">
                ${previewHTML}
                <div class="preview-overlay">
                    <a href="${demoLink}" class="preview-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg>
                        Open Project
                    </a>
                </div>
            </div>
        </div>
        <div class="project-card-body">
            <div class="project-card-meta">
                <span class="project-category">${p.category || 'Project'}</span>
                <span class="project-year">${year}</span>
            </div>
            <h3 class="project-card-title">${p.title}</h3>
            <p class="project-card-desc">${p.description || ''}</p>
            <div class="project-card-tech">${techTags}</div>
            <div class="project-card-actions">
                <a href="${demoLink}" class="project-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg>
                    Live Demo
                </a>
                <a href="${github}" target="_blank" class="project-link secondary">
                    <img src="web img/25231.png" alt="GitHub" style="width:14px;height:14px;border-radius:50%;object-fit:cover;vertical-align:middle;margin-right:4px;">
                    Source
                </a>
            </div>
        </div>
    </article>`;
}

function initDynamicFilters() {
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;
            const filtered = filter === 'all'
                ? allProjects
                : allProjects.filter(p => (p.category || 'Web App') === filter);
            renderProjects(filtered);
        });
    });
}
