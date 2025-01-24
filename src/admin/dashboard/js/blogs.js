function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('visible');
}

function toggleSidebarOnResize() {
    document.querySelectorAll('.idNum').forEach((el) => {
        const sidebar = document.getElementById('sidebar')
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('visible')
        } else {
            sidebar.classList.add('visible')
        }
    });
}

toggleSidebarOnResize()

window.addEventListener('resize', toggleSidebarOnResize);

document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleButton = document.querySelector('.sidebar-toggle');
    
    if (!sidebar.contains(event.target) && !sidebarToggleButton.contains(event.target)) {
        sidebar.classList.remove('visible');
    }
});


let startX = 0;
let endX = 0;

document.addEventListener('touchstart', function(event) {
    startX = event.touches[0].pageX;
});

document.addEventListener('touchend', function(event) {
    endX = event.changedTouches[0].pageX;

    if (startX - endX > 100) {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.remove('visible');
    }
});

fetch('/api/blogs')
    .then(response => response.json())
    .then(data => {
        const blogContainer = document.getElementById('dashboard-overview')
        data.forEach(blog => {
            const blogElement = document.createElement('div')
            blogElement.classList.add('card')

            const imageHTML = blog.image
                ? `<img src="${blog.image.img}" class="blog-image" alt="${blog.image.imgTitle}">`
                : ``;

            blogElement.innerHTML = `
                <div class="blog-info">
                    ${imageHTML}
                    <h3>${blog.title}</h3> 
                    <p>${blog.description}</p>
                </div>
                <div class="action-btns">
                    <a href="../../blogs/${blog.id}" class="view">View blog <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                    <a href="blogs/edit/${blog.id}" class="edit">Edit blog <i class="fa-solid fa-pen"></i></a>
                </div>
            `
            blogContainer.appendChild(blogElement)
        });
    })
    .catch(error => console.error('error fetching blogs: ', error))