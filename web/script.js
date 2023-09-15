function askLocation(typ){
    let inp = document.getElementById("startInp").value;
    if(typ == "end") inp = document.getElementById("endInp").value;
    eel.sendLocation(inp,typ);
}

function recieveLocation(resp){
    console.log(resp);
}

eel.expose(recieveLocation);