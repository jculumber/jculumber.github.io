//Values at the beginning of a new game
var wins = 0;               //Number of times the player has correctly guessed the word
var currentWord;            //Current game word trying to be guessed
var remainingGuesses = 20;  //Number of chances the player has to figure out word
var lettersGuessed = [];    //Empty array for guessed letters
var guessingWord = [];      //Combination of "_" and letters player has guessed to build word
var playerGuess;            //Key pressed by player
var currentWordLetters;     //Letters in currentWord

//List of possible words to be used for a game
var gameWords = ["magickingdom", "epcot", "hollywoodstudios", "animalkingdom", "mickeymouse", "donaldduck", "fireworks"]; 

//When page loads, set wins to 0 and remaining guesses to 10:
    function pageLoad() {
        document.getElementById("winsTotal").innerHTML = wins; 
    };    

//Start a new game
    function newGame() {
        //Set Remaining Guesses = 20
        document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
    
        //Generate the current word
        currentWord = gameWords[Math.floor(Math.random() * gameWords.length)];
        currentWordLetters = [currentWord.split("")];

        //Represent currentWord using " _ "
        for (i = 0; i < currentWord.length; i++) {
        guessingWord.push(" _ ");
        };
        document.getElementById("currentWord").innerText = "";
        for (j = 0; j < guessingWord.length; j++) {
        document.getElementById("currentWord").innerText += guessingWord[j];
        };
    };
 
//This function is run whenever the user presses a key
    document.onkeyup = function(event) {
    
        // Determines which key was pressed, and makes any letter lower case
        playerGuess = event.key.toLowerCase();

        //Check to see if letter has already been guessed
        //If yes - do nothing
    
        //If no - add letter to guessed letters array
        if ((remainingGuesses - lettersGuessed.length) > 0 && (lettersGuessed.indexOf(playerGuess) == -1)) {
            lettersGuessed.push(" " + playerGuess);        
            document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(" ");
        
        //Check to see if letter is in word
        //If yes - replace dash with letter in the appropriate position
        for (k = 0; k < currentWord.length; k++) {
            if (currentWord[k] == playerGuess) {
                guessingWord[k] = " " + playerGuess + " ";
                document.getElementById("currentWord").textContent = guessingWord.join("");
            }
        //If no - decrement Number of Guesses by 1
            else {
                document.getElementById("remainingGuesses").innerHTML = remainingGuesses- lettersGuessed.length;
            }
        };
        };
        //When Remaining Guesses = 0, tell player Game Over, and restart game when next key is pressed
        if ((remainingGuesses - lettersGuessed.length) == 0) {
            alert("Game Over! Press 'New Game' button to start a new game.");
            lettersGuessed = [];    //Empty array for guessed letters
            document.getElementById("lettersGuessed").innerHTML = lettersGuessed.join(" ");
            guessingWord = [];      //Combination of "_" and letters player has guessed to build word
            document.getElementById("remainingGuesses").innerHTML = remainingGuesses;
            newGame();
        };
    
        //If all letters in the current word are guessed and Remaining Guesses > 1, tell player they win, and restart game when next key is pressed
        if (guessingWord.indexOf(" _ ") == -1) {
            alert("You win! Great job! Press 'New Game' button to start a new game.");
            wins++;
        };

    };

//Begin
    window.onload = pageLoad();
//Reset game
    