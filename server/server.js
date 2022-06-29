const express = require('express');

// invoke express and allow our API to be accessible anywhere 
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4444;
const createFlightRouter = require('./routes/flight_router');
const createDeparturesRouter = require('./routes/departures_router');
const createDestinationsRouter = require('./routes/destinations_router');

// remove the "same origin policy" requirement for simplicity
app.use(cors());

const ApiRootUrl = '/api/flights';
app.use(ApiRootUrl, createFlightRouter);
app.use(ApiRootUrl + '/departures', createDeparturesRouter);
app.use(ApiRootUrl + '/destinations', createDestinationsRouter);

// root page
app.get('/', (req, res) => {
    res.sendStatus(200)
});

app.listen(PORT, function () {
    console.log(`Flight data API server running on port ${PORT}`);
});
