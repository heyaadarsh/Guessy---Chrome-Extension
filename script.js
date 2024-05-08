let num = 0;
function chageNum(){
    return num = parseInt(Math.random()*100+1);
}
chageNum();

console.log(`Number: ${num}`);

const guessyTitle = document.getElementById('topLine');
let input = document.getElementById('inp');
const submit = document.getElementById('sbt');

// Add event listener for Enter key press on the document
document.addEventListener('keypress', function(event) {
    // Check if the pressed key is Enter (key code 13) and if the target is the input field
    if (event.keyCode === 13 && event.target === input) {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Trigger a click on the Guess button
        submit.click();
    }
});

const lowOrHi = document.querySelector('.lowOrHi');
const prev = document.querySelector('.prevGuess');
const rem = document.querySelector('.remGuess');
const startOver = document.querySelector('.results')


let prevGuess = [];
let guessRem = 0;
let playGame = true;

if(playGame){

    submit.addEventListener('click', (e)=>{
        e.preventDefault();
        const userVal = parseInt(input.value);
        validateGuess(userVal);
    })
}

function validateGuess(guess){
    console.log(`guessRem Val: ${guessRem}`);
    if(isNaN(guess)){
        guessyTitle.innerHTML = `Uh Oh! Please Enter a Number.`;
    }
    else if(guess<1){
        guessyTitle.innerHTML = `Your number is less than 1. Enter a number between 1 to 100.`;
    }
    else if(guess>100){
        guessyTitle.innerHTML = `Your number is greater than 100. Enter a number between 1 to 100.`;
    }
    else{
        prevGuess.push(guess);
        if(guessRem===10){
            endGame();
            console.log(`checking the guess (if): ${guess} at ${guessRem}`);
            displayGuess(guess);
            displayMessage(`OOPS! The number was ${num}. Play Again!!`)
            
        }
        else{
            displayGuess(guess);
            checkGuess(guess);
            console.log(`checking the guess (else): ${guess} at ${guessRem}`);
        }
    }

}

function checkGuess(guess){
    if(guess===num){
        // console.log(`checking the guess: ${guess} at ${guessRem}`);
        guessyTitle.innerHTML = `WoHoo! You guessed it right, it was ${num}.`;
        endGame();
    }
    else if(guess<num){
        guessyTitle.innerHTML = `You Guess is too small.`;
        // console.log(`checking the guess: ${guess} at ${guessRem}`);
    }
    else{
        guessyTitle.innerHTML = `You Guess is too large.`;
        // console.log(`checking the guess: ${guess} at ${guessRem}`);
    }

}

function displayGuess(guess){
    input.value = '';
    prev.innerHTML += `${guess}, `;
    guessRem++;
    rem.innerHTML = `Remaining Guesses: ${10 - guessRem}`;
}

function displayMessage(message){
    guessyTitle.innerHTML = `${message}`;

}

function endGame(){
    input.val = '';
    input.setAttribute('disabled', '');
    lowOrHi.innerHTML = `<p id="restart">Click here to restart the game!!</p>`;
    playGame = false;
    newGame();
}

function newGame(){
    const newGameButton = document.querySelector('#restart');
    newGameButton.addEventListener('click', (e)=>{
        prevGuess = [];
        guessRem = 0;
        prev.innerHTML = `Previous Guesses: `;
        rem.innerHTML = `Remaining Guesses: ${10 - guessRem}`;
        input.removeAttribute('disabled');
        lowOrHi.innerHTML = `Let's play the game!!`;
        playGame = true;
        chageNum();
        console.log(num);
        guessyTitle.innerHTML = `So Again, I am thinking of a number between 1 to 100. Best Of Luck!`;
    });

}