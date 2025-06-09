// Dark mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Set dark theme as default, then check for saved preference
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Language tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        
        // Update active button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding content
        tabContents.forEach(content => {
            if (content.getAttribute('data-lang') === lang) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    });
});

// Resources table
const resources = [
    { category: 'Roadmap', resource: 'Roadmap.sh', link: 'https://roadmap.sh' },
    { category: 'DSA', resource: 'Striver Sheet', link: 'https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/' },
    { category: 'DSA', resource: 'Aditya Verma', link: 'https://www.youtube.com/c/AdityaVermaTheCodingInterview' },
    { category: 'DSA', resource: 'Love Babbar', link: 'https://www.youtube.com/playlist?list=PLDzeHZWIZsTr54_TH-Nz3xCWYy6IaD4xK' },
    { category: 'DSA', resource: 'NeetCode', link: 'https://www.youtube.com/c/NeetCode' },
    { category: 'DSA', resource: 'Pepcoding', link: 'https://www.youtube.com/c/Pepcoding' },
    { category: 'CS', resource: 'Computer Networks', link: 'https://www.youtube.com/watch?v=IPvYjXCsTg8' },
    { category: 'CS', resource: 'Operating Systems', link: 'https://www.youtube.com/playlist?list=PL0zysOflRCekiZgT2STmOQn3WcFhn5-Da' },
    { category: 'CS', resource: 'DBMS', link: 'https://www.youtube.com/playlist?list=PL0zysOflRCek9z3WDUaT4JStcB1CmFdWL' },
    { category: 'Web', resource: 'Web Dev Course', link: 'https://www.youtube.com/playlist?list=PLjVLYmrlmjGfGlgikL1I-DZ8jsT1uE4zE' },
];

const resourceTable = document.getElementById('resourceTable');
const searchInput = document.getElementById('resourceSearch');

// Populate table
function populateTable(data) {
    const tbody = resourceTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.category}</td>
            <td>${item.resource}</td>
            <td><a href="${item.link}" target="_blank" class="resource-link">Visit</a></td>
        `;
        tbody.appendChild(row);
    });
}

// Search functionality
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredResources = resources.filter(item => 
        item.category.toLowerCase().includes(searchTerm) ||
        item.resource.toLowerCase().includes(searchTerm)
    );
    populateTable(filteredResources);
});

// Initial table population
populateTable(resources);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.style.display = '';
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});
