var stateCapitals = [
        ["Alabama", "Montgomery"],
        ["Alaska", "Juneau"],
        ["Arizona", "Phoenix"],
        ["Arkansas", "Little Rock"],
        ["California", "Sacramento"],
        ["Colorado", "Denver"],
        ["Connecticut", "Hartford"],
        ["Delaware", "Dover"],
        ["Florida", "Tallahasse"],
        ["Georgia", "Atlanta"],
        ["Hawaii", "Honolulu"],
        ["Idaho", "Boise"],
        ["Illinois", "Springfield"],
        ["Indiana", "Indianapolis"],
        ["Iowa", "Des Moines"],
        ["Kansas", "Topeka"],
        ["Kentucky", "Frankfort"],
        ["Louisiana", "Baton Rouge"],
        ["Maine", "Augusta"],
        ["Maryland", "Annapolis"],
        ["Massachusettes", "Boston"],
        ["Michigan", "Lansing"],
        ["Minnesota", "Saint Paul"],
        ["Mississippi", "Jackson"],
        ["Missouri", "Jefferson City"],
        ["Montana", "Helena"],
        ["Nebraska", "Lincoln"],
        ["Nevada", "Carson City"],
        ["New Hampshire", "Concord"],
        ["New Jersey", "Trenton"],
        ["New York", "Albany"],
        ["New Mexico", "Santa Fe"],
        ["North Carolina", "Raleigh"],
        ["North Dakota", "Bismark"],
        ["Ohio", "Columbus"],
        ["Oklahoma", "Oklahoma City"],
        ["Oregon", "Salem"],
        ["Pennslyvania", "Harrisburg"],
        ["Rhode Island", "Providence"],
        ["South Carolina", "Columbia"],
        ["South Dakota", "Pierre"],
        ["Tennessee", "Nashville"],
        ["Texas", "Austin"],
        ["Utah", "Salt Lake City"],
        ["Vermont", "Montpelier"],
        ["Virginia", "Richmond"],
        ["Washington", "Olympia"],
        ["West Virginia", "Charleston"],
        ["Wisconsin", "Madison"],
        ["Wyoming", "Cheyenne"]
       ]

var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", 
			   "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


var random = Math.floor((Math.random()*(stateCapitals.length-1))); 
var state = stateCapitals[random][0]; 
var capital = stateCapitals[random][1];
var capitalName = capital.split("");
var guessedStr = capital.split("");
var imgIndex=0;
var guessedRight = false;

console.log("*****capitalName is " + capitalName);


window.onload = init;

function init() {
	var stateField = document.getElementById("stateNameFld");
	var randomState = document.createTextNode(state);
	stateField.appendChild(randomState);
	document.getElementById("stateNameFld").style.color = "red";

	 for (var i=0; i < letters.length; i++)
     {
        var letterBtn = $('<buttons>');
        letterBtn.attr('class', 'letter-button letter letter-button-color');
        letterBtn.attr('data-letter', letters[i]);
        letterBtn.text(letters[i]);
        $("#buttons").append(letterBtn);
     };

	// every letter in the word is symbolized by an underscore in the guessfield
	for (var i = 0; i < guessedStr.length; i++)
	{
		guessedStr[i] = "_ ";
	};
}


//checks if the the letter provided by the user matches one or more of the letters in the word
var checkLetter = function(){
	console.log("*****capitalName is " + capitalName);
	console.log("3) checkLetter");

	var letter = document.gamePad.elements["guessedLetter"]; 
	var userGuess = letter.value; // the letter provided by the user

	for (var i = 0; i < capitalName.length; i++){
		if(capitalName[i].toUpperCase() === userGuess.toUpperCase()){
			guessedStr[i] = userGuess + " ";
			guessedRight = true;
			var capitalFld = document.getElementById("capitalNameFld");
			var nextChar = document.createTextNode(guessedStr[i]);
			capitalFld.appendChild(nextChar);
			console.log("user guess is right");
		}
	}
	
	// if a guessed letter is not in the word, the letter will be put on the "wrong letters"-list and hangman grows
	if(!guessedRight){
		var wrongLetters = document.getElementById("wrongLetters");
		var str = document.createTextNode(" " + userGuess);
		wrongLetters.appendChild(str); 
		imgIndex++;
		var hangman = document.getElementById("hangman");
    	hangman.src = "assets/images/hangman" + imgIndex + ".png";
	}

	//checks if all letters have been found
	var correctGuess = true;
	for (var i = 0; i < guessedStr.length; i++){
		if(guessedStr[i] === "_ "){
			correctGuess = false;
		}
	}
	if(correctGuess){
			window.alert("You win!");
	}
	
	//once you got six wrong letters, you lose
	if(imgIndex === 6){
		window.alert("Uh...I guess you're dead now.");
	}
}

