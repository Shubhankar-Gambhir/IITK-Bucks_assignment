const fs = require('fs');
const prompt = require('prompt-sync')({sigint: true});
var crypto = require('crypto')

const transaction = require('./Read_Transaction_Classes/Read_Transaction');

var file = prompt('Enter File path: ');
var Byte = fs.readFileSync(file);

var Transaction = new transaction(Byte);
Transaction.Display();
