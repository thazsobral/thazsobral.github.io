window.onscroll = function() {
    addClassHeader()
}

var header = document.getElementById("top-menu")
var stick = header.offsetTop

function addClassHeader() {
    if(window.pageYOffset > stick) {
        header.setAttribute("class", "stick")
    } else {
        header.classList.remove("stick")
    }
}
