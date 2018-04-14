var Word = require("./word.js");
var inquirer = require("inquirer");

var currentWord;
var check;
var lives;
var guessed = [];
var userGuess;

var validLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var wordBank = ["Mickey Mouse", "Donald Duck", "Goofy", "Simba", "Buzz Lightyear", "Stitch", "Ariel", "Mulan", "Cinderella", "Woody", "Nala", "Tinker Bell", "Winnie the Pooh", "Cruella de Vil", "Snow White", "Sleeping Beauty", "Moanna", "Nemo", "Aladdin", "Lightning McQueen", "Mater", "Mulan", "Tigger"];

function wordIndex(x) {
    return Math.floor(Math.random() * x);
}

function randomWord() {
    return wordBank[wordIndex(wordBank.length)];
}

function start() {
    inquirer.prompt([{
        type: "list",
        name: "start",
        message: "Do you know your Disney characters? Let's play a game!",
        choices: ["Play", "Quit.."]
    }]).then(function (answer) {
        switch (answer.start) {
            case "Play":
                console.log("Begin");
                console.clear();
                playGame();
                break;

            default:
                process.exit();
        };
    });
};

function createDisplay() {
    console.log(check.displayArr.join(" "));
    console.log(`Number of guesses left: ${lives}`);
};

function playGame() {
    currentWord = randomWord();
    console.clear();
    check = new Word(currentWord.toLowerCase());
    check.buildArray();

    lives = 8;
    guessed = [];

    createDisplay();
    runGame();
}

function checkGuess(rightWrong) {
    rightWrong;
    guessed.push(userGuess);
    createDisplay();
    runGame();
};

function runGame() {
    if ((lives > 0) && (check.displayArr.indexOf('_') > -1)) {
        inquirer.prompt([
            {
                message: 'Guess a letter!',
                name: 'guess',
                validate: function (value) {
                    if (validLetters.indexOf(value.toLowerCase()) > -1) {
                        return true;
                    } else if (value.length > 1) {
                        console.log('\n One Letter only!!')
                        return false;
                    }
                    console.log('\n Enter a valid letter to continue')
                    return false;
                }
            }

        ]).then(function (answer) {
            userGuess = answer.guess;
            console.clear();
            for (var item of check.letters) {
                if ((item.letter === userGuess) && (item.guess) || (guessed.indexOf(userGuess) > -1)) {
                    console.log(`You've already guessed that letter!`);
                    checkGuess(lives);
                    return;
                } 
                else if ((item.letter === userGuess) && (!item.guess)) {
                    console.log(`Correct Guess!`);
                    checkGuess(check.isRight(userGuess));
                    return;
                };
            };

            console.log('Incorrect Guess!');
            checkGuess(lives--);
            return;
        });
    } 
    else if (lives === 0) {
        console.log(`Sorry! The word was ${currentWord}`);
        
        beginAgain(); 
    } 
    else if (check.displayArr.indexOf('_') === -1) {
        console.log(`Congrats! You've correctly guessed the word ${currentWord}!`);
        
        beginAgain();
    }
};

function beginAgain() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'playAgain',
            message: 'Would you like to play again?',
            choices: ["Yes", "No.."]
        }
    ]).then(function (answer) {
        switch (answer.playAgain) {
            case "Yes":
                console.log("Let's go again!");
                console.clear();
                playGame();
                break;

            default:
                process.exit();
        };
    });
};

start();