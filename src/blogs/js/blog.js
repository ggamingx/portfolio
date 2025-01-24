const blogId = window.location.pathname;
const converter = new showdown.Converter();
converter.setFlavor('github');

fetch(`/api/${blogId}`)
    .then(response => response.json())
    .then(data => {
        const blogContainer = document.getElementById('blog-container')
        const blogPost = document.createElement('article')
        blogPost.classList.add('blog-post')

        const imageHTML = data.image
                ? `
                    <img src="${data.image.img}" class="blog-image" alt="${data.image.imgTitle}">
                    <div class="image-meta">
                    <p>${data.image.imgAuthor ? `Cover by <a href="${data.image.imgAuthorLink}">${data.image.imgAuthor}</a> | ` : ''}${data.image.imgTitle}</p>
                    </div>
                ` : ``;

        blogPost.innerHTML = `
            <h1 class="blog-title">${data.title}</h1>
            <div class="blog-meta">
                <p>By <span class="author">Ghali</span> | <span class="date">${data.date}</span></p>
            </div>
            ${imageHTML}
            <section class="blog-content">
                ${converter.makeHtml(data.content)}
            </section>
        `
        blogContainer.appendChild(blogPost)
    })
    .catch(error => console.error(`error fetching the blog ${error}`))