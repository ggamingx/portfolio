fetch('/api/blogs')
    .then(response => response.json())
    .then(data => {
        const blogContainer = document.getElementById('blog-container')
        data.forEach(blog => {
            const blogElement = document.createElement('a')
            blogElement.classList.add('card')
            blogElement.setAttribute('href', `/blogs/${blog.id}`)

            const imageHTML = blog.image
                ? `<img src="${blog.image.img}" class="blog-image" alt="${blog.image.imgTitle}">`
                : ``;

            blogElement.innerHTML = `
                <div class="blog-info">
                    ${imageHTML}
                    <h3>${blog.title}</h3> 
                    <p>${blog.description}</p>
                </div>
            `
            blogContainer.appendChild(blogElement)
        });
    })
    .catch(error => console.error('error fetching blogs: ', error))