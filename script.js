// Hello Cline Demo - Interactive JavaScript
// This file contains all the interactive functionality for the demo

// TODO: Add more animation effects for better user experience
// FIXME: Optimize confetti performance for slower devices

// Counter variables
let clickCount = 0;
let hoverCount = 0;
let keyCount = 0;
let confettiCount = 0;

// DOM elements
const clickCounter = document.getElementById('clickCounter');
const hoverCounter = document.getElementById('hoverCounter');
const keyCounter = document.getElementById('keyCounter');
const confettiCounter = document.getElementById('confettiCounter');

const celebrateBtn = document.getElementById('celebrateBtn');
const resetBtn = document.getElementById('resetBtn');
const surpriseBtn = document.getElementById('surpriseBtn');

// Update counter displays
function updateCounters() {
    clickCounter.textContent = clickCount;
    hoverCounter.textContent = hoverCount;
    keyCounter.textContent = keyCount;
    confettiCounter.textContent = confettiCount;
}

// Confetti celebration function
function celebrate() {
    confettiCount++;
    updateCounters();
    
    // Multiple confetti bursts for extra celebration
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
    
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
    }, 200);
    
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });
    }, 400);
}

// Surprise function with random effects
function surprise() {
    const surprises = [
        () => {
            // Rainbow confetti
            const colors = ['#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00', '#00ff80', '#00ffff', '#0080ff', '#0000ff', '#8000ff', '#ff00ff', '#ff0080'];
            confetti({
                particleCount: 150,
                spread: 180,
                colors: colors,
                origin: { y: 0.5 }
            });
        },
        () => {
            // Fireworks effect
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    confetti({
                        particleCount: 30,
                        angle: Math.random() * 360,
                        spread: 60,
                        origin: { 
                            x: Math.random(),
                            y: Math.random() * 0.5 + 0.3
                        }
                    });
                }, i * 200);
            }
        },
        () => {
            // Heart explosion
            confetti({
                particleCount: 100,
                spread: 160,
                shapes: ['circle'],
                colors: ['#ff69b4', '#ff1493', '#dc143c', '#b22222'],
                origin: { y: 0.6 }
            });
        }
    ];
    
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    randomSurprise();
    confettiCount++;
    updateCounters();
}

// Reset all counters
function resetCounters() {
    clickCount = 0;
    hoverCount = 0;
    keyCount = 0;
    confettiCount = 0;
    updateCounters();
    
    // Visual feedback for reset
    const counters = document.querySelectorAll('[id$="Counter"]');
    counters.forEach(counter => {
        counter.style.transform = 'scale(1.2)';
        counter.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
        }, 300);
    });
}

// Event Listeners

// Celebrate button
celebrateBtn.addEventListener('click', () => {
    clickCount++;
    celebrate();
});

// Reset button
resetBtn.addEventListener('click', () => {
    clickCount++;
    updateCounters();
    resetCounters();
});

// Surprise button
surpriseBtn.addEventListener('click', () => {
    clickCount++;
    updateCounters();
    surprise();
});

// Card hover effects
const cards = document.querySelectorAll('.card-hover');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        hoverCount++;
        updateCounters();
        
        // Add a subtle glow effect
        card.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '';
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    keyCount++;
    updateCounters();
    
    const key = event.key.toLowerCase();
    
    switch(key) {
        case 'c':
            celebrate();
            // Visual feedback
            celebrateBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                celebrateBtn.style.transform = 'scale(1)';
            }, 150);
            break;
            
        case 'r':
            resetCounters();
            break;
            
        case 's':
            surprise();
            // Visual feedback
            surpriseBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                surpriseBtn.style.transform = 'scale(1)';
            }, 150);
            break;
    }
});

// Welcome animation on page load
window.addEventListener('load', () => {
    // Fade in animation for cards
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Welcome confetti after a short delay
    setTimeout(() => {
        confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.8 }
        });
        confettiCount++;
        updateCounters();
    }, 1000);
});

// Add some fun easter eggs
let clickSequence = [];
celebrateBtn.addEventListener('click', () => {
    clickSequence.push(Date.now());
    
    // If user clicks very fast (5 clicks in 2 seconds), trigger special effect
    if (clickSequence.length >= 5) {
        const recentClicks = clickSequence.filter(time => Date.now() - time < 2000);
        if (recentClicks.length >= 5) {
            // Special rapid-click celebration
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    confetti({
                        particleCount: 20,
                        angle: Math.random() * 360,
                        spread: 30,
                        origin: { 
                            x: Math.random(),
                            y: Math.random()
                        }
                    });
                }, i * 100);
            }
            confettiCount += 10;
            updateCounters();
            clickSequence = []; // Reset sequence
        }
    }
    
    // Keep only recent clicks
    clickSequence = clickSequence.filter(time => Date.now() - time < 2000);
});

// Console welcome message
console.log(`
🎉 Welcome to the Hello Cline Demo!
🚀 This project showcases modern web development with Cline AI
💡 Try the keyboard shortcuts: C (celebrate), R (reset), S (surprise)
🎨 Hover over the feature cards to see them come alive!
⚡ Click the celebrate button rapidly for a special surprise!

Built with ❤️ using Cline AI Assistant
`);

// Initialize counters on load
updateCounters();
