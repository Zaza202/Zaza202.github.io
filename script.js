// Smooth scrolling for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.add(savedTheme);
    updateIcon(savedTheme);
}

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const currentTheme = document.body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode';
    localStorage.setItem('theme', currentTheme);
    updateIcon(currentTheme);
});

// Update the icon based on the current theme
function updateIcon(theme) {
    if (theme === 'light-mode') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Duplicate tech-row content to ensure it covers the entire page width
document.addEventListener("DOMContentLoaded", () => {
    const techRows = document.querySelectorAll(".tech-row");

    techRows.forEach((row) => {
        // Get the original content of the row
        const originalContent = row.innerHTML;

        // Calculate how many times to duplicate the content
        const viewportWidth = window.innerWidth;
        const rowWidth = row.scrollWidth; // Get the total width of the row
        const repetitions = Math.ceil((viewportWidth * 2) / rowWidth); // Duplicate enough to cover 2x viewport width

        // Duplicate the content
        for (let i = 0; i < repetitions; i++) {
            row.innerHTML += originalContent;
        }
    });
});

// Scroll effect for tech rows
document.addEventListener("scroll", () => {
    const skillsSection = document.getElementById("skills");
    const techRows = document.querySelectorAll(".tech-row");

    // Get the bounding rectangle of the skills section
    const sectionRect = skillsSection.getBoundingClientRect();
    const sectionTop = sectionRect.top;
    const sectionBottom = sectionRect.bottom;

    // Check if the skills section is in the viewport
    if (sectionTop < window.innerHeight && sectionBottom > 0) {
        const scrollY = window.scrollY - skillsSection.offsetTop; // Adjust scroll position relative to the section

        techRows.forEach((row, index) => {
            // Alternate direction for each row
            const direction = index % 2 === 0 ? 1 : -1; // Even rows move right, odd rows move left
            const offset = scrollY * direction * 0.5; // Adjust speed by multiplying by a factor

            // Apply the transform to move the row
            row.style.transform = `translateX(${offset}px)`;
        });
    } else {
        // Reset the transform if the section is not in the viewport
        techRows.forEach((row) => {
            row.style.transform = `translateX(0)`;
        });
    }
});