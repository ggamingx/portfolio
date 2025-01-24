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


const input = document.getElementById('file-upload')

input.addEventListener("change", updateImageDisplay);

const urlImgInput = document.getElementById('image-url-input');

const urlImgBtn = document.getElementById('img-url-btn');

function deleteFile() {
    input.value = "";
    urlImgInput.value = "";
    const imagePreviewElement = document.getElementById('file');
    if (imagePreviewElement) {
        imagePreviewElement?.remove();
        urlImgBtn.classList.remove('appear')
        urlImgInput.classList.remove('updated') 
    } else {
        const uploadedFileError = document.getElementById('uploaded-file-error')
        uploadedFileError.classList.add('hidden')
        urlImgBtn.classList.remove('appear')
        urlImgInput.classList.remove('updated')
    }
    updateImageDisplay();
}

function validIMGURL (url) {
    return url.match(/^https?:\/\/.*\.(jpeg|jpg|gif|png|webp)/)
}

function updateImageDisplay() {
    const fileInputContainer = document.getElementById('file-input-container')
    const fileUploadContainer = document.getElementById('file-upload-container')
    const imagePreview = document.getElementById('image-preview')

    const imgURL = urlImgInput.value.trim();

    if (imgURL === "") {
        imagePreview.classList.add('hidden')
        fileUploadContainer.classList.remove('hidden')
    } else if (imgURL) {
        if (validIMGURL(imgURL)) {
            imagePreview.classList.remove('hidden')
            fileUploadContainer.classList.add('hidden')
            const imagePreviewElement = document.createElement('div')
            imagePreviewElement.id = 'file'
            imagePreviewElement.innerHTML = `<div class="file-info-action">
                    <img src="${imgURL}" class="image-uploaded">
                    </div>
                    <a onclick="deleteFile()"><i class="fa-solid fa-circle-xmark" style="font-size: 1.8rem; cursor: pointer;"></i></a>
                    <div class="image-info-input-container">
                        <input type="text" placeholder="Image Title" name="imageTitle" class="image-info form f" id="imageTitle">
                        <input type="text" placeholder="Image SRC/author" name="imageAuthor" id="imageAuthor" class="image-info form f">
                        <input type="url" placeholder="Image author link" name="imageAuthorLink" id="imageAuthorLink" class="image-info form f">
                        <input type="url" placeholder="image Link" name="imageLink" class="image-info form f disabled" value="${imgURL}" disabled">
                    </div>
                    `
            imagePreview.appendChild(imagePreviewElement)
        } else {
            const uploadFileError = document.getElementById('uploaded-file-error')
            uploadFileError.classList.remove('hidden')
            fileUploadContainer.classList.add('hidden')
            urlImgBtn.classList.remove('appear')
            urlImgInput.classList.remove('updated') 
        }
    }
}

urlImgInput.addEventListener('input', updateURLinput)

function updateURLinput () {

    if (urlImgInput.value.trim() !== '') {
        urlImgBtn.classList.add('appear')
        urlImgInput.classList.add('updated')
    } else {
        urlImgBtn.classList.remove('appear')
        urlImgInput.classList.remove('updated') 
    }
}

const pathParts = window.location.pathname.split('/');
const type = pathParts[3];
const id = pathParts[5];

document.addEventListener('DOMContentLoaded', async () => {
  
    const blogFields = document.getElementById('blog-post');
    const projectFields = document.getElementById('project-post');
    const blogSidebar = document.getElementById('blogs');
    const projectSidebar = document.getElementById('projects');
  
    if (type === 'blogs') {
      blogFields.classList.remove('hidden');
      blogSidebar.classList.add('active');
    } else if (type === 'projects') {
      projectFields.classList.remove('hidden');
      projectSidebar.classList.add('active');
    }

    fetch(`/api/${type}/${id}`)
        .then(response => response.json())
        .then(data => {

            if (type === "blogs") {
                document.getElementById('btitle').value = data.title;
                document.getElementById('bsdescription').value = data.description;
                document.getElementById('content').value = data.content;
                if (data.image) {
                    document.getElementById('image-url-input').value = data.image.img;
                    updateImageDisplay()
                    document.getElementById('imageTitle').value = data.image.imgTitle;
                    document.getElementById('imageAuthor').value = data.image.imgAuthor;
                    document.getElementById('imageAuthorLink').value = data.image.imgAuthorLink;
                }
            } else if (type === "projects") {
                alert('soon')
            }
            
        })
})

// i'll finish it later

document.getElementById('blog-post').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    try {
        const response = await fetch(`../../api/blogs/${id}`, {
            method: 'PUT',
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Failed to put: ${response.statusText}`)
        }
    } catch(error) {
        console.error('error posting', error)
        alert('there was an error puting the data')
    }
})