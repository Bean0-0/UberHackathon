let startLocation = "";
let endLocation = "";
//track start and end locations

mapboxgl.accessToken = 'ACCESS-KEY';
navigator.geolocation.getCurrentPosition(successLoc, errorLoc,{ enableHighAccuracy: true});

//if the location is successful gained from the user
function successLoc(pos){
    setupMap([pos.coords.longitude,pos.coords.latitude]);
}

function errorLoc(){
    alert("You must allow location tracking to unlock functionality");
}

//draws the map around a center coordinate
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

//entering location in inputs
function askLocation(typ){
    let inp = document.getElementById("startInp").value;
    let hiddenInp = document.getElementById("hiddenStartInp");
    if(typ == "end"){
        inp = document.getElementById("endInp").value;
        hiddenInp = document.getElementById("hiddenEndInp");
    }


    hiddenInp.value = inp;
    //sends values to hidden inputs in map
    hiddenInp.dispatchEvent(spaceEvent);
    setTimeout(function(){
        hiddenInp.dispatchEvent(enterEvent);
    },500)//slight delay because it takes some time for the address to load in
    
}

//bind search events to enter key press
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





//scoreing cars
function scoreCar(id){//scores car co2 emissions out of severe, poor, average, good, excellent 
	if(!(id in carData)){
		return "Not available";
	}
	const diff = carData[id] - carData['avg'];

	if(Math.abs(diff) <= carData['dev'] * .5) return "Average";//within avg deviation

	if(carData[id] > carData['avg'] + carData['dev'] *.5){
		if(carData[id]> carData['avg'] + (carData['dev'] * 1.7)) return "Severe";
		return "Poor";
	}

	if(carData[id] < carData['avg'] - carData['dev'] *.5){
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



const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
function generateDriver(){//generates a random driver
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

    const time = 5 + parseInt(Math.random()*4);

    return [name, car, carName, plate, score, accom, time];

}

let currentDriver = null;

function displayCar(carInfo){
    //keep track of current driver
    currentDriver = carInfo;
    //hide the map
    //document.getElementById("map").style["display"] = "none";
    document.getElementById("map").style["pointerEvents"] = "none";

    //to display the environmental score, we pregenerate the html
    let envDots = "";
    let numDots = 1;
    let envBg = '--accentcool';

    const scores = ["Severe","Poor","Average","Good","Excellent"];
    while(scores[numDots-1] != carInfo[4]){//find number of dots corresponding with score of car
        numDots++;
    }

    for(let i = 0; i < numDots; i++){
        envDots += "<div class='fullDot'></div>";
    }
    for(let i = numDots; i < 5; i++){
        envDots += "<div class='empytDot'></div>";
    }

    //color the env score based on score
    if(numDots < 3) envBg = '--warning-orange';
    if(numDots ==3 ) envBg = '--average-yellow';

    //generate an explanation of score
    const explanations = [
        `This car produces significantly more CO2 than the average car (${parseInt(carData[carInfo[1]])} g/km).`,
        `This car produces notably more CO2 than the average car (${parseInt(carData[carInfo[1]])} g/km).`,
        `This car produces about the same amount of CO2 of average car (${parseInt(carData[carInfo[1]])} g/km).`,
        `This car produces notably less CO2 than the average car (${parseInt(carData[carInfo[1]])} g/km).`,
        `This car produces significantly less CO2 than the average car (${parseInt(carData[carInfo[1]])} g/km).`,
];
    let scoreExplain = explanations[numDots-1];
    


    let accom = "";
    for(let key in carInfo[5]){
        if(carInfo[5][key]){
            accom += `<p class='accom'><img src='assets/svg/check.svg'>${capitalize(key)}</p>`
        }
    }
    const html = `
    <div class='horBar'></div>

    <div id='carDisplay'>
        <div id='carInfo' style=''>
            <p id='carName'>${carInfo[2]}</p>
            <p id='carPlate'>${carInfo[6]} min away</p>
        </div>
        <img src='assets/car-s.png'>
    </div>

    <br>

    <p class='infoSectionHeader'>ENVIRONMENTAL SCORE</p>

    <div id='envScore' style='background:var(${envBg})'>
        <img src='assets/svg/leaf.svg'>
        ${envDots}
        <p>${capitalize(carInfo[4])}</p>
    </div>

    <p id='scoreExplain'><img src='assets/svg/info.svg'>${scoreExplain}</p>

    <br><br>

    <p class='infoSectionHeader'>ACCESSIBILITY ACCOMODATIONS</p>
    <p class='infoSectionSub'>This driver accommodates for the following...</p>
    ${accom}
    <div class='gap'></div>

    
    <button class='confirmButton' onclick='displayDriver()'>Confirm Ride</button>
    <button class='confirmButton newRide' onclick='newRide()'>Find a New Ride</button>
    <button class='confirmButton newRide' onclick='closeModal()'>Back to Map</button>

    <div class='gap'></div>
    `;

    displayModal(html);

}

//make it look like we're looking for drivers for the sake of realism
function fakeSearch(){
    document.getElementById("warning").style["display"] = "none";
    const loadingPopup = document.getElementById("loadingPopup");
    loadingPopup.style["opacity"] = 1;
    loadingPopup.style["pointer-events"] = "all";
    setTimeout(function(){
        //keep generating drivers till we get one that matches the user's preferences
        let driver = generateDriver();
        let match = false;
        let accessOpt = JSON.parse(localStorage.getItem("accessOpt"));
        while(!match){
            match = true;
            for(let key in accessOpt){
                if(accessOpt[key] && driver[5][key] != accessOpt[key]){
                    match = false;
                    break;
                }
            }

            if(!match){
                driver = generateDriver();
            }

        }
        displayCar(driver);
        loadingPopup.style["opacity"] = 0;
        loadingPopup.style["pointer-events"] = "none";
    }, 800 + Math.random()*800);
    
}

function newRide(){
    closeModal();
    fakeSearch();
}

//verify if a valid route has been entered
function verifyRoute(){

    for(let i of document.getElementsByTagName("span")){
        if(i.innerHTML.length > 2){
            if(i.innerHTML.substring(i.innerHTML.length - 2) == "mi"){// if we can find the miles span in the map, then the route has been successfully loaded
                fakeSearch();
                return;
            }
        }
    }
    //show the warning if a route couldn't be found
    document.getElementById("warning").style["display"] = "block";

}


//displays the drivers information after the ride is confirmed
function displayDriver(){
    $("#title").text("Ride Confirmed.");
    closeModal();
    $("#bottomBar").html(`
        <div class='horBar'></div>
        <img id='driverPic' src='assets/driver.png'>
        <h2 id='driverName'>${currentDriver[0]}</h2>
        <p id='timeApprox'>${currentDriver[6]} min away</p>

        <div class='smallGap'></div><div class='smallGap'></div>

        <div id='carDisplay'>
            <div id='carInfo' style=''>
                <p id='carName'>${currentDriver[2]}</p>
                <p id='carPlate'>${currentDriver[3]}</p>
            </div>
            <img src='assets/car-s.png'>
        </div>
        <div class='smallGap'></div>
    `)
}



//user information screen
function toggleInfoScreen(){
    const infoScreen = document.getElementById("infoScreen")
    if(infoScreen.style["pointer-events"] == "all"){
        infoScreen.style["pointer-events"] = "none";
        infoScreen.style["opacity"] = 0;
    }
    else{
        infoScreen.style["pointer-events"] = "all";
        infoScreen.style["opacity"] = 1;
        displayAccess("#userAccessibility");
        document.getElementById("nameInput").value = localStorage.getItem("name");//prefill name input
    }
}

function saveNameSetting(){
    localStorage.setItem("name", $("#nameInput").val());
}