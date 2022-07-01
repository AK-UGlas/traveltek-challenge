const express = require("express");
const router = express.Router();
const repo = require('../data/repository.js');
const utils = require('../utils/utilities.js');

router.get('/', (req, res) => {
    res.json(utils.filterByKey(repo.flightData, 'depair'));
});

// router.get('/class', (req, res) => {
//     res.json(utils.filterByKey(repo.flightData, 'outflightclass'))
// })

router.get('/:depair-:destair', (req, res) => {
    const matchingFlight = repo.flightData.filter( (flight) => {
        return flight.depair == req.params.depair && flight.destair == req.params.destair;
    });
    res.json(matchingFlight);
})

module.exports = router;