const express = require("express");
const router = express.Router();
const repo = require('../data/repository.js');

// return all departures
router.get('/', (req, res) => {
    // get all departure and arrival times as an object pair
    const flightSchedules = repo.flightData.map((flight) => {
        return {indeparttime: flight.indeparttime, outarrivaltime: flight.outarrivaltime};
    });
    res.json(flightSchedules);
});

router.get('/:outdeparttime', (req, res) => {
    const { outdeparttime } = req.params;
    const earlierFlights = repo.flightData.filter((flight) => flight.outdeparttime < outdeparttime);
    res.send(earlierFlights);
});

module.exports = router;