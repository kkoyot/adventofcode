const fs = require('fs');

const exampleInput = fs.readFileSync('./example', 'utf8').split('\n');
const input = fs.readFileSync('./input', 'utf8').split('\n');

const NUMBERS_REGEX = new RegExp(/^\s*([0-9]+)\s+([0-9]+)\s+([0-9]+)\s+([0-9]+)\s+([0-9]+)\s*/);

class InputParser {

    drawings = [];
    boards = [];

    constructor(input) {
        this.parseInput(input);
    }

    parseInput(inputString) {
        const drawingsLine = inputString.shift();
        inputString.shift();
        this.parseDrawing(drawingsLine);
        this.createBoards(inputString);        
    }

    parseDrawing(numbersLine) {
        this.drawings = numbersLine.split(',');
    }

    createBoards(boardsString) {
        let board = [];
        let i = 0;
        for (let line of boardsString) {
            const parsedLine = NUMBERS_REGEX.exec(line);
            if (parsedLine) {
                parsedLine.splice(1).forEach((number, idx) => {
                    board.push({ value: number, x: i, y: idx, marked: false});
                });
                i++;
            } else {
                i = 0;
                this.boards.push(board);
                board = [];
            }
        }
    }
}

const exampleParser = new InputParser(exampleInput);
const inputParser = new InputParser(input);

module.exports = {
    example: {
        drawings: exampleParser.drawings,
        boards: exampleParser.boards
    },
    input: {
        drawings: inputParser.drawings,
        boards: inputParser.boards
    }
}