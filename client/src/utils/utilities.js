
// return array of unique values and their frequency in the input array
export const createFrequencyArray = (array, keyString) => {
    var frequency = {};

    for (let idx = 0; idx < array.length; idx++) {
        if (!(array[idx] in frequency)) {
            frequency[array[idx]] = 1;
        } else {
            ++frequency[array[idx]];
        }
    }

    var freqPairs = Object.keys(frequency).map( key => {
        return ({[keyString]: key, count: frequency[key]});
    });
    
    // return sorted alphabetically
    return sortByKey(freqPairs, keyString);
} 

// sort array of objects using an Object key
export const sortByKey = (array, keyString, isDescending) => {
    if (isDescending) {
        return array.sort( (a, b) => (a[keyString] < b[keyString]) ? 1 : ((b.keyString < a.keyString) ? -1 : 0) ); 
    }
    return array.sort( (a, b) => (a[keyString] > b[keyString]) ? 1 : ((b.keyString > a.keyString) ? -1 : 0) ); 
} 

// filter function: remove all duplicates
export const removeEmptyVals = (value) => {
    return value != null && value != ""; 
} 

// (from https://stackoverflow.com/questions/5563028/how-to-validate-with-javascript-an-input-text-with-hours-and-minutes
export const validateHhMmSs = (inputString) => {
    return /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(inputString);
}

 
