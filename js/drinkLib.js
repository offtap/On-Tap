var beerArray = [0.6,0.9,1.2,0.8,1.2,1.6,1.1,1.6,2.2];
var wineArray = [1,1.5,0.9,1.4,1.4,1,1,1,1];
var spiritArray = [0.5,1,2,1,1,1,1,1,1];

function getDrink(){
	alert("getDrink working");

	//Beer selections
	if(document.getElementById("beerSize1").checked && document.getElementById("beerStrength1").checked) {
		newDrinkSD = beerArray[0];
	}
	else if(document.getElementById("beerSize1").checked && document.getElementById("beerStrength2").checked) {
		newDrinkSD = beerArray[1];
	}
	else if(document.getElementById("beerSize1").checked && document.getElementById("beerStrength3").checked) {
		newDrinkSD = beerArray[2];
	}
	else if(document.getElementById("beerSize2").checked && document.getElementById("beerStrength1").checked) {
		newDrinkSD = beerArray[3];
	}
	else if(document.getElementById("beerSize2").checked && document.getElementById("beerStrength2").checked) {
		newDrinkSD = beerArray[4];
	}
	else if(document.getElementById("beerSize2").checked && document.getElementById("beerStrength3").checked) {
		newDrinkSD = beerArray[5];
	}
	else if(document.getElementById("beerSize3").checked && document.getElementById("beerStrength1").checked) {
		newDrinkSD = beerArray[6];
	}
	else if(document.getElementById("beerSize3").checked && document.getElementById("beerStrength2").checked) {
		newDrinkSD = beerArray[7];
	}
	else if(document.getElementById("beerSize3").checked && document.getElementById("beerStrength3").checked) {
		newDrinkSD = beerArray[8];
	}

	//Wine Selections
	else if(document.getElementById("wineSize1").checked && document.getElementById("wineStrength1").checked) {
		newDrinkSD = wineArray[0];
	}
	else if(document.getElementById("wineSize1").checked && document.getElementById("wineStrength2").checked) {
		newDrinkSD = wineArray[1];
	}
	else if(document.getElementById("wineSize1").checked && document.getElementById("wineStrength3").checked) {
		newDrinkSD = wineArray[2];
	}
	else if(document.getElementById("wineSize2").checked && document.getElementById("wineStrength1").checked) {
		newDrinkSD = wineArray[3];
	}
	else if(document.getElementById("wineSize2").checked && document.getElementById("wineStrength2").checked) {
		newDrinkSD = wineArray[4];
	}
	else if(document.getElementById("wineSize2").checked && document.getElementById("wineStrength3").checked) {
		newDrinkSD = wineArray[5];
	}
	else if(document.getElementById("wineSize3").checked && document.getElementById("wineStrength1").checked) {
		newDrinkSD = wineArray[6];
	}
	else if(document.getElementById("wineSize3").checked && document.getElementById("wineStrength2").checked) {
		newDrinkSD = wineArray[7];
	}
	else if(document.getElementById("wineSize3").checked && document.getElementById("wineStrength3").checked) {
		newDrinkSD = wineArray[8];
	}

	//Spirit Selections
	else if(document.getElementById("spiritSize1").checked && document.getElementById("spiritStrength1").checked) {
		newDrinkSD = spiritArray[0];
	}
	else if(document.getElementById("spiritSize1").checked && document.getElementById("spiritStrength2").checked) {
		newDrinkSD = spiritArray[1];
	}
	else if(document.getElementById("spiritSize1").checked && document.getElementById("spiritStrength3").checked) {
		newDrinkSD = spiritArray[2];
	}
	else if(document.getElementById("spiritSize2").checked && document.getElementById("spiritStrength1").checked) {
		newDrinkSD = spiritArray[3];
	}
	else if(document.getElementById("spiritSize2").checked && document.getElementById("spiritStrength2").checked) {
		newDrinkSD = spiritArray[4];
	}
	else if(document.getElementById("spiritSize2").checked && document.getElementById("spiritStrength3").checked) {
		newDrinkSD = spiritArray[5];
	}
	else if(document.getElementById("spiritSize3").checked && document.getElementById("spiritStrength1").checked) {
		newDrinkSD = spiritArray[6];
	}
	else if(document.getElementById("spiritSize3").checked && document.getElementById("spiritStrength2").checked) {
		newDrinkSD = spiritArray[7];
	}
	else if(document.getElementById("spiritSize3").checked && document.getElementById("spiritStrength3").checked) {
		newDrinkSD = spiritArray[8];
	}
	else{
		newDrinkSD = 1;
	}

	SDTotal += newDrinkSD;
	alert(newDrinkSD);
	alert(SDTotal);
}


