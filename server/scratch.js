// xml and filereader dependencies
// const fs = require('fs');
// const parser = require('xml2json');
// const xmlPath = './data/flightData_reduced.xml';

// const xmlData = fs.readFileSync(xmlPath, 'utf8');
// const jsonData = JSON.parse(parser.toJson(xmlData));

// // extract all segment objects from flightData
// const flightData = Object.values(jsonData.flights)[0];

// const origins = flightData.map(({ depair }) => depair);
// const key = "depair";
// const singleVal = flightData[0];
// console.log(singleVal[key]);

const array = ["apples", "oranges", "oranges", "oranges", "bananas", "bananas", "oranges", "bananas", "bananas", "bananas"];


// var frequency = {};

// for (let idx = 0; idx < array.length; idx++) {
//     if (!(array[idx] in frequency)) {
//         frequency[array[idx]] = 1;
//     } else {
//         ++frequency[array[idx]];
//     }
// }
// console.log(frequency);

// var uniques = array.filter((value) => {
//     return ++frequency[value] == 1;
// });

// uniques.sort((a, b) => {
//     return frequency[b] - frequency[a];
// });


// var keyString = 'depair';

// var freqPairs = Object.keys(frequency).map( key => {
//         return ({[keyString]: key, freq: frequency[key]})
//     });

// console.log(freqPairs);


// const dests = [
//     {key: "LAX", val: 4},
//     {key: "DUB", val: 5},
//     {key: "GLA", val: 2},
//     {key: "EDI", val: 2},
//     {key: "LHR", val: 3}
// ];

//console.log(dests.sort((a, b) => b.val - a.val));

//console.log(  dests.sort((a,b) => (a.key > b.key)           ? 1 : ((b.key > a.key)           ? -1 : 0))  );

// objes.sort((a,b) => (a.last_nom > b.last_nom) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0));
// props = {};
// const available = !(props.flights === undefined);

// console.log(available);

[
    {indeparttime: "11:21:00"}
]

// let items = [
//     {code: 'LAX', country: "US"},
//     {code: 'DBL', country: "Ireland"},
//     {code: 'GLA', country: "Scotland"},
//     {code: 'EDI', country: "Edinburgh"},
//     {code: 'DXB', country: "UAE"}
// ];



const uniqueArray = array.filter((item, pos) => {
    return array.indexOf(item) === pos;
})

console.log(uniqueArray);

// using spread operator to add more than 1 entry at a time;

let items = [
    {'a': 1, 'b': 2},
    {'a': 2, 'b': 4},
    {'a': 4, 'b': 8},
    {'a': 8, 'b': 16}
];

// we want to add some elements to the objects above

let additions = [
    {'c': 3, 'd': 4},
    {'c': 6, 'd': 8},
    {'c': 12, 'd': 16},
    {'c': 24, 'd': 32}
]

const newObjArray = [];

for (let idx = 0; idx < items.length; idx++) {
    newObjArray.push({...items[idx], ...additions[idx]});
};

console.log(newObjArray);