const fs = require('fs');
const fileName = process.argv[2];
if (!fileName) {
    console.log('No file provided!');
    process.exit(1);
}
const MATCH_WORDS_PATTERN = 'one|two|three|four|five|six|seven|eight|nine';
const MATCH_NUMBERS = new RegExp(`[1-9]|${MATCH_WORDS_PATTERN}`, 'g');
const MATCH_NUMBERS_REVERSED = new RegExp(`[1-9]|${MATCH_WORDS_PATTERN.split('').reverse().join('')}`);
const WORD_MAP = new Map([
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['seven', 7],
  ['eight', 8],
  ['nine', 9],
])

const parseLine = (line) => {
  const matched = [...line.matchAll(MATCH_NUMBERS)];
  let firstChar, secondChar;
  if (!matched.length) {
    firstChar = 0;
  } else {
    firstChar = WORD_MAP.get(matched[0][0]) ?? matched[0][0];
  }

  const reversedLine = line.split('').reverse().join('');
  const matchedReversed = reversedLine.match(MATCH_NUMBERS_REVERSED);

  if (!matchedReversed) {
    secondChar = firstChar;
  } else {
    secondChar = WORD_MAP.get(matchedReversed[0].split('').reverse().join('')) ?? matchedReversed[0];
  }

  return parseInt(`${firstChar}${secondChar}`);
}

const runCalibrator = (filePath) => {
    const lines = fs.readFileSync(filePath, 'utf8');
    const numbers = lines.split('\n').map(parseLine);
    const result = numbers.reduce((acc, lastValue) => acc + lastValue, 0);
    console.log(result);
}


runCalibrator(fileName);