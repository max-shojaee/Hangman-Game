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
			   "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"," "];


var initialized = false;
var capitalName;
var guessedStr;
var lossIndex=0;
var guessedRight = false;
var userWins = false;
var wins=0;
var losses=0;
var repeatChars="0";
var song = null;

window.onload = init;

function init() 
{
    initButtons();

    var random = Math.floor((Math.random()*(stateCapitals.length-1)));
    var state = stateCapitals[random][0]; 
    var capital = stateCapitals[random][1];

    capitalName = capital.split("");
    guessedStr = capital.split("");
    lossIndex=0;
    guessedRight = false;
    userWins = false;
    repeatChars = "0";

    playSong("playMusic");

	document.createTextNode(state);
    document.getElementById("stateNameFld").innerHTML = state;
	document.getElementById("stateNameFld").style.color = "red";


	// every letter in the word is symbolized by an underscore in the guessfield

	for (var i = 0; i < guessedStr.length; i++)
	{
		guessedStr[i] = "_ ";
	};

    var str = "State Capital Name: "
    str += guessedStr.join("");
    document.createTextNode(str);
    document.getElementById("capitalNameFld").innerHTML = str;

    str = "Incorrect Guesses: ";
    document.createTextNode(str);
    document.getElementById("wrongLetters").innerHTML = str;
    document.getElementById("wrongLetters").style.color = "blue";

    refreshFields();

    console.log(capitalName);
}

function initButtons()
{
    if (!initialized)
    {
         for (var i=0; i < letters.length; i++)
         {
            var letterBtn = $('<buttons>');
            letterBtn.attr('class', 'letter-button letter letter-button-color');
            letterBtn.attr('data-letter', letters[i]);
            letterBtn.text(letters[i]);
            letterBtn.on("click", processLetter);
            $("#buttons").append(letterBtn);
        }
        initialized = true;
     }
}


function playSong(id)
{
    if(song != null) 
    {
        song.pause();
    }
    song = document.getElementById(id); 
    song.play();
}

function refreshFields()
{
    var str = "Remainig Guesses: "
    str += (6-lossIndex);
    document.createTextNode(str);
    document.getElementById("remainigGuesses").innerHTML = str;

    str = "Wins: "
    str += wins;
    document.createTextNode(str);
    document.getElementById("wins").innerHTML = str;

    str = "Losses: "
    str += losses;
    document.createTextNode(str);
    document.getElementById("losses").innerHTML = str;

    var hangman = document.getElementById("hangman");
    hangman.src = "assets/images/hangman" + lossIndex + ".png";
}


var processLetter = function() {

    if (userWins === true)
    {
        return;
    }
 
    guessedRight = false;
    var userGuess = $(this).text();

    if (repeatChars.includes(userGuess))
    {
        return;
    }

    repeatChars += userGuess;
 
    //var str = "State Capital Name: "
    for (var i = 0; i < capitalName.length; i++){
        if(capitalName[i].toUpperCase() === userGuess.toUpperCase()){
            guessedStr[i] = userGuess;
            guessedRight = true;
            var str = guessedStr.join("");
            str = "State Capital Name: " + str;
            document.createTextNode(str);
            document.getElementById("capitalNameFld").innerHTML = str;
        }
    }
    
    // if a guessed letter is not in the word, the letter will be put on the 
    //"wrong letters"-list and hangman grows

    if(guessedRight === false){
        var wrongLetters = document.getElementById("wrongLetters");
        var str = document.createTextNode(" " + userGuess);
        wrongLetters.appendChild(str); 
        lossIndex++;
    }

    //checks if all letters have been found
   
    userWins = true;
    for (var i = 0; i < guessedStr.length; i++){
        if(guessedStr[i] === "_ "){
            userWins = false;
        }
    }


    if(userWins === true){
        playSong("winMusic");
        wins++;
        str = "Congratulations, You Won!!!"
        document.createTextNode(str);
        document.getElementById("wrongLetters").innerHTML = str;
        document.getElementById("wrongLetters").style.color = "red";
    }
    
    if(lossIndex === 6){ 
        playSong("loseMusic");
        losses++;
        str = "Sorry, You Lost!!!"
        document.createTextNode(str);
        document.getElementById("wrongLetters").innerHTML = str;
        document.getElementById("wrongLetters").style.color = "red";
    }

    refreshFields();
}