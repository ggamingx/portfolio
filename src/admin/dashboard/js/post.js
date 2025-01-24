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

function getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        active: urlParams.get('active'),
        type: urlParams.get('type')
    };
}

function dataFromURL() {
    const params = getQueryParams();

    const sidebar = document.getElementById(params.active);
    sidebar.classList.add('active')

    const selectElement = document.getElementById('type-select');
   if (params.type) {
    const optionToSelect = selectElement.querySelector(`option[value="${params.type}"]`);
    if (optionToSelect) {
      optionToSelect.selected = true;
      const contentToShow = document.getElementById(`${params.type}-post`);
      if (contentToShow) {
        contentToShow.classList.remove('hidden')
      }
    }
  }
}

dataFromURL()

document.getElementById('type-select').addEventListener('change', function () {
    const selectedValue = this.value;

    document.querySelectorAll('.post-content').forEach(content => {
        content.classList.add('hidden');
      })

    const contentToShow = document.getElementById(`${selectedValue}-post`);
    if (contentToShow) {
        contentToShow.classList.remove("hidden")
    }
})

let techCounter = 0;
let linkCounter = 0;

function deleteItem(type, count) {
    if (type === 'tech') {
        const techInputElement = document.getElementById(`${type}-input-count:${count}`);
        techInputElement.remove();
    };
    if (type === 'link') {
        const linkInputElement = document.getElementById(`${type}-input-count:${count}`)
        linkInputElement.remove();
    }
}

function addItem(type) {
    if (type === 'tech') {
        techCounter++;
        const techInputContainer = document.getElementById('tech-input-container')
        const techInputElement = document.createElement('div')
        techInputElement.id = `tech-input-count:${techCounter}`
        techInputElement.innerHTML = `<input type="text" placeholder="Technologie" name="tech" class="tech-form" required name="tech">
          <button onclick="deleteItem('${type}', ${techCounter})" class="delete btn"><i class="fa-solid fa-trash"></i></button>`
        techInputContainer.appendChild(techInputElement)
    };
    if (type === 'link') {
        linkCounter++
        const linkInputContainer = document.getElementById('link-input-container')
        const linkInputElement = document.createElement('div')
        linkInputElement.id = `link-input-count:${linkCounter}`
        linkInputElement.classList.add('link-input-container')
        linkInputElement.innerHTML = `<input type="text" placeholder="Title" required name="ltitle">
          <input type="text" placeholder="Icon (fa form)" name="licon">
          <input type="text" placeholder="Link" required name "llink">
          <button onclick="deleteItem('${type}', ${linkCounter})" class="delete btn"><i class="fa-solid fa-trash"></i></button>`
        linkInputContainer.appendChild(linkInputElement)
    }
}

const fileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon",
];
  
function validFileType(file) {
return fileTypes.includes(file.type);
}

function returnFileSize(number) {
    if (number < 1e3) {
      return `${number} bytes`;
    } else if (number >= 1e3 && number < 1e6) {
      return `${(number / 1e3).toFixed(1)} KB`;
    } else {
      return `${(number / 1e6).toFixed(1)} MB`;
    }
}

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

    const curFiles = input.files;
    const imgURL = urlImgInput.value.trim();
    if (curFiles.length === 0 && imgURL === "") {
      imagePreview.classList.add('hidden')
      fileUploadContainer.classList.remove('hidden')
    } else if(curFiles.length >= 2) {
        alert('only one file can be uploaded')
    } else if (curFiles.length === 1) {
        if (validFileType(curFiles[0])) {
            imagePreview.classList.remove('hidden')
            fileUploadContainer.classList.add('hidden')
            const imagePreviewElement = document.createElement('div')
            imagePreviewElement.id = 'file'
            imagePreviewElement.innerHTML = `<div class="file-info-action">
                    <img src="${URL.createObjectURL(curFiles[0])}" class="image-uploaded">
                    <div class="file-name"><span>File Name: ${curFiles[0].name}</span></div>
                    <div class="file-size"><span>File size: ${returnFileSize(curFiles[0].size)}</span></div>
                    </div>
                    <a onclick="deleteFile()"><i class="fa-solid fa-circle-xmark" style="font-size: 1.8rem; cursor: pointer;"></i></a>
                    <div class="image-info-input-container">
                        <input type="text" placeholder="Image Title" name="imageTitle" class="image-info form f">
                        <input type="text" placeholder="Image SRC/author" name="imageAuthor" class="image-info form f">
                        <input type="url" placeholder="Image author link" name="imageAuthorLink" class="image-info form f">
                    </div>
                    `
            imagePreview.appendChild(imagePreviewElement)
        } else {
            const uploadFileError = document.getElementById('uploaded-file-error')
            uploadFileError.classList.remove('hidden')
            fileUploadContainer.classList.add('hidden')
        }
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
                        <input type="text" placeholder="Image Title" name="imageTitle" class="image-info form f">
                        <input type="text" placeholder="Image SRC/author" name="imageAuthor" class="image-info form f">
                        <input type="url" placeholder="Image author link" name="imageAuthorLink" class="image-info form f">
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

document.getElementById('project-post').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const response = await fetch('../../api/project', {
      method: 'POST',
      body: formData,
    });
});

document.getElementById('blog-post').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    try {
        const response = await fetch('../../api/blogs', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`Failed to post data: ${response.statusText}`)
        }

        const data = await response.json();

        window.location.replace(`../../../blogs/${data.id}`);
    } catch {error} {
        console.error('Error posting', error)
        alert('there was an issue submitting your blog')
    }
});