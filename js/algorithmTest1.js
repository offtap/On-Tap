//alert("JS loaded");

//variables + canvas identifier for the animated blue circle
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
	var xPos = 125;			//c.width / 2;
    var yPos = 125;			//c.height / 2;
    var radius = 109; 
    var startAngle = -0.5 * Math.PI;
    var curVal = -0.5;
    var endAngle = 0 * Math.PI;
    var counterClockwise = false;
    var animateTo = 0.00;

//variables set by the signup form                    
var userName = "Your name here";	//user defined name
var weight = 60;					//user defined weight
var gender = "unknown";				//user-defined gender
var genderConstant = 6.8;			//gender constant depending on gender (default=male, 6.8)

//BAC formula variables
var hoursTotal = 0.00;		//hours since session start
var SDTotal = 0.00;		//total standard drinks consumed

//BAC variables
var prevBAC = 0.00;			//BAC before new drink
var newBAC = 0.00;			//new Blood Alcohol Content after new drink

//Variables for calculating the time till sober
var SoberInTotal = 0.00;	//float value for estimated total time till sober
var SoberInDecimal = 0.00;		//multiple vars needed to calc hours + mins
var SoberInHours = 0;		//integer value for hours
var SoberInMins = 0;		//integer value for mins


var now = new Date();
var SoberTimeHours = 0;
var SoberTimeMins = 0;
var SoberTime = 0.00;		//estimated time when sober
var AMPM = "AM";

//awaiting data
var beerArray = [0.6,0.9,1.2,0.8,1.2,1.6,1.1,1.6,2.2];
var wineArray = [1,1.5,0.9,1.4,1.4];
var spiritArray = [0.5,1,2];

var newDrinkSD = 0.00; //number of standard drinks added to SDTotal when new drink entered

var animationRefresh;

//function for setting user data from inputs on Signin Page
function getUserInput(){
	if(document.getElementById("userName").value.length!=0){	//validating username input 
		if(!(document.getElementById("maleGender").checked)&&(!(document.getElementById("femaleGender").checked))){		//validating user input for gender and responding
			alert("Please select your gender");
		}
		else{
			userName = document.getElementById("userName").value;	//setting username var to value from form
			weight = document.getElementById("userWeight").value;	//setting weight var to value from form
			if(document.getElementById("maleGender").checked) {		// if male set genderConstant = 6.8 for calculations
				gender = "male";
				genderConstant = 6.8;
			}
			else if(document.getElementById("femaleGender").checked) {		// if femmale set genderConstant = 5.5 for calculations
				gender = "female";
				genderConstant = 5.5;
			}
			//confirm inputs with user before proceeding
			confirm("Hi there, " + userName + "! So, just to double check, you're " + gender + " and you weigh about " + weight + " kgs, right?");
			}
		}
	else{
		alert("Please enter a valid username");	//responding if username input = none/invalid
	}
}

function canvasSetup(){
	var img = document.getElementById("circleBackground");
	ctx.drawImage(img,0,0);
}

canvasSetup();

function addNewDrink() {
	hoursTotal = hoursTotal + 1;
	if(document.getElementById("drinkType:Beer").checked) {
		newDrinkSD = beerArray[2];
	}
	else if(document.getElementById("drinkType:Wine").checked) {
		newDrinkSD = wineArray[1];
	}
	else if(document.getElementById("drinkType:Spirit").checked) {
		newDrinkSD = spiritArray[1];
	}
	//if(SDTotal = 0.00){
	//	startTimer();
	//}
	SDTotal = SDTotal + newDrinkSD;
	calcBAC();
	if(newBAC<0.00){
		newBAC = 0.00;
	}
	updateBACreader();
	drawNewDrink();
	calcSoberIn();
	calcSoberTime();
	document.getElementById("SoberInCounter").innerHTML = "Time till sober: " + SoberInHours + " hrs " + SoberInMins + " mins";
	document.getElementById("SoberTimeCounter").innerHTML = "Sober at: " + SoberTimeHours + ":" + SoberTimeMins + AMPM;
	document.getElementById("drinkInputTest").reset();
}

function calcBAC(){
	prevBAC = newBAC;
	newBAC = ((SDTotal * 10)-(hoursTotal * 7.5))/(weight * genderConstant);
	//drawCircle();
}

function updateBACreader(){
	ctx.clearRect(60,75,140,100);
	ctx.font = "50px Arial";
	ctx.fillText(newBAC.toFixed(3),60,142);
}

//function startTimer(){
//	setTimeout(refreshCircle(),10000);
//}

/*function refreshCircle(){
	calcBAC();
	animateTo = (((newBAC/0.1)*2)-0.5);
	ctx.clearRect(0,0,250,250);
	ctx.beginPath();
    ctx.arc(xPos, yPos, radius, startAngle, animateTo, counterClockwise);
    ctx.lineWidth = 30;
    ctx.strokeStyle= '#3498db';
    ctx.stroke();
    ctx.endPath();
    setInterval(refreshCircle(),1000);

}*/

function drawNewDrink(){
	//alert("drawCircle works");
	startAngle = (((prevBAC/0.1)*2*Math.PI)-0.5*Math.PI);
	animateTo = (((newBAC/0.1)*2)-0.5);
	if(curVal < animateTo){
      curVal+= 0.01;
      endAngle = curVal * Math.PI;
      ctx.beginPath();
      ctx.arc(xPos, yPos, radius, startAngle, endAngle, counterClockwise);
      ctx.lineWidth = 32;
      getColour();
      ctx.stroke();
    //redo the above block of code till arc reaches end angle
    animationRefresh = setTimeout(drawNewDrink,25);
	}
	//stop the animation refreshing if arc has reached end angle
	else if (curVal = animateTo){
		clearTimeout(animationRefresh);
	}
}

//this function decides what colour the new arc will be
function getColour(){
	//if (instantCalc page loaded) {ctx.strokeStyle = '#3498db'; }
	
	 if (curVal >= 1.5){
      	ctx.strokeStyle = '#e74c3c';
      }
      else if (document.getElementById("drinkType:Beer").checked){
      	ctx.strokeStyle= '#f1c40f';
  	  }
  	  else if (document.getElementById("drinkType:Wine").checked){
  	  	ctx.strokeStyle= '#2ecc71';
  	  }
  	  else if (document.getElementById("drinkType:Spirit").checked){
  	  	ctx.strokeStyle= '#3498db';
  	  }
}

function calcSoberIn(){
	SoberInTotal = (SDTotal*10)/7.5;
	SoberInDecimal = SoberInTotal%1;
	SoberInHours = SoberInTotal-SoberInDecimal;
	SoberInMins = Math.round(SoberInDecimal*60);
}

function calcSoberTime(){
	var min = now.getMinutes();
	var hr  = now.getHours();
	SoberTimeHours = hr + SoberInHours; 
	//check if hours are past 12 midday
	if (SoberTimeHours > 12 && SoberTimeHours < 24){
		SoberTimeHours -= 12;
		AMPM = "PM";
	}
	else if (SoberTimeHours >= 24 && SoberTimeHours < 36){
		SoberTimeHours -= 24;
		AMPM = "AM";
	}
	else if (SoberTimeHours >= 36){
		SoberTimeHours -= 34;
		AMPM = "PM Tomorrow";
	}
	SoberTimeMins = min + SoberInMins; //need to figure out way to use minutes
}

function instantCalc(){
	hoursTotal = document.getElementById("instantHoursNo").value;
	SDTotal = document.getElementById("instantDrinkNo").value;
	calcBAC();
	if(newBAC<0.00){
		newBAC = 0.00;
	}
	updateBACreader();
	drawNewDrink();
	calcSoberIn();
	document.getElementById("BACCounter").innerHTML = newBAC;
	document.getElementById("SoberInCounter").innerHTML = SoberInHours + " hrs " + SoberInMins + " mins";
	document.getElementById("drinkInputTest").reset();
}

//below is to clear canvas for instantCalculator when reset buton is clicked
//not working atm, not sure why... if you see something let me know.
function clearCanvas(){
	ctx.clearRect(0,0,250,250);
	var img = document.getElementById("circleBackground");
	ctx.drawImage(img,0,0);
}

//for timer, leave alone for now please

/*var start = new Date().getMilliseconds();

for (i = 0; i < 50000; ++i) {
// do something
}

var end = new Date().getTime();
var time = end - start;
alert('Execution time: ' + time);*/


