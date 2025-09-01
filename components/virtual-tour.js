// Virtual Tour functionality
document.addEventListener('DOMContentLoaded', () => {
    initTourControls();
    initHelpModal();
    initHighlightNavigation();
    initTourAnimations();
});

function initTourControls() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const helpBtn = document.getElementById('helpBtn');
    const shareBtn = document.getElementById('shareBtn');
    const iframe = document.querySelector('.viewer-frame iframe');

    // Fullscreen functionality
    if (fullscreenBtn && iframe) {
        fullscreenBtn.addEventListener('click', () => {
            const viewerFrame = iframe.parentElement;
            
            if (!document.fullscreenElement) {
                if (viewerFrame.requestFullscreen) {
                    viewerFrame.requestFullscreen();
                } else if (viewerFrame.webkitRequestFullscreen) {
                    viewerFrame.webkitRequestFullscreen();
                } else if (viewerFrame.msRequestFullscreen) {
                    viewerFrame.msRequestFullscreen();
                }
                
                fullscreenBtn.querySelector('.control-label').textContent = 'Exit Full';
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                
                fullscreenBtn.querySelector('.control-label').textContent = 'Fullscreen';
            }
        });

        // Listen for fullscreen changes
        document.addEventListener('fullscreenchange', updateFullscreenButton);
        document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
        document.addEventListener('msfullscreenchange', updateFullscreenButton);

        function updateFullscreenButton() {
            const label = fullscreenBtn.querySelector('.control-label');
            if (document.fullscreenElement) {
                label.textContent = 'Exit Full';
            } else {
                label.textContent = 'Fullscreen';
            }
        }
    }

    // Help button functionality
    if (helpBtn) {
        helpBtn.addEventListener('click', () => {
            const helpModal = document.getElementById('helpModal');
            if (helpModal) {
                helpModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Share functionality
    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'Virtual Museum Tour - Digital Museum Archive',
                    text: 'Experience our museum in 3D! Take a virtual tour of our galleries and collections.',
                    url: window.location.href
                }).catch(err => console.log('Error sharing:', err));
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const originalLabel = shareBtn.querySelector('.control-label').textContent;
                    shareBtn.querySelector('.control-label').textContent = 'Copied!';
                    shareBtn.style.background = '#22c55e';
                    shareBtn.style.color = 'white';
                    
                    setTimeout(() => {
                        shareBtn.querySelector('.control-label').textContent = originalLabel;
                        shareBtn.style.background = '';
                        shareBtn.style.color = '';
                    }, 2000);
                }).catch(err => {
                    console.log('Could not copy to clipboard:', err);
                });
            }
        });
    }

    // Add loading state for iframe
    if (iframe) {
        const viewerFrame = iframe.parentElement;
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'tour-loading';
        loadingDiv.innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading Virtual Tour...</p>
        `;
        viewerFrame.appendChild(loadingDiv);

        iframe.addEventListener('load', () => {
            setTimeout(() => {
                loadingDiv.style.opacity = '0';
                setTimeout(() => {
                    loadingDiv.remove();
                }, 300);
            }, 1000);
        });
    }
}

function initHelpModal() {
    const helpModal = document.getElementById('helpModal');
    const closeHelpBtn = document.getElementById('closeHelpModal');

    // Close help modal
    if (closeHelpBtn && helpModal) {
        closeHelpBtn.addEventListener('click', () => {
            helpModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close on overlay click
        helpModal.addEventListener('click', (e) => {
            if (e.target === helpModal || e.target.classList.contains('modal-overlay')) {
                helpModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && helpModal.classList.contains('active')) {
                helpModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

function initHighlightNavigation() {
    const highlightBtns = document.querySelectorAll('.highlight-btn');
    
    highlightBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Add visual feedback
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
            
            // Scroll to tour viewer
            const tourViewer = document.querySelector('.tour-viewer');
            if (tourViewer) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = tourViewer.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Future implementation: Navigate to specific location in tour
            console.log('Navigate to highlight in virtual tour');
        });
    });

    // Highlight card click handlers
    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach(card => {
        card.addEventListener('click', () => {
            const btn = card.querySelector('.highlight-btn');
            if (btn) {
                btn.click();
            }
        });
    });
}

function initTourAnimations() {
    // Intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe cards for animations
    const animatedElements = document.querySelectorAll(
        '.guide-card, .highlight-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effects to control buttons
    const controlButtons = document.querySelectorAll('.control-button');
    controlButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Utility function to handle iframe communication (for future enhancements)
function setupIframeMessaging() {
    window.addEventListener('message', (event) => {
        // Handle messages from the Matterport iframe
        if (event.origin === 'https://my.matterport.com') {
            console.log('Received message from virtual tour:', event.data);
            // Future implementation for tour state synchronization
        }
    });
}

// Initialize iframe messaging
setupIframeMessaging();

// Export functions for use in other modules
export { initTourControls, initHelpModal };