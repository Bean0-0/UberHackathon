


//mapboxgl.accessToken = 'ACCESS_TOKEN';
//navigator.geolocation.getCurrentPosition(successLoc, errorLoc,{ enableHighAccuracy: true});

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
    
}

document.getElementById("startInp").addEventListener("keypress",function(event){
    if(event.key == "Enter"){
        askLocation("start");
    }
});

document.getElementById("endInp").addEventListener("keypress",function(event){
    if(event.key == "Enter"){
        askLocation("end");
    }
});


function recieveLocation(resp){
    console.log(resp);
    setupMap([resp[1][0],resp[1][1]]);
}


eel.expose(recieveLocation);


//scoreing cars
function scoreCar(id){//scores car co2 emissions out of severe, poor, average, good, excellent 
	if(!(id in carData)){
		return "Not available";
	}
	const diff = carData[id] - carData['avg'];

	if(Math.abs(diff) <= carData['dev']) return "Average";//within avg deviation

	if(carData[id] > carData['avg'] + carData['dev']){
		if(carData[id]> carData['avg'] + (carData['dev'] * 1.7)) return "Severe";
		return "Poor";
	}

	if(carData[id] < carData['avg'] - carData['dev']){
		if(carData[id] < carData['avg'] - (carData['dev'] * 1.7)) return "Excellent";
		return "Good";
	}
}


//generate drivers

const names = {
    "male":["Elijah","Mateo","Hiroshi","Liam","Santiago","Nikolai","Carlos","Alessandro","Mohammed","Sebastian","Diego","Mikhail","Luca","Javier","Ravi","Andrei","Joaquin","Hassan","Fernando","Akio"],
    "female":["Sophia","Ava","Layla","Isabella","Mia","Olivia","Zara","Nina","Carmen","Ingrid","Mei","Priya","Ana","Julia","Emmy","Maria","Camila","Elise","Victoria","Margaret"],
    "last":["Smith","Garcia","Kim", "Muller", "Li", "Sago", "Singh", "Rossi", "Lopez", "Nguyen", "Martinez", "Gonzalez", "Chen", "Kowalski", "Abe", "Ivanov", "Ferreira", "Ahmed", "Olsen", "Fuentes"]
}

function capitalize(s){
    let t = "";
    for(let i = 0; i < s.length; i++){
        if(i == 0 || s[i-1] == ' '){
            t += s[i].toUpperCase();
        }
        else t += s[i];
    }

    return t;
}

function randChoice(arr){
    return arr[parseInt(Math.random() * arr.length)];
}

/*
blind
deaf
non-verbal
service animal
wheelchair
neurodivergent
infant
elderly
*/

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
function generateDriver(target){//generates a random driver relatively close to a target
    //random car
    const cars = Object.keys(carData);
    const car = cars[parseInt(cars.length * Math.random())];
    let carName = car.split(":")
    carName = (carName[0] + " " + carName[1]).toUpperCase();
    const score = scoreCar(car);
    const plate = randChoice(letters) + randChoice(letters) + randChoice(letters) + " • " +randChoice(numbers) + randChoice(numbers) + randChoice(numbers) + randChoice(numbers);


    //random person
    const gender = randChoice(["male","female"]);
    const name = randChoice(names[gender]) + " " + randChoice(names["last"]);

    //random positions
    const lon = target[0] + (.3 * Math.random());
    const lat = target[1] + (.3 * Math.random());

    ///random accomodations
    const accom = {
        "blind":randChoice([true,false,false]),
        "deaf":randChoice([true,false,false]),
        "non-verbal":randChoice([true,false,false]),
        "service animal":randChoice([true,false,false]),
        "wheelchair":randChoice([true,false,false]),
        "neurodivergent":randChoice([true,false,false]),
        "infant":randChoice([true,false,false]),
        "elderly":randChoice([true,false,false])

    }

    return [name, car, carName, plate, score, accom, [lon,lat]];

}



function displayCar(carInfo){
    document.getElementById("map").style["display"] = "none";
    document.getElementById("bottomBar").innerHTML = `
    <div id='carDisplay'>
        <div id='carInfo' style=''>
            <p id='carName'>${carInfo[2]}</p>
            <p id='carPlate'>${carInfo[3]}</p>
        </div>
        <img src='assets/car.png'>

    </div>

    <p style='font-weight:800;opacity:.5'>ACCESSIBILITY ACCOMODATIONS</p>
    <p>

    <button class='confirmButton'>Confirm Ride</button>
    `
}