var moment = require('moment');
const timeString = "11:23:00";

const invalidTimeString = "--:-3";

// validate timestring is in format "HH:MM:SS"
// (from https://stackoverflow.com/questions/5563028/how-to-validate-with-javascript-an-input-text-with-hours-and-minutes
const validateHhMmSs = (inputString) => {
    return /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(inputString);
}

console.log(validateHhMmSs(timeString));
console.log(validateHhMmSs(invalidTimeString));