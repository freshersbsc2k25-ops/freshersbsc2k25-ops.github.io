// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 2000);
});

// Custom Cursor
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.addEventListener('mousedown', () => cursor.classList.add('expanded'));
document.addEventListener('mouseup', () => cursor.classList.remove('expanded'));

// Animated Background Canvas
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let animationId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class BackgroundEffect {
    constructor() {
        this.shapes = [];
        this.createShapes();
    }

    createShapes() {
        for (let i = 0; i < 50; i++) {
            this.shapes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                hue: Math.random() * 360,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    update() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.shapes.forEach(shape => {
            shape.x += shape.speedX;
            shape.y += shape.speedY;
            shape.hue += 1;

            if (shape.x < 0 || shape.x > canvas.width) shape.speedX *= -1;
            if (shape.y < 0 || shape.y > canvas.height) shape.speedY *= -1;

            const gradient = ctx.createRadialGradient(shape.x, shape.y, 0, shape.x, shape.y, shape.size * 10);
            gradient.addColorStop(0, `hsla(${shape.hue}, 100%, 50%, ${shape.opacity})`);
            gradient.addColorStop(1, 'transparent');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.size * 10, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    animate() {
        this.update();
        animationId = requestAnimationFrame(() => this.animate());
    }
}

const bgEffect = new BackgroundEffect();
bgEffect.animate();

// Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    setInterval(() => {
        if (particlesContainer.children.length < 50) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particlesContainer.appendChild(particle);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 6000);
        }
    }, 200);
}

createParticles();

// Enhanced Countdown Timer
const partyDate = new Date('2025-09-20T14:00:00');

function updateCountdown() {
    const now = new Date();
    const difference = partyDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        document.querySelector('.countdown-container').innerHTML = `
            <div style="font-size: 3rem; color: #ffd700; text-align: center; animation: celebration 2s ease-in-out infinite;">
                🎉 THE PARTY HAS STARTED! 🎉
            </div>
        `;
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Interactive Elements
document.querySelectorAll('.countdown-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.2) rotate(5deg)';
        item.style.boxShadow = '0 0 40px rgba(255, 215, 0, 0.6)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1) rotate(0deg)';
        item.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.4)';
    });
});

// Hand Interaction
document.querySelectorAll('.hand-emoji').forEach(hand => {
    hand.addEventListener('click', () => {
        hand.style.transform = 'scale(2) rotate(360deg)';
        hand.style.filter = 'drop-shadow(0 0 30px #ffd700)';
        
        setTimeout(() => {
            hand.style.transform = 'scale(1) rotate(0deg)';
            hand.style.filter = 'none';
        }, 500);
    });
});

// Additional Effects
setInterval(() => {
    const colors = ['#ffd700', '#ff6b35', '#d4af37', '#ff8c42'];
    document.documentElement.style.setProperty('--accent-color', colors[Math.floor(Math.random() * colors.length)]);
}, 3000);

// Keyboard Interactions
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        // Create explosion effect
        const explosion = document.createElement('div');
        explosion.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, #ffd700, transparent);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1000;
            animation: explode 1s ease-out forwards;
        `;
        
        const keyframes = `
            @keyframes explode {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(10); opacity: 0; }
            }
        `;
        
        if (!document.querySelector('#explosion-keyframes')) {
            const style = document.createElement('style');
            style.id = 'explosion-keyframes';
            style.textContent = keyframes;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(explosion);
        setTimeout(() => explosion.remove(), 1000);
    }
});

console.log('🎉 Welcome to the most EPIC Fresher\'s Party invitation! Press SPACE for surprises! 🎉');
      
