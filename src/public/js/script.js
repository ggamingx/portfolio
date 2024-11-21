fetch('/api/projects')
  .then(response => response.json())
  .then(data => {
    const projectContainer = document.getElementById('projects');
    data.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-card');

        function button() {
            return Object.entries(project.links)
              .map(([name, details]) => {
                return `
                  <a href="${details.link}" class="button">
                    ${details.icon ? `<i class="${details.icon}"></i>` : ''} ${name}
                  </a>
                `;
              })
              .join('');
          }

        projectElement.innerHTML = `
        <div class="project-name"><h3>${project.title}</h3></div>
        <div class="project-description">${project.description}</div>
        <div class="project-technologies"><h4><i class="fa-solid fa-code"></i> Technologies</h4><ul class="techs">${project.technologies.map(tech => `<li>${tech}</li>`).join('')}</ul></div>
        <div class="buttons">
        ${button()}
        </div>
        `;

        projectContainer.appendChild(projectElement);
    });
  })
  .catch(error => console.error('Error fetching projects:', error));