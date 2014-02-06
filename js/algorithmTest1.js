alert("JS loaded");


//var update = document.getElementById("myStat2");

//var c=document.getElementById("myCanvas");
            //var ctx=c.getContext("2d");

var userName = "Your name here";
var weight = 60;
var gender = "unknown";
var genderConstant = 6.8;

var hoursTotal = 4;		//hours since session start
var SDTotal = 4;		//total standard drinks consumed

var BAC = 0.00;			//Blood Alcohol Content
var SoberIn = 10;		//estimated time till sober
var SoberTime = 10;		//estimated time when sober

//awaiting data
var beerArray = [1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8];	
var wineArray = [1,1.1,1.2,];
var spiritsArray = [1,1.1,1.2,];

//calcBAC();

function getUserInput(){
	userName = document.getElementById("userName").value;
	weight = document.getElementById("userWeight2").value;
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

	//screen shake - how to do it?

function calcBAC(){
	BAC = ((SDTotal * 10)-(hoursTotal * 7.5))/(weight * genderConstant);
	alert(BAC);
	document.getElementById("yourBAC").innerHTML = "Your BAC is " + BAC;
	calcSoberCountdown();
	document.getElementById("SoberIn").innerHTML = "You will be sober in " + SoberIn + " hours.";
	

	console.log(BAC);
	//document.getElementById("myStat2").setAttribute("data-text",BAC);
	//document.getElementById("myStat2").setAttribute("data-percent",(BAC*1000));
            /*ctx.beginPath();
            ctx.arc(150,150,120,0,((BAC/0.1)*2)*Math.PI);
            ctx.stroke();
            ctx.lineWidth = 32.5;*/
}


function calcSoberCountdown(){
	SoberIn = (SDTotal*10)/7.5;
			   //need to figure out way to use minutes
}

function calcSoberTime(){
	SoberTime = (currentTime+SoberIn); //need to figure out way to use minutes
}




