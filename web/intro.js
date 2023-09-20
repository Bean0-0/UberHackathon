if(localStorage.getItem("name") == null){
    document.getElementById("introScreen").style["display"] = "block";
}


//creates a default list of accessibility options
const defaultAccess = {}
const accessList = ["blind", "deaf", "non-verbal", "service animal", "wheelchair", "neurodivergent", "infant", "elderly"];

for(let i of accessList){
    defaultAccess[i] = false;
}

if(localStorage.getItem("accessOpt") == null){
    localStorage.setItem("accessOpt",JSON.stringify(defaultAccess));
}



//display accessibility options
function displayAccess(element){
    let html = "";
    const access = JSON.parse(localStorage.getItem("accessOpt"));
    //goes throuugh each option and generates a custom checkbox for it
    for(let i of accessList){
        if(access[i]){
            html += `
            <div class='accessOption'>
                <div class='checkbox' style='background:var(--accentcool)' onclick="toggleAccessOpt('${i}','${element}')"></div>
                ${capitalize(i)}
            </div>`
        }
        else{
            html += `
            <div class='accessOption'>
                <div class='checkbox' onclick="toggleAccessOpt('${i}','${element}')"></div>
                ${capitalize(i)}
            </div>`
        }
    }
    
    $(element).html(html);
}

//toggles access options
function toggleAccessOpt(option,element){
    const access = JSON.parse(localStorage.getItem("accessOpt"));
    access[option] = !access[option];
    localStorage.setItem("accessOpt",JSON.stringify(access));
    displayAccess(element);
}

let ind = 0;
const slides = [
    `
    <div class='gap'></div>
    <h1>Hello there!</h1>
    <p>Before you can jump into Caravan, we need to ask you a few questions to help personalize your experience</p>
    <div class='smallGap'></div>
    <button class='confirmButton' onclick='nextSlide()'>Sounds Good</div>
    `,

    `
    <div class='gap'></div>
    <h1>What should we call you?</h1>
    <p>This name is what drivers will see on your requests.</p>
    <div class='smallGap'></div>
    <input id='nameInput' placeholder='i.e. John Smith...'>
    <button class='confirmButton' onclick='saveName()'>Next</div>
    `,

    `
    <div class='gap'></div>
    <h1>What are your accessibility preferences?</h1>
    <p>This helps you match with drivers that better fit your needs.</p>
    <div class='smallGap'></div>
    <h2>Accessibility Options</h2>
    <p>What categories of accommodations do you require?</p>
    <div id='accessibility'></div>
    <div class='smallGap'></div>
    <button class='confirmButton' onclick='endIntro()'>Complete Personalization</div>
    `
];

document.getElementById("introContent").innerHTML = slides[ind];

function nextSlide(){
    $("#introContent").fadeOut(600,function(){
        ind++;
        document.getElementById("introContent").innerHTML = slides[ind];
        if(ind == 2){
            displayAccess("#accessibility");
        }
        $("#introContent").fadeIn(600);
    })
    
}


//saves the users name into local storage
function saveName(){
    localStorage.setItem("name", $("#nameInput").val());
    nextSlide();
}

//end personalization/intro
function endIntro(){
    $("#introScreen").fadeOut("slow", function(){document.getElementById("introScreen").style["display"] = "none"});
    $("#title").text("Welcome back, " + localStorage.getItem("name").split(" ")[0]);
}