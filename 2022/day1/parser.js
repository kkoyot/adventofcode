const fs = require('fs');
const exampleInput = fs.readFileSync('./example', 'utf8');
const input = require('./input', 'utf8');


module.exports = {
	exampleData: exampleInput.split('\n'),
	data: input.split('\n')
};
