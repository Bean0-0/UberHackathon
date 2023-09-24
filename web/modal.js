function displayModal(html){
    document.getElementById("modalContent").innerHTML = html;
    document.getElementById("modal").style["top"] = 0;
}

function closeModal(){
    document.getElementById("modal").style["top"] = "";
}