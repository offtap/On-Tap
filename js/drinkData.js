var beerArray = [0.6,0.9,1.2,0.8,1.2,1.6,1.1,1.6,2.2];
var wineArray = [1,1.5,0.9,1.4,1.4];
var spiritArray = [0.5,1,2];

function getDrink(){
	if(document.getElementById("drinkType:Beer").checked) {
		newDrinkSD = beerArray[2];
	}
	else if(document.getElementById("drinkType:Wine").checked) {
		newDrinkSD = wineArray[1];
	}
	else if(document.getElementById("drinkType:Spirit").checked) {
		newDrinkSD = spiritArray[1];
	}
	SDTotal += newDrinkSD;
}