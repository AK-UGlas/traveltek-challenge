
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

    console.log(freqPairs);
    
    // return sorted alphabetically
    return sortByKey(freqPairs, keyString);
} 

export const sortByKey = (array, keyString, isDescending) => {
    if (isDescending) {
        return array.sort( (a, b) => (a[keyString] < b[keyString]) ? 1 : ((b.keyString < a.keyString) ? -1 : 0) ); 
    }
    return array.sort( (a, b) => (a[keyString] > b[keyString]) ? 1 : ((b.keyString > a.keyString) ? -1 : 0) ); 
} 

 
