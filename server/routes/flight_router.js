const express = require("express");
const router = express.Router();
const repo = require('../data/repository.js');

router.get('/', (req, res) => {
    res.json(repo.flightData);
});


module.exports = router;