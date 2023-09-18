


mapboxgl.accessToken = 'ACCESS_KEY';
navigator.geolocation.getCurrentPosition(successLoc, errorLoc,{ enableHighAccuracy: true});

function successLoc(pos){
    console.log(pos);
    console.log(pos.coords.longitude, pos.coords.latitude);
    setupMap([pos.coords.longitude,pos.coords.latitude]);
}

function errorLoc(){

}

function setupMap(center){
    document.getElementById('map').innerHTML = "";
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center:center,
        zoom:17
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    const directions = new MapboxDirections({
        accessToken:mapboxgl.accessToken
    })

    map.addControl(directions,"top-left");

    for(element of document.getElementsByTagName("input")){
        if(element.getAttribute("placeholder") == "Choose a starting place"){
            element.id="hiddenStartInp";
        }
        if(element.getAttribute("placeholder") == "Choose destination"){
            element.id="hiddenEndInp";
        }
    }

    //hide ui we dont want
    for(element of document.getElementsByClassName("mapbox-directions-component")){
        element.style["display"] = "none";
    }
    for(element of document.getElementsByClassName("mapbox-directions-instructions")){
        element.style["display"] = "none";
    }


 

}

//keyboard events to simulate search in mapbox
const spaceEvent = new KeyboardEvent('keydown', {
    code: 'Space',
    key: 'Space',
    charCode:32,
    keyCode: 32,
    view: window,
    bubbles: true
});

const enterEvent = new KeyboardEvent('keydown', {
    code: 'Enter',
    key: 'Enter',
    charCode: 13,
    keyCode: 13,
    view: window,
    bubbles: true
});

function askLocation(typ){
    let inp = document.getElementById("startInp").value;
    let hiddenInp = document.getElementById("hiddenStartInp");
    if(typ == "end"){
        inp = document.getElementById("endInp").value;
        hiddenInp = document.getElementById("hiddenEndInp");
    }


    hiddenInp.value = inp;
    //Some weird simulation stuff
    hiddenInp.dispatchEvent(spaceEvent);
    setTimeout(function(){
        hiddenInp.dispatchEvent(enterEvent);
    },500)//slight delay because it takes some time for the address to load in
    


    //eel.sendLocation(inp,typ);
}

function recieveLocation(resp){
    console.log(resp);
    setupMap([resp[1][0],resp[1][1]]);
}


eel.expose(recieveLocation);


