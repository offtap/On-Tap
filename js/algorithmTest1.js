alert("JS loaded");

//ignore this code, it is for circlify/manual circle tests
//var update = document.getElementById("myStat2");

//var c=document.getElementById("myCanvas");
            //var ctx=c.getContext("2d");

var userName = "Your name here";
var weight = 60;
var gender = "unknown";
var genderConstant = 6.8;

var hoursTotal = 0.00;		//hours since session start
var SDTotal = 0.00;		//total standard drinks consumed

var BAC = 0.00;			//Blood Alcohol Content

var SoberInTotal = 0.00;	//estimated total time till sober
var SoberInDecimal = 0.00;		//multiple vars needed to calc hours + mins
var SoberInHours = 0.00;
var SoberInMins = 0.00;

var SoberTime = 0.00;		//estimated time when sober

//awaiting data
var beerArray = [1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8];	
var wineArray = [1,1.1,1.2,];
var spiritsArray = [1,1.1,1.2,];

var drinksArrayTest = [1,2,3]; //this is to test the method we will use for all drinks

var newDrinkSD = 0.00; //number of standard drinks added to SDTotal when new drink entered

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

function addNewDrink() {
	hoursTotal = hoursTotal+1;
	if(document.getElementById("drinkType:Beer").checked) {
		newDrinkSD = drinksArrayTest[0];
	}
	else if(document.getElementById("drinkType:Wine").checked) {
		newDrinkSD = drinksArrayTest[1];
	}
	else if(document.getElementById("drinkType:Spirit").checked) {
		newDrinkSD = drinksArrayTest[2];
	}
	SDTotal = SDTotal + newDrinkSD;
	calcBAC();
	calcSoberIn();
	document.getElementById("BACCounter").innerHTML = BAC;
	document.getElementById("SoberInCounter").innerHTML = SoberInHours + " hrs " + SoberInMins + " mins";
	document.getElementById("drinkInputTest").reset();
}

function calcBAC(){
	BAC = ((SDTotal * 10)-(hoursTotal * 7.5))/(weight * genderConstant);
	alert(BAC);
	//circle code test below
	//document.getElementById("myStat2").setAttribute("data-text",BAC);
	//document.getElementById("myStat2").setAttribute("data-percent",(BAC*1000));
            /*ctx.beginPath();
            ctx.arc(150,150,120,0,((BAC/0.1)*2)*Math.PI);
            ctx.stroke();
            ctx.lineWidth = 32.5;*/
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




