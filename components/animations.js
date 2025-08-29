// Animation utilities and effects
document.addEventListener('DOMContentLoaded', () => {
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize button animations
    initButtonAnimations();
    
    // Initialize card hover effects
    initCardEffects();
});

function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn, .view-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = 'translateY(-2px) scale(1)';
        });
    });
}

function initCardEffects() {
    const cards = document.querySelectorAll(
        '.collection-card, .artifact-card, .exhibition-card, .category-card'
    );
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const placeholder = card.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.style.borderColor = 'var(--accent-color)';
                placeholder.style.borderWidth = '3px';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const placeholder = card.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.style.borderColor = '#ccc';
                placeholder.style.borderWidth = '2px';
            }
        });
    });
}

// Utility function for staggered animations
export function staggerAnimation(elements, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * delay);
    });
}

// Utility function for fade in on scroll
export function fadeInOnScroll(selector) {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });
    
    elements.forEach(el => observer.observe(el));
}