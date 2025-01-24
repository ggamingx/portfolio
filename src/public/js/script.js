function showPopup() {
  const popup = document.getElementById('emailPopup');
  popup.classList.add('show');
  
  setTimeout(() => {
      popup.classList.remove('show');
  }, 2000);
}

document.getElementById('emailIcon').addEventListener('click', () => {
  navigator.clipboard.writeText('ghalibelmkaddame@gmail.com');
  showPopup();
});

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

fetch('/api/blogs')
  .then(response => response.json())
  .then(data => {
    const blogContainer = document.getElementById('blogscs')
    data.forEach(blog => {
      const blogElement = document.createElement('div');
      blogElement.classList.add('blog-card');

      const imageHTML = blog.image
        ? `<img src="${blog.image.img}" class="blog-image" alt="${blog.image.imgTitle}">`
        : ``;

      blogElement.innerHTML = `
        <div class="card-image">
            ${imageHTML}
        </div>
        <div class="blog-text">
            <div class="blog-title"><h3>${blog.title}</h3></div>
            <div class="blog-description">${blog.description}</div>
            <div class="buttons">
                <a class="button" href="/blogs/${blog.id}">Read more</a>
            </div>
        </div>
      `;

      blogContainer.appendChild(blogElement);
    })
  })
  .catch(error => console.error('Error fetching blogs:', error));

const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
                behavior: 'smooth'
            });
        }
    });
});