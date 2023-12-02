const fs = require('fs');
const fileName = process.argv[2];
if (!fileName) {
    console.log('No file provided!');
    process.exit(1);
}
const MATCH_NUMBERS = new RegExp('[0-9]', 'g');

const parseLine = (line) => {
  const matched = [...line.matchAll(MATCH_NUMBERS)]; 
  if (!matched.length) {
    return 0;
  }

  const firstChar = matched[0][0];
  const secondChar = Array.from(matched).at(-1)[0];
  return parseInt(`${firstChar}${secondChar}`);
}

const runCalibrator = (filePath) => {
    const lines = fs.readFileSync(filePath, 'utf8');
    const numbers = lines.split('\n').map(parseLine);
    console.log(numbers);
    const result = numbers.reduce((acc, lastValue) => acc + lastValue, 0);
    console.log(result);
}


runCalibrator(fileName);