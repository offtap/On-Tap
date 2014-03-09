//alert("JS loaded");

//CANVAS LAYERS SETUP
var c1 = document.getElementById("canvas1");
var ctx1 = c1.getContext("2d");

var c = document.getElementById("canvas2");
var ctx = c.getContext("2d");

var c3 = document.getElementById("canvas3");
var ctx3 = c3.getContext("2d");

	//arc variables
	var xPos = 125;			//c.width / 2;
    var yPos = 125;			//c.height / 2;
    var radius = 109; 
    var startAngle = -0.5 * Math.PI;
    var curVal = -0.5;
    var endAngle = 0 * Math.PI;
    var clockWise = false;
    var counterClockwise = true;
    var animateTo = 0.00;

//variables set by the signup form                    
var userName = "Your name here";	//user defined name
var weight = 60;					//user defined weight
var gender = "unknown";				//user-defined gender
var genderConstant = 6.8;			//gender constant depending on gender (default=male, 6.8)
var desDriver = false;

var BACLostHourly = 0.00;
var BACLost15Mins = 0.00;

//Session duration timer variables
var sessionStart = 0;
var durationMillis = 0;
var durationHours = 0;

//BAC formula variables
var hoursTotal = 0.00;		//hours since session start
var SDTotal = 0.00;		//total standard drinks consumed

//BAC variables
var BACAfterBurn = 0.00;	//new BAC after BAC burnt away at 15 min interval
var prevBAC = 0.00;			//BAC before new drink
var newBAC = 0.00;			//new Blood Alcohol Content after new drink

//Variables for calculating the time till sober
var SoberInTotal = 0.00;	//float value for estimated total time till sober
var SoberInDecimal = 0.00;		//multiple vars needed to calc hours + mins
var SoberInHours = 0;		//integer value for hours
var SoberInMins = 0;		//integer value for mins

//variables for calulating approx local time user will be sober
var now = new Date();
var SoberTimeHours = 0;
var SoberTimeMins = 0;
var SoberTime = 0.00;		//estimated time when sober
var AMPM = "AM";
var extraZero = "";			//extra zero if SoberTimeMins returns a single digit number

var newDrinkSD = 0.00; //number of standard drinks added to SDTotal when new drink entered

var animationRefresh;
var animationRefresh2;
//var burningRefresh;

//function for setting user data from inputs on Signin Page
function setUp(){
	if(document.getElementById("userName").value.length!=0){	//validating username input 
		if(!(document.getElementById("maleGender").checked)&&(!(document.getElementById("femaleGender").checked))){		//validating user input for gender and responding
			alert("Please select your gender");
		}
		else{
			userName = document.getElementById("userName").value;	//setting username var to value from form
			weight = document.getElementById("userWeight").value;	//setting weight var to value from form
			setGender();
			setDriver();
			setBACLost();
			
			//confirm inputs with user before proceeding
			confirm("Hi there, " + userName + "! So, just to double check, you're " + gender + " and you weigh about " + weight + " kgs, right?");
			}
		}
	else{
		alert("Please enter a valid username");	//responding if username input = none/invalid
	}
}

function setStartTime(){
	var startHours = now.getHours();
	var startMins = now.getMinutes();
	sessionStart = timerSetup;
}

function setGender(){
	if(document.getElementById("maleGender").checked) {		// if male set genderConstant = 6.8 for calculations
		gender = "male";
		genderConstant = 6.8;
	}
	else if(document.getElementById("femaleGender").checked) {		// if femmale set genderConstant = 5.5 for calculations
		gender = "female";
		genderConstant = 5.5;
	}
}

function setDriver(){
	if(document.getElementById("driverCheckBox").checked) {	
		desDriver = true;
	}
	else{		
		desDriver = false;
	}
}

function setBACLost(){
	BACLostHourly = ((7.5)/(weight*genderConstant));
	BACLost15Mins = BACLostHourly*0.25;
	//var BACburning = setInterval(burnBAC(),900000);
}

//DONT TOUCH, BAC COUNTDOWN FUNCTIONALITY WIP
/*function burnBAC(){
	BACAfterBurn = newBAC - BACLost15Mins;
	prevBAC = newBAC;
	newBAC = BACAfterBurn;
	
	startAngle = (((prevBAC/0.1)*2*Math.PI)-0.5*Math.PI);
	animateTo = (((newBAC/0.1)*2)-0.5);
	//if (curVal >=1.5){
		//clearTimeout(burningRefresh);
		//burnTopLayer();
	//}
	//else {
		if(curVal < animateTo){
      	curVal+= 0.01;
      	endAngle = curVal * Math.PI;
      	if(prevBAC > 0.1 && newBAC <= 0.1){
			endAngle = 1.5 * Math.PI;
		}
      	ctx.beginPath();
      	ctx.arc(xPos, yPos, radius, startAngle, endAngle, counterClockwise);
      	ctx.lineWidth = 32;
      	//ctx.globalCompositeOperation="destination-out";
      	ctx.strokeStyle = '#e74c3c';
      	ctx.stroke();
    	//redo the above block of code till arc reaches end angle
    	burningRefresh = setTimeout(burnBAC,25);
		}
		//stop the animation refreshing if arc has reached end angle
		else if (curVal = animateTo){
		clearTimeout(burningRefresh);
		}
}*/

function canvasSetup(){
	var img = document.getElementById("circleBackground");
	ctx.drawImage(img,0,0);
}

canvasSetup();

function getSessionDuration(){
	
}

function addNewDrink() {
	getSessionDuration();
	alert(hoursTotal);
	//hoursTotal = hoursTotal + 1;
	getDrink();
	calcBAC();
	updateBACreader();
	drawNewDrink();
	calcSoberIn();
	calcSoberTime();
	updateStats();
}

function calcBAC(){
	prevBAC = newBAC;
	newBAC = ((SDTotal * 10)-(hoursTotal * 7.5))/(weight * genderConstant);
	if(newBAC<0.00){
		newBAC = 0.00;
	}
}

function updateBACreader(){
	ctx.clearRect(60,75,140,100);
	ctx.font = "50px Arial";
	ctx.fillText(newBAC.toFixed(3),60,142);
}

function updateStats(){
	document.getElementById("SoberInCounter").innerHTML = "Time till sober: " + SoberInHours + " hrs " + SoberInMins + " mins";
	document.getElementById("SoberTimeCounter").innerHTML = "Sober at: " + SoberTimeHours + ":" + extraZero + SoberTimeMins + AMPM;
	document.getElementById("drinkInputTest").reset();
}

function drawTest(){
	startAngle = (((prevBAC/0.1)*2*Math.PI)-0.5*Math.PI);
	animateTo = (((newBAC/0.1)*2)-0.5);
	checkCrossover();
	if(curVal < animateTo){
      curVal+= 0.01;
      endAngle = curVal * Math.PI;
      ctx3.beginPath();
      ctx3.arc(xPos, yPos, radius, startAngle, endAngle, clockWise);
      ctx3.lineWidth = 32;
      ctx3.strokeStyle = '#e74c3c'
      ctx3.stroke();
    //redo the above block of code till arc reaches end angle
    animationRefresh2 = setTimeout(drawTest,25);
	}
	else if (curVal = animateTo){
		clearTimeout(animationRefresh2);
	}
	}

function drawNewDrink(){
	startAngle = (((prevBAC/0.1)*2*Math.PI)-0.5*Math.PI);
	animateTo = (((newBAC/0.1)*2)-0.5);
	if (curVal >=1.5){
		clearTimeout(animationRefresh);
		drawTest();
	}
	else if(curVal < animateTo){
      curVal+= 0.01;
      endAngle = curVal * Math.PI;
      if(prevBAC < 0.1 && newBAC >= 0.1){
			endAngle = 1.5 * Math.PI;
		}
      ctx.beginPath();
      ctx.arc(xPos, yPos, radius, startAngle, endAngle, clockWise);
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
	if (desDriver){
		desDriverColour();
	}
   	  else if (document.getElementById("beer-menu-toggle").checked){
      	ctx.strokeStyle= '#f1c40f';
  	  }
  	  else if (document.getElementById("wine-menu-toggle").checked){
  	  	ctx.strokeStyle= '#2ecc71';
  	  }
  	  else if (document.getElementById("spirit-menu-toggle").checked){
  	  	ctx.strokeStyle= '#3498db';
  	  }
}

function desDriverColour(){
	if(newBAC < 0.03){
		ctx.strokeStyle= '#2ecc71';
	}
	else if(0.03 < newBAC && newBAC <= 0.04){
		ctx.strokeStyle= '#f1c40f';
	}
	else if(0.04 < newBAC){
		ctx.strokeStyle = '#e74c3c';
	}
}

function checkCrossover(){
	if (prevBAC < 0.1 && newBAC >= 0.1){
		startAngle = 1.5 * Math.PI;
	}
}

//calculate an approximate duration of time after which user will be sober
function calcSoberIn(){
	SoberInTotal = (SDTotal*10)/7.5;
	SoberInDecimal = SoberInTotal%1;
	SoberInHours = SoberInTotal-SoberInDecimal;
	SoberInMins = Math.round(SoberInDecimal*60);
}

//calculate the approx local time of user sobriety
function calcSoberTime(){
	var min = now.getMinutes();
	var hr  = now.getHours();
	SoberTimeHours = hr + SoberInHours; 
	SoberTimeMins = min + SoberInMins; //need to figure out way to use minutes
	//check if mins are equal to or over 60
	verifyMins();
	singleDigitCheck();
	//check if hours are past 12 midday
	AMPMCheck();
}

//check that minute counter for SoberTime does not exceed 59mins
function verifyMins(){
	if(SoberTimeMins >= 60){
		SoberTimeMins = SoberTimeMins-60;
		SoberTimeHours++;
	}
}

//check if time is AM or PM, as well as ensure hours counter does not exceed 12
function AMPMCheck(){
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
}

function singleDigitCheck(){
	if(SoberTimeMins >= 0 && SoberTimeMins < 10){
		extraZero = "0";
	}
	else{
		extraZero = "";
	}
}

//do calculation for instantaneous BAC approximation
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

//for timer, leave alone for now please

/*var start = new Date().getMilliseconds();

for (i = 0; i < 50000; ++i) {
// do something
}

var end = new Date().getTime();
var time = end - start;
alert('Execution time: ' + time);*/


