function Letter(letter) {
    this.letter = letter;
    this.guess = false, 
    this.display = function () {
        if (this.letter === ' ') {
            return ' ';
        } else {
            if (this.guess) {
                return this.letter;
            } else {
                return '_';
            }
        }; 
    }
    this.letterGuess =  function(userGuess) {
        if (userGuess === this.letter) {
            this.guess = true;
        } else {
            return;
        }
    }
    
}
module.exports = Letter;