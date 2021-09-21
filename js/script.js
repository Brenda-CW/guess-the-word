const lettersGuessed = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
let txtInput = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const guessesRemaining = document.querySelector(".remaining");
const span = document.querySelector("span");
const messagePara = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia"; //starting word until API fetch is in place

//Function that will add placeholders for each letter
const inProgressDots = function (word) {
    const wordArray = []; //create an empty array
    for (let letter of word) { //iterate over the word
        //console.log(letter);
        wordArray.push("●"); //for each letter of word add a dot to the end of the WordArray
   }
   inProgress.innerText = wordArray.join(""); //update the "word in progress" paragraph to be the contents of the array joined together with no separator.
};
inProgressDots(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    var guess = txtInput.value;
    console.log(guess);
    txtInput.value = "";
});

