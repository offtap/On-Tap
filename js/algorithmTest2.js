alert("JS loaded");

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
	var xPos = c.width / 2;
    var yPos = c.height / 2;
    var radius = 75; 
    var startAngle = -0.5 * Math.PI;
    var curVal = 0;
    var endAngle = 0 * Math.PI;
    var counterClockwise = false;

/*function animate(){
    if(curVal < 1.5){
      curVal+= 0.01;
    }
      endAngle = curVal * Math.PI;
      ctx.beginPath();
      ctx.arc(xPos, yPos, radius, startAngle, endAngle, counterClockwise);
      ctx.lineWidth = 25;
      // line color
      ctx.strokeStyle= '#3498db';
      ctx.stroke();
    setTimeout(animate,1);
}*/

var userName = "Your name here";
var weight = 60;
var gender = "unknown";
var genderConstant = 6.8;

var hoursTotal = 0.00;		//hours since session start
var SDTotal = 0.00;		//total standard drinks consumed

var newBAC = 0.00;			//Blood Alcohol Content
var prevBAC = 0.00;

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
	if(newBAC<0.00){
		newBAC = 0.00;
	}
	calcSoberIn();
	document.getElementById("BACCounter").innerHTML = newBAC;
	document.getElementById("SoberInCounter").innerHTML = SoberInHours + " hrs " + SoberInMins + " mins";
	document.getElementById("drinkInputTest").reset();
}

function calcBAC(){
	prevBAC = newBAC;
	newBAC = ((SDTotal * 10)-(hoursTotal * 7.5))/(weight * localStorage.genderConstant);
	alert(newBAC);
	//drawCircle();
}

function drawCircle(){
	startAngle = (((prevBAC/0.1)*2*Math.PI)-0.5*Math.PI);
	if(curVal < ((newBAC/0.1)*0.5){
      curVal+= 0.001;
    }
      endAngle = curVal * Math.PI;
      ctx.beginPath();
      ctx.arc(xPos, yPos, radius, startAngle, endAngle, counterClockwise);
      ctx.lineWidth = 25;
      // line color
      ctx.strokeStyle= '#3498db';
      ctx.stroke();
    setTimeout(animate,15);
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



