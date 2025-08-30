// Artifact viewer functionality
document.addEventListener('DOMContentLoaded', () => {
    initImageControls();
    initGalleryAnimations();
    initInteractiveFeatures();
});

function initImageControls() {
    const zoomBtn = document.querySelector('.zoom-btn');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const rotateBtn = document.querySelector('.rotate-btn');
    const mainImage = document.querySelector('.main-artifact-placeholder');
    
    let rotation = 0;
    let isZoomed = false;

    // Zoom functionality
    if (zoomBtn && mainImage) {
        zoomBtn.addEventListener('click', () => {
            if (!isZoomed) {
                mainImage.style.transform = `scale(1.5) rotate(${rotation}deg)`;
                mainImage.style.cursor = 'zoom-out';
                zoomBtn.textContent = '🔍 Zoom Out';
                isZoomed = true;
            } else {
                mainImage.style.transform = `scale(1) rotate(${rotation}deg)`;
                mainImage.style.cursor = 'zoom-in';
                zoomBtn.textContent = '🔍 Zoom';
                isZoomed = false;
            }
        });
    }

    // Rotation functionality
    if (rotateBtn && mainImage) {
        rotateBtn.addEventListener('click', () => {
            rotation += 90;
            const scale = isZoomed ? 1.5 : 1;
            mainImage.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
        });
    }

    // Fullscreen functionality (placeholder)
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            console.log('Fullscreen mode would be implemented here');
            // Future implementation for fullscreen image viewing
        });
    }

    // Click to zoom on main image
    if (mainImage) {
        mainImage.style.cursor = 'zoom-in';
        mainImage.addEventListener('click', () => {
            zoomBtn.click();
        });
    }
}

function initGalleryAnimations() {
    // Intersection observer for gallery items
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        observer.observe(item);
    });

    // Gallery item click handlers
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log('Gallery item clicked - would open lightbox');
            // Future implementation for image lightbox
        });
    });
}

function initInteractiveFeatures() {
    const featureBtns = document.querySelectorAll('.feature-btn');
    
    featureBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const featureType = e.target.textContent.toLowerCase();
            
            // Add visual feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
            
            // Log feature interaction (placeholder for actual implementation)
            console.log(`${featureType} feature activated`);
            
            // Future implementation would handle:
            // - 3D model loading
            // - AR experience launch
            // - Audio guide playback
        });
    });

    // Add to favorites functionality
    const favoriteBtn = document.querySelector('.btn-primary');
    if (favoriteBtn && favoriteBtn.textContent.includes('Favorites')) {
        let isFavorited = false;
        
        favoriteBtn.addEventListener('click', () => {
            if (!isFavorited) {
                favoriteBtn.textContent = '❤️ Added to Favorites';
                favoriteBtn.style.background = '#22c55e';
                isFavorited = true;
            } else {
                favoriteBtn.textContent = 'Add to Favorites';
                favoriteBtn.style.background = 'var(--accent-color)';
                isFavorited = false;
            }
        });
    }

    // Share functionality
    const shareBtn = document.querySelector('.btn-secondary');
    if (shareBtn && shareBtn.textContent.includes('Share')) {
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(window.location.href);
                shareBtn.textContent = '✓ Link Copied';
                setTimeout(() => {
                    shareBtn.textContent = 'Share';
                }, 2000);
            }
        });
    }
}

// Smooth scroll to sections within artifact pages
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = section.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Export for use in other modules
export { scrollToSection };