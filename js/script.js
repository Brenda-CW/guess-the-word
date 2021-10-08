//unordered list where guessed letters will appear
const lettersGuessed = document.querySelector(".guessed-letters");
//button that lets users submit their guess
const guessButton = document.querySelector(".guess");
//where users type their guess
let txtInput = document.querySelector(".letter");
//empty paragraph where word will appear as correct letters guessed
const inProgress = document.querySelector(".word-in-progress");
//paragraph with statement about remaining guesses 
const guessesRemaining = document.querySelector(".remaining");
//part of paragraph that shows remaining guess count
const span = document.querySelector("span");
//empty paragraph where messages will appear when user guesses a letter
const messagePara = document.querySelector(".message");
//hidden button that will appear at end of game so user can play again
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia"; //starting word until API fetch is in place
const guessedLetters = []; //empty array where guessed letters will be collected

//Step 2 - Function that will add placeholders for each letter
const inProgressDots = function (word) {
    const wordArray = []; //create an empty array
    for (let letter of word) { //iterate over the word
        //console.log(letter);
        wordArray.push("●"); //add a dot to WordArray for each letter of variable word 
   }
   inProgress.innerText = wordArray.join(""); //update the "word in progress" paragraph to be the contents of the array joined together with no separator.
};
inProgressDots(word);

//Step 2 - event listener for button
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const lettersGuessed = txtInput.value; //grab the value that was entered
    console.log(lettersGuessed);
    messagePara.value = ""; //empty the message value between tries
    const goodGuess = checkInput(lettersGuessed); //check the user input against conditions and output message accordingly
    if (goodGuess) {
        makeGuess(lettersGuessed); // check to see if user guessed a unique or repeat letter
    }
    txtInput.value = ""; //clear the input box between tries
});

//step 3 - Function to validate user input against conditions
const checkInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/; //regular expression to make sure user inputs a letter
    if(input.value === "") {
        messagePara.innerHTML = "Whoops, you forgot to guess a letter!";
    } else if (input.length > 1) {
        messagePara.innerHTML = `Whoa there, just one letter at a time. You typed in ${input.length} letters, silly!`
    } else if (!input.match(acceptedLetter)) {
        messagePara.innerHTML =`Hmmm, you entered ${input} and we're looking for just a letter from A to Z.`
    } else {
        messagePara.innerHTML = `You guessed the letter ${input.toUpperCase()}`;
        return input;
    }
};

/*Finally, you’ll write a second function that captures the player’s guess to see if they’ve already guessed that letter. If not, the function pushes the letter to an array of guessed letters.*/
//word variable "makeGuess" array created above

const makeGuess = function(lettersGuessed) {
    lettersGuessed = lettersGuessed.toUpperCase(); 
        if (guessedLetters.includes(lettersGuessed)) {
            messagePara.innerHTML = `Whoops! You guessed the letter ${txtInput.value.toUpperCase()} already. Please try again.`;
        } else {
            guessedLetters.push(lettersGuessed);
            console.log(guessedLetters);
        }
};

