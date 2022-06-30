const express = require("express");
const router = express.Router();
const repo = require('../data/repository.js');
const utils = require('../utils/utilities.js');

router.get('/', (req, res) => {
    res.json(utils.filterByKey(repo.flightData, 'depair'))
})

module.exports = router;