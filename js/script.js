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

//starting word until API fetch is in place
let word = "magnolia"; 
//empty array where guessed letters will be collected
const guessedLetters = []; 
//variable that will track number of guesses - will change over time
let remainingGuesses = 8;

//Step 5 - Add Async Function
 	
const getWord = async function () {
    const res = await fetch (
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
        );
     const words = await res.text();
     //console.log(words);
     const wordArray = words.split("\n"); //adds a delimeter to split the array of words with a line break
     //console.log(wordArray);
     const randomIndex = Math.floor(Math.random()* wordArray.length);
     word = wordArray[randomIndex].trim();
     inProgressDots(word);
};
getWord(); 


//Step 2 - Placeholder Function that will add placeholder dots for each letter
const inProgressDots = function (word) {
    const dotLetterHolderArray = []; //create an empty array to hold letters of the word
    for (let letter of word) { //iterate over the word
        //console.log(letter);
        dotLetterHolderArray.push("●"); //add a dot to WordArray for each letter of variable word 
   }
   inProgress.innerText = dotLetterHolderArray.join(""); //update the "word in progress" paragraph to be the contents of the array joined together with no separator.
};
//inProgressDots(word);

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
    if(input.length === 0) {
        messagePara.innerHTML = "Whoops, you forgot to guess a letter!";
    } else if (input.length > 1) {
        messagePara.innerHTML = `Whoa there, just one letter at a time. You typed in ${input.length} letters, silly!`;
    } else if (!input.match(acceptedLetter)) {
        messagePara.innerHTML =`Hmmm, you entered ${input} and we're looking for just a letter from A to Z.`;
    } else {
        messagePara.innerHTML = `You guessed the letter ${input.toUpperCase()}`;
        return input;
    }
};

/*write a second function that captures the player’s guess to see if they’ve already guessed that letter. If not, the function pushes the letter to an array of guessed letters.*/
//word variable "guessedLetters" array created above

const makeGuess = function(guessed) {
    guessed = guessed.toUpperCase(); 
    console.log(guessed);
        if (guessedLetters.includes(guessed)) {
            console.log(`${guessed} is a repeat!`);
            messagePara.innerHTML = `Whoops! You guessed the letter ${guessed} already. Please try again.`;
        } else {
            guessedLetters.push(guessed);
            console.log(guessedLetters);
            updateGuesses(guessed);
            countGuesses(guessed);
            updateWord(guessedLetters);
        } 
};

//Step 4: Create a Function to Show the Guessed Letters

const updateGuesses = function(input) {
    lettersGuessed.innerHTML = ""; //clears list each time user makes a guess
    //Create a new list item for each letter inside your guessedLetters array (i.e., the global variable) and add it to the unordered list.
    for (let letter of guessedLetters) {
        let li = document.createElement("li");
        li.innerHTML = letter; //need to create list with prior and new letter each time user clicks/makes a guess
        lettersGuessed.append(li);
    }
};

//Step 4: Create a Function to Update the Word in Progress
const updateWord = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    //split the word string into an array so it can appear in the guessedLetters array.
    const wordArray = wordUpper.split("");
    //console.log(wordArray); //Array(8) [ "M", "A", "G", "N", "O", "L", "I", "A" ]
    //Check if the wordArray contains any letters from the guessedLetters array.
    const wordInProgress = []; //create a new array to hold correctly guessed letters and placeholder dots
    for (let letter of wordArray) { //loop over wordArray to check for any correctly guessed letters
        if (guessedLetters.includes(letter)) {
            wordInProgress.push(letter); //push correctly guessed letters into the new array
        } else {
            wordInProgress.push("●") //push placeholder dots for letters not yet guessed.
        }
    }
    console.log(wordInProgress);
    inProgress.innerText = wordInProgress.join(""); //join the letters in the array and display in the paragraph for word that is in progress
    //console.log(inProgress);
    checkWin();
};

//Step 5: Create a function to count guesses remaining
const countGuesses = function(guess) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");

        if (wordArray.includes(guess)) {
            messagePara.innerHTML = `Nice guess! ${guess} is in the word.`;
        } else {
            messagePara.innerHTML = `Oh, sorry. The word does not contain the letter ${guess}.`;
            remainingGuesses -= 1;
            console.log(remainingGuesses);
        }

        if (remainingGuesses === 0) {
            messagePara.innerHTML =  `Oh no! You are all out of guesses. The word was "${word.toUpperCase()}". Better luck next time! Click the button to play again!`;
            startOver();
            remainingGuesses = 8;
        } else if (remainingGuesses === 1) {
            span.innerHTML =  `just 1 guess`;
        } else {
            span.innerHTML = `${remainingGuesses} guesses`;
        }
};

//Step 4: Create a function to check if the player won
const checkWin = function() {
    if(word.toUpperCase() === inProgress.innerText) {
        messagePara.classList.add("win");
        messagePara.innerHTML = `<p class="highlight">You guessed the word!!! Hoooooray! 🎉  Congrats! 🏆</p>`;
        startOver();
    }
};

//Step 6: Play it Again!
const startOver = function () {
    guessButton.classList.add("hide");
    guessesRemaining.classList.add("hide");
    lettersGuessed.classList.add("hide");
    playAgainButton.classList.remove("hide");
};



