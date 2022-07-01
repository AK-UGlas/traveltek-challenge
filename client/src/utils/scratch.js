const TIME_HHMMSS_REGEXP = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/;
const IATA_REGEXP        = /^[A-Z]{3}$/;
const timeString = "11:23:00";
const invalidTimeString = "--:-3";

// validate timestring is in format "HH:MM:SS"
// (from https://stackoverflow.com/questions/5563028/how-to-validate-with-javascript-an-input-text-with-hours-and-minutes
const validateHhMmSs = (inputString) => {
    return TIME_HHMMSS_REGEXP.test(inputString);
}

const validateIata = (inputString) => {
    return IATA_REGEXP.test(inputString);
}

// Handling time zones
var d = new Date();
var n = d.getTimezoneOffset();







