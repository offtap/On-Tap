alert("JS loaded");

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
                    
var userName = "Your name here";
var weight = 60;
var gender = "unknown";
var genderConstant = 6.8;

var hoursTotal = 0.00;		//hours since session start
var SDTotal = 0.00;		//total standard drinks consumed

var BAC = 0.05;			//Blood Alcohol Content

var SoberInTotal = 0.00;	//estimated total time till sober
var SoberInDecimal = 0.00;		//multiple vars needed to calc hours + mins
var SoberInHours = 0.00;
var SoberInMins = 0.00;

var SoberTime = 0.00;		//estimated time when sober

//awaiting data
var beerArray = [0.6,0.9,1.2,0.8,1.2,1.6,1.1,1.6,2.2];
var wineArray = [1,1.5,0.9,1.4,1.4];
var spiritArray = [0.5,1,2];

var newDrinkSD = 0.00; //number of standard drinks added to SDTotal when new drink entered

function getUserInput(){
	if(document.getElementById("userName").value.length!=0){
		if(!(document.getElementById("maleGender").checked)&&(!(document.getElementById("femaleGender").checked))){
			alert("Please select your gender");
		}
		else{
			userName = document.getElementById("userName").value;
			weight = document.getElementById("userWeight").value;
			if(document.getElementById("maleGender").checked) {
				gender = "male";
				genderConstant = 6.8;
			}
			else if(document.getElementById("femaleGender").checked) {
				gender = "female";
				genderConstant = 5.5;
			}
			document.getElementById("greeting").innerHTML = "Hi there, " + userName + "!";
			document.getElementById("dataCheck").innerHTML = "So, just to double check, you're " + gender + " and you weigh about " + weight + " kgs, right?";
			}
		}
	else{
		alert("Please enter a valid username");
	}
}

function addNewDrink() {
	hoursTotal = hoursTotal + 1;
	if(document.getElementById("drinkType:Beer").checked) {
		newDrinkSD = beerArray[0];
	}
	else if(document.getElementById("drinkType:Wine").checked) {
		newDrinkSD = wineArray[1];
	}
	else if(document.getElementById("drinkType:Spirit").checked) {
		newDrinkSD = spiritArray[1];
	}
	SDTotal = SDTotal + newDrinkSD;
	calcBAC();
	if(BAC<0.00){
		BAC = 0.00;
	}
	calcSoberIn();
	document.getElementById("BACCounter").innerHTML = BAC;
	document.getElementById("SoberInCounter").innerHTML = SoberInHours + " hrs " + SoberInMins + " mins";
	document.getElementById("drinkInputTest").reset();
}

function calcBAC(){
	BAC = ((SDTotal * 10)-(hoursTotal * 7.5))/(weight * localStorage.genderConstant);
	alert(BAC);
	//drawCircle();
}

function drawCircle(){
	ctx.beginPath();
    ctx.arc(125,125,100,-0.5*Math.PI,0.5*(2*Math.PI));
    ctx.lineWidth=25;
    ctx.strokeStyle= '#3498db';
    ctx.stroke();
}

function calcSoberIn(){
	SoberInTotal = (SDTotal*10)/7.5;
	SoberInDecimal = SoberInTotal%1;
	SoberInHours = SoberInTotal-SoberInDecimal;
	SoberInMins = Math.round(SoberInDecimal*60);
}

function calcSoberTime(){
	SoberTime = (currentTime+SoberIn); //need to figure out way to use minutes
}



