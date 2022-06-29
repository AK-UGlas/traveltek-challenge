
const sortByFrequency = (inArray) => {
    var frequency = {};

    //array.forEach((value) => { frequency[value] = 0; });

    for (let idx = 0; idx < inArray.length; idx++) {
        if (!(inArray[idx] in frequency)) {
            frequency[inArray[idx]] = 0;
        }
    }

    var uniques = inArray.filter((value) => {
        return ++frequency[value] == 1;
    });

    return uniques.sort((a, b) => {
        return frequency[b] - frequency[a];
    });
} 

const filterByKey = (data, key) => {
    const match = [];
    for (let idx = 0; idx < data.length; idx++) {
        match.push(data[idx][key]);
    }

   return match;
}

module.exports = {sortByFrequency, filterByKey};