// Search and filter functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm) {
            console.log(`Searching for: ${searchTerm}`);
            // Here you would implement actual search logic
            // For now, we'll just log the search term
        }
    }

    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            console.log(`Filter selected: ${filter}`);
            
            // Here you would implement actual filtering logic
            // For now, we'll just log the filter selection
        });
    });

    // Search input focus effects
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
        searchInput.parentElement.style.transform = 'translateY(-2px)';
    });

    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        searchInput.parentElement.style.transform = 'translateY(0)';
    });
});