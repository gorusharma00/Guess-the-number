let randomNo = parseInt(Math.random() * 100 + 1)

const submit = document.querySelector('.submit-btn')
const userInput = document.querySelector('#guessField')
const remaining = document.querySelector('.turns-remaining')
const guessSlot = document.querySelector('.guesses')
const playAgain = document.querySelector('#playAgain-btn')
const resultMessage = document.querySelector('.result-msg')
const scoreDisplay = document.querySelector('.score-stats')
const highScoreDisplay = document.querySelector('.high-score-stats')
const canvas =  document.getElementById('confeti')


const jsConfetti = new JSConfetti({ canvas })
let prevGuess = []
let numGuess = 0;
let playGame = true;
let score = 0;



if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value)
        validateGuess(guess);
    })
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter a valid number')
    }else if(guess < 1){
        alert('Please enter a number greater than 1')
    }else if(guess > 100){
        alert('Please enter a number less than 100')
    }else{
        prevGuess.push(guess);
        numGuess++;
        if(numGuess === 10){
            displayGuess(guess);
            displayMessage(`Game over. Random number was ${randomNo}`);
            endGame();
        }else{
            displayGuess(guess);
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    if(guess === randomNo){
        displayMessage(`Congratulation, you guessed it right`);
        endGame();
        scoreRanking(numGuess);
        jsConfetti.addConfetti({
            confettiNumber: 2000
        })
    }else if(guess > randomNo){
        displayMessage(`Number is too high`)
    }else if(guess < randomNo){
        displayMessage(`Number is too low`)
    }
}

function displayGuess(guess){
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    remaining.innerHTML = `${10 - numGuess}`
}

function displayMessage(message){
    resultMessage.innerHTML = `<h3>${message}</h3>`
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled', '')
    playGame = false
}

function newGame(){
    randomNo = parseInt(Math.random() * 100 + 1);
    prevGuess = []
    numGuess = 0;
    userInput.removeAttribute('disabled');
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${10 - numGuess}`
    playGame = true;
    resultMessage.innerHTML = ``
    scoreDisplay.innerHTML = ``
}

playAgain.addEventListener('click', function(e){
    newGame();
})

function scoreRanking(numGuess){
    if(numGuess<=10 || numGuess >= 7){
        score += 2
    }else if(numGuess <=6 || numGuess >=4){
        score += 3
    }else if(numGuess <=3 || numGuess >=1){
        score += 5
    }
    scoreDisplay.innerHTML = `${score}` 
    let highscore = 0;
    if(score > highscore){
        highscore = score;
    }
    highScoreDisplay.innerHTML = `${highscore}`
}
