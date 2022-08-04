const COLS = 20;
const ROWS = 20;

const Orienation = {
    Horizontal: 0,
    Vertical: 1
};

const WORDS = ['emil',
    'karol',
    'martin',
    'olaf',
    'damian',
    'leszek',
    'hubert',
    'oktawian',
    'patryk',
    'eryk',
    'roman',
    'gustaw',
    'jacek',
    'ludwik',
    'jakub',
    'allan',
    'kordian',
    'bogumił',
    'marcel',
    'oktawian',
    'michał',
    'krzysztof',
    'gabriel',
    'dobromił',
    'józef',
    'amir',
    'bruno',
    'marek',
    'edward',
    'kazimierz',
    'emanuel',
    'bolesław',
    'arkadiusz',
    'natan',
    'eugeniusz',
    'dominik',
    'miłosz',
    'jakub',
    'antoni',
    'adam',
    'robert',
    'kordian',
    'bolesław',
    'marcin',
    'alexander',
    'marek',
    'radosław',
    'henryk',
    'edward',
    'hubert',
    'bartłomiej',
    'hubert',
    'jerzy',
    'miron',
    'juliusz',
    'marian',
    'oskar',
    'aleks',
    'bruno',
    'kamil',
    'jakub',
    'florian',
    'emanuel',
    'michał',
    'fryderyk',
    'gniewomir',
    'eugeniusz',
    'olgierd',
    'gabriel',
    'marian',
    'eugeniusz',
    'bartłomiej',
    'gniewomir',
    'mikołaj',
    'milan',
    'adam',
    'kacper',
    'radosław',
    'borys',
    'radosław',
    'jerzy',
    'eugeniusz',
    'kuba',
    'ariel',
    'eugeniusz',
    'bronisław',
    'gabriel',
    'juliusz',
    'alexander',
    'damian',
    'bronisław',
    'dominik',
    'kornel',
    'anastazy',
    'aureliusz',
    'ariel',
    'krzysztof',
    'milan',
    'maciej',
    'dorian'];




function createDefaultCrossWord(rowsNumber, colsNumber) {
    let crossWord = new Array(rowsNumber);

    for (let row = 0; row < rowsNumber; row++) {
        crossWord[row] = new Array(colsNumber);
        for (let col = 0; col < colsNumber; col++) {
            let cell = {
                value: '',
                enabled: true
            };
            crossWord[row][col] = cell;
        }
    }

    return crossWord;
};

function canPlaceWord(crossWord, word, rowNumber, colNumber, orienation, matchIndex) {

    let wordLength = word.length;

    if (orienation == Orienation.Horizontal) {

        if (colNumber < 0)
            return false;
        if (rowNumber < 0 || rowNumber > ROWS - 1)
            return false;
        if (wordLength + colNumber - 1 > COLS - 1)
            return false;

        let letters = Array.from(word);

        for (let letter = 0; letter < letters.length; letter++) {
            let letterValue = crossWord[rowNumber][colNumber + letter].value;
            if (letterValue != '' && letterValue != letters[letter]) {
                return false;
            }
            if (letter != matchIndex) {
                if (colNumber - letter - 1 > 0) {
                    if (crossWord[rowNumber][colNumber - 1].value != '') {
                        return false;
                    }
                }
                if (rowNumber != 0) {
                    if (crossWord[rowNumber - 1][colNumber + letter].value != '') {
                        return false;
                    }
                }

                if (rowNumber != ROWS - 1) {
                    if (crossWord[rowNumber + 1][colNumber + letter].value != '') {
                        return false;
                    }
                }
            }
        }

        if (colNumber + wordLength + 1 < COLS) {
            if (crossWord[rowNumber][colNumber + wordLength + 1].value != '') {
                return false;
            }
        }

        return true;
    } else {
        if (rowNumber < 0)
            return false;
        if (colNumber < 0 || colNumber > COLS - 1)
            return false;
        if (wordLength + rowNumber - 1 > ROWS - 1)
            return false;

        let letters = Array.from(word);

        for (let letter = 0; letter < letters.length; letter++) {
            let letterValue = crossWord[rowNumber + letter][colNumber].value;
            if (letterValue != '' && letterValue != letters[letter]) {
                return false;
            }
            if (letter != matchIndex) {
                if (rowNumber - letter - 1 > 0) {
                    if (crossWord[rowNumber - 1][colNumber].value != '') {
                        return false;
                    }
                }
                if (colNumber != COLS - 1) {
                    if (crossWord[rowNumber + letter][colNumber + 1].value != '') {
                        return false;
                    }
                }
                if (colNumber != 0) {
                    if (crossWord[rowNumber + letter][colNumber - 1].value != '') {
                        return false;
                    }
                }
            }
        }

        if (rowNumber + wordLength + 1 < ROWS) {
            if (crossWord[rowNumber + wordLength + 1][colNumber].value != '') {
                return false;
            }
        }

        return true;
    }
}

function placeWord(crossWord, word, rowNumber, colNumber, orienation) {

    if (orienation == Orienation.Horizontal) {
        let letters = Array.from(word);

        for (let letter = 0; letter < letters.length; letter++) {
            crossWord[rowNumber][colNumber + letter].value = letters[letter];
        }
    } else {

        let letters = Array.from(word);

        for (let letter = 0; letter < letters.length; letter++) {
            crossWord[rowNumber + letter][colNumber].value = letters[letter];
        }
    }
}

function tryPlaceWordHorizontaly(crossWord, word) {

    let letters = Array.from(word);
    for (let letter = 0; letter < letters.length; letter++) {
        for (let row = 0; row <= ROWS - 1; row++) {
            for (let col = 0; col <= COLS - 1; col++) {
                if (crossWord[row][col].value === letters[letter]) {
                    let canPlace = canPlaceWord(crossWord, word, row, col - letter, Orienation.Horizontal, letter);
                    if (canPlace) {
                        placeWord(crossWord, word, row, col - letter, Orienation.Horizontal);
                        return true;
                    }
                }
            }
        }
    }

    return false;
}

function tryPlaceWordVerticaly(crossWord, word) {

    let letters = Array.from(word);
    for (let letter = 0; letter < letters.length; letter++) {
        for (let row = 0; row <= ROWS - 1; row++) {
            for (let col = 0; col <= COLS - 1; col++) {
                if (crossWord[row][col].value === letters[letter]) {
                    let canPlace = canPlaceWord(crossWord, word, row - letter, col, Orienation.Vertical, letter);
                    if (canPlace) {
                        placeWord(crossWord, word, row - letter, col, Orienation.Vertical);
                        return true;
                    }
                }
            }
        }
    }

    return false;
}

function placeFirstWord(crossWord) {
    let randomCol = 0;
    let randomRow = 0;
    let randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    let randomForOrientation = [Math.floor(Math.random() * Object.keys(Orienation).length)];
    let randomOrientation = Orienation[Object.keys(Orienation)[randomForOrientation]];

    if (randomOrientation == Orienation.Horizontal) {
        randomCol = Math.floor(Math.random() * (COLS - randomWord.length));
        randomRow = Math.floor(Math.random() * ROWS);
    } else {
        randomCol = Math.floor(Math.random() * COLS);
        randomRow = Math.floor(Math.random() * (ROWS - randomWord.length));
    }

    if (randomOrientation == Orienation.Horizontal) {
        let letters = Array.from(randomWord);
        for (let letter = 0; letter < letters.length; letter++) {
            crossWord[randomRow][randomCol + letter].value = letters[letter];
        }
    } else {
        let letters = Array.from(randomWord);
        for (let letter = 0; letter < letters.length; letter++) {
            crossWord[randomRow + letter][randomCol].value = letters[letter];
        }
    }
}

let maxWords = WORDS.length;

function fillCrossWord() {
    let crossWord = createDefaultCrossWord(COLS, ROWS);
    let wordsCount = 1;
    placeFirstWord(crossWord);


    for (let i = 0; i < WORDS.length; i++) {
        let word = WORDS[i];

    

        if (tryPlaceWordHorizontaly(crossWord, word) == false) {
            if (tryPlaceWordVerticaly(crossWord, word)) {
                wordsCount++;
            }
        }
    }

    return { crossWord: crossWord, 'wordsCount': wordsCount }
}

let filledCrossWord = fillCrossWord();
let bestResult = filledCrossWord.wordsCount;
let bestCrossWord = filledCrossWord.crossWord;

for (let iteration = 0; iteration < 100; iteration++) {
    filledCrossWord = fillCrossWord();
    if (filledCrossWord.wordsCount > bestResult) {
        bestResult = filledCrossWord.wordsCount;
        bestCrossWord = filledCrossWord.crossWord;
    }
}

window.onload = (event) => {
    var table = document.getElementById("table");

    for (let rowNumber = 0; rowNumber < ROWS; rowNumber++) {
        let row = table.insertRow(rowNumber);
        for (let colNumber = 0; colNumber < COLS; colNumber++) {
            var cell = row.insertCell(colNumber)
            cell.style.textAlign = "center";
            let cellValue = bestCrossWord[rowNumber][colNumber].value;
            if (cellValue == '') {
                cell.innerHTML = '';
            } else {
                cell.style.color = "red";
                cell.style.fontSize = "x-large";
                cell.innerHTML = cellValue;
            }
        }
    }
};

