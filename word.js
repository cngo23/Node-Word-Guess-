var Letter = require("./letter.js");

function Word(word){
    this.word = word;
};

Word.prototype.buildArray = function() {
    this.letters = [];
    for (var item of this.word) {
        var newLetter = new Letter(item);
        this.letters.push(newLetter);
    };

    this.displayWords();
};
Word.prototype.displayWords = function() {
    this.displayArr = [];
    for (var item of this.letters){
        this.displayArr.push(item.display());
    }
};
Word.prototype.isRight = function(guess){
    for (var item of this.letters) {
        item.letterGuess(guess);
    }
    this.displayWords();
}

module.exports = Word;