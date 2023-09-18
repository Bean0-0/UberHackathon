var modal = document.getElementById("infoModal");
var openbtn = document.getElementsByClassName("helpButton")[0];
var closebtn = document.getElementById("closeInfo");

openbtn.onclick = function() {
    modal.style.display = "block";
}

closebtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}