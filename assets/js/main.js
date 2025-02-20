document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.nav-links a');
    const contentContainer = document.getElementById('content-container');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Load initial home page content
    loadPage('home');

    // Set up event listeners for navbar links
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const page = link.getAttribute('data-page');
            loadPage(page);
        });
    });

    // Function to load page content dynamically
    function loadPage(page) {
        fetch(`${page}.html`)
            .then(response => response.text())
            .then(data => {
                contentContainer.innerHTML = data;
                updateActiveLink(page);
    
                // Close mobile menu
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
    
                // Handle home page buttons
                if (page === 'home') {
                    // CV button
                    const cvButton = contentContainer.querySelector('#voirMonParcours');
                    if (cvButton) {
                        cvButton.addEventListener('click', (e) => {
                            e.preventDefault();
                            loadPage('cv');
                        });
                    }
    
                    // Contact button
                    const contactButton = contentContainer.querySelector('#contactButton');
                    if (contactButton) {
                        contactButton.addEventListener('click', (e) => {
                            e.preventDefault();
                            loadPage('contact');
                        });
                    }
                }
            })
            .catch(error => console.error('Error loading page:', error));
    }
    // Update the active class for the current link
    function updateActiveLink(page) {
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });
    }

    // Dark Mode Toggle
    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });

    // Load saved theme
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    // Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
});
