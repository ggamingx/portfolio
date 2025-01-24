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