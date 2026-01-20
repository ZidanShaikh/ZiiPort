// Load data from JSON
async function loadData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    
    // Populate Hero
    document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
    document.getElementById('hero-name').textContent = data.hero.name;
    document.getElementById('hero-tagline').textContent = data.hero.tagline;
    
    // Populate About
    document.getElementById('about-description').innerHTML = data.about.description;
    document.getElementById('currently-list').innerHTML = data.about.currently
      .map(item => `→ ${item}`)
      .join('<br>');
    
    // Populate Skills
    const skillsContainer = document.getElementById('skills-container');
    Object.keys(data.skills).forEach(category => {
      const skillDiv = document.createElement('div');
      skillDiv.className = 'skill-category';
      skillDiv.innerHTML = `
        <h4>${category}</h4>
        <ul>
          ${data.skills[category].map(skill => `<li>${skill}</li>`).join('')}
        </ul>
      `;
      skillsContainer.appendChild(skillDiv);
    });
    
    // Populate Projects
    const projectsContainer = document.getElementById('projects-container');
    data.projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tech-stack">
          ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
        </div>
        ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project →</a>` : ''}
      `;
      projectsContainer.appendChild(card);
    });
    
    // Populate Social Links
    const socialContainer = document.getElementById('social-container');
    data.social.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.target = '_blank';
      a.textContent = `${link.name} →`;
      socialContainer.appendChild(a);
    });
    
    // Populate Footer
    const footerText = data.footer.text.replace('{year}', new Date().getFullYear());
    document.getElementById('footer-text').innerHTML = footerText.replace(
      new Date().getFullYear(),
      `<span>${new Date().getFullYear()}</span>`
    );
    
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Reveal elements on scroll
const reveals = document.querySelectorAll('.reveal');

function revealElements() {
  const windowHeight = window.innerHeight;
  
  reveals.forEach(el => {
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < windowHeight - 100) {
      el.classList.add('visible');
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


// Initialize
window.addEventListener('scroll', revealElements);
window.addEventListener('load', async () => {
  await loadData();
  revealElements();
  addMagneticEffect();
});