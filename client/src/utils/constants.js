// rounding constants
const DECIMAL_PLACES = 3;
export const ROUND_FACTOR = Math.pow(10, DECIMAL_PLACES);
export const MILLIS_PER_HOUR = 60 * 60 * 1000;

// reg expressions for front-end data validation 
export const TIME_HHMMSS_REGEXP = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/;
export const IATA_REGEXP        = /^[A-Z]{3}$/;