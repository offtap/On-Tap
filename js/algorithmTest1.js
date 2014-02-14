//alert("JS loaded");

//variables + canvas identifier for the animated blue circle
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
	var xPos = 125;			//c.width / 2;
    var yPos = 125;			//c.height / 2;
    var radius = 100; 
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
		newDrinkSD = beerArray[2];
	}
	else if(document.getElementById("drinkType:Wine").checked) {
		newDrinkSD = wineArray[1];
	}
	else if(document.getElementById("drinkType:Spirit").checked) {
		newDrinkSD = spiritArray[1];
	}
	if(SDTotal = 0.00){
		startTimer();
	}
	SDTotal = SDTotal + newDrinkSD;
	calcBAC();
	if(newBAC<0.00){
		newBAC = 0.00;
	}
	drawNewDrink();
	calcSoberIn();
	document.getElementById("BACCounter").innerHTML = newBAC;
	document.getElementById("SoberInCounter").innerHTML = SoberInHours + " hrs " + SoberInMins + " mins";
	document.getElementById("drinkInputTest").reset();
}

function calcBAC(){
	prevBAC = newBAC;
	newBAC = ((SDTotal * 10)-(hoursTotal * 7.5))/(weight * genderConstant);
	//drawCircle();
}

function startTimer(){
	setTimeout(refreshCircle(),10000);
}

function refreshCircle(){
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

}

function drawNewDrink(){
	//alert("drawCircle works");
	startAngle = (((prevBAC/0.1)*2*Math.PI)-0.5*Math.PI);
	animateTo = (((newBAC/0.1)*2)-0.5);
	if(curVal < animateTo){
      curVal+= 0.01;
    }
      endAngle = curVal * Math.PI;
      ctx.beginPath();
      ctx.arc(xPos, yPos, radius, startAngle, endAngle, counterClockwise);
      ctx.lineWidth = 30;
      // line color
      ctx.strokeStyle= '#3498db';
      ctx.stroke();
    setTimeout(drawNewDrink,25);
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


//for timer, leave alone for now please

/*var start = new Date().getMilliseconds();

for (i = 0; i < 50000; ++i) {
// do something
}

var end = new Date().getTime();
var time = end - start;
alert('Execution time: ' + time);*/


