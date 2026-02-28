// ===========================
// DARK MODE TOGGLE
// ===========================

const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark-mode';
body.classList.add(savedTheme);

darkModeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    }
});

// ===========================
// NAVIGATION SCROLL EFFECT
// ===========================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===========================
// ANIMATED WAVE CANVAS
// ===========================

const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let wave = {
    y: canvas.height / 2,
    length: 0.015,
    amplitude: 100,
    frequency: 0.01,
    velocity: 0.05,
};

function drawWave() {
    // Clear canvas
    ctx.fillStyle = 'rgba(10, 22, 40, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw wave
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
    ctx.lineWidth = 3;
    ctx.beginPath();

    let x = 0;
    while (x < canvas.width) {
        const y = Math.sin(x * wave.length + wave.frequency) * wave.amplitude + wave.y;
        ctx.lineTo(x, y);
        x += 5;
    }

    ctx.stroke();

    // Draw wave fill
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 212, 255, 0.1)';
    ctx.fill();

    wave.frequency += wave.velocity;

    requestAnimationFrame(drawWave);
}

drawWave();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===========================
// FLOATING PARTICLES
// ===========================

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        const randomDuration = Math.random() * 5 + 5;

        particle.style.left = randomX + 'px';
        particle.style.top = randomY + 'px';
        particle.style.animationDuration = randomDuration + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';

        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ===========================
// ANIMATED NUMBER COUNTERS
// ===========================

const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const startTime = Date.now();

    function count() {
        start += increment;
        if (start < target) {
            if (target > 100) {
                element.textContent = Math.floor(start).toLocaleString();
            } else {
                element.textContent = Math.floor(start);
            }
            requestAnimationFrame(count);
        } else {
            if (target > 100) {
                element.textContent = target.toLocaleString();
            } else {
                element.textContent = target;
            }
        }
    }

    count();
}

// Trigger animation on scroll
const observerOptions = {
    threshold: 0.5,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.animated) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            entry.target.animated = true;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

statNumbers.forEach(num => observer.observe(num));

// ===========================
// INTERACTIVE PROBLEM-SOLUTION
// ===========================

const problemBtns = document.querySelectorAll('.problem-btn');
const solutionContents = document.querySelectorAll('.solution-content');

problemBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        btn.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => ripple.remove(), 600);

        // Update active states
        problemBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show corresponding solution
        const problemType = btn.dataset.problem;
        solutionContents.forEach(content => {
            content.classList.remove('active');
        });

        document.querySelector(`[data-solution="${problemType}"]`).classList.add('active');
    });
});

// ===========================
// SMOOTH SCROLL ANIMATIONS
// ===========================

gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
gsap.utils.toArray('section').forEach(section => {
    gsap.fromTo(section, 
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                scrub: false,
            }
        }
    );
});

// Parallax scrolling on hero
gsap.to('.floating-3d-drop', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
    },
    y: 200,
    duration: 1
});

// ===========================
// CONTACT FORM ANIMATION
// ===========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;

        // Simple validation
        if (name && email) {
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 20px 30px;
                background: linear-gradient(135deg, #00d4ff, #00ff99);
                color: #0a1628;
                border-radius: 10px;
                font-weight: 600;
                z-index: 10000;
                animation: slideInRight 0.5s ease;
            `;
            successMsg.textContent = '✓ Message sent successfully!';
            document.body.appendChild(successMsg);

            // Remove message after 3 seconds
            setTimeout(() => {
                gsap.to(successMsg, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => successMsg.remove()
                });
            }, 3000);

            // Reset form
            contactForm.reset();
        }
    });
}

// ===========================
// CTA BUTTON INTERACTION
// ===========================

const ctaBtn = document.getElementById('ctaBtn');

if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1,
            scrollTo: '#interactive-solution',
            ease: 'power2.inOut'
        });
    });
}

// ===========================
// TIMELINE ANIMATIONS
// ===========================

const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInRight 0.6s ease forwards';
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

timelineItems.forEach(item => timelineObserver.observe(item));

// ===========================
// INDICATOR HOVER EFFECT
// ===========================

const indicators = document.querySelectorAll('.indicator');

indicators.forEach(indicator => {
    indicator.addEventListener('mouseenter', () => {
        gsap.to(indicator, {
            scale: 1.5,
            duration: 0.3,
            overwrite: 'auto'
        });
    });

    indicator.addEventListener('mouseleave', () => {
        gsap.to(indicator, {
            scale: 1,
            duration: 0.3,
            overwrite: 'auto'
        });
    });
});

// ===========================
// STEP CARD ANIMATIONS
// ===========================

const stepCards = document.querySelectorAll('.step-card');

stepCards.forEach((card, index) => {
    gsap.fromTo(card,
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                once: true
            }
        }
    );
});

// ===========================
// STAT CARDS ANIMATION
// ===========================

const statCards = document.querySelectorAll('.stat-card');

statCards.forEach((card, index) => {
    gsap.fromTo(card,
        {
            opacity: 0,
            scale: 0.8,
            y: 30
        },
        {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                once: true
            }
        }
    );
});

// ===========================
// MOBILE RESPONSIVE PARTICLES
// ===========================

if (window.innerWidth < 768) {
    const particlesContainer = document.getElementById('particles');
    particlesContainer.innerHTML = '';
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        const randomDuration = Math.random() * 5 + 5;

        particle.style.left = randomX + 'px';
        particle.style.top = randomY + 'px';
        particle.style.animationDuration = randomDuration + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';

        particlesContainer.appendChild(particle);
    }
}

// ===========================
// SECTION REVEAL ON SCROLL
// ===========================

const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease';
    sectionObserver.observe(section);
});

console.log('✨ Smart Water website loaded successfully!');