// Add floating particles to any page
function addFloatingParticles() {
    // Check if particles already exist
    if (document.querySelector('.floating-particles')) {
        return;
    }

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    
    // Create 10 particles
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// Add tech grid background
function addTechGrid() {
    // Check if grid already exists
    if (document.querySelector('.tech-grid')) {
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'tech-grid';
    document.body.appendChild(grid);
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        addFloatingParticles();
        addTechGrid();
    });
} else {
    addFloatingParticles();
    addTechGrid();
}
