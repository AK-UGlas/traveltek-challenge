const express = require("express");
const router = express.Router();
const repo = require('../data/repository.js');
const utils = require('../utils/utilities.js');

// return all departures
router
.route('/')
.get((req, res) => {
    res.json(utils.filterByKey(repo.flightData, "destair"));
});

module.exports = router;