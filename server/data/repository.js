const fs = require('fs');
const parser = require('xml2json');
//const XMLPATH = './data/flightData_reduced.xml';
const XMLPATH = './data/flightData_A.xml';

class DataRepository {
    constructor() {
        this.xmlPath = XMLPATH;
        this.flightData = this.populateData();
    }

    populateData() {
        const xmlData = fs.readFileSync(this.xmlPath, 'utf8');
        const jsonData = JSON.parse(parser.toJson(xmlData));
        return Object.values(jsonData.flights)[0];
    }

    get(flightId) {
        return;
    }
}

const repo = new DataRepository();

module.exports = repo;