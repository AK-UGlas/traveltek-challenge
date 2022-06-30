const flightsURL = "http://localhost:4444/api/flights/";

const FlightDataService = {
    
    getAllFlights() {
        return fetch(flightsURL)
            .then(res => res.json());
    },

    getFlightsByDeparture() {
        return fetch(flightsURL + "departures")
            .then(res => res.json());
    },

    getDeparturesBefore(time) {
        return fetch(flightsURL + "departures/" + time)
            .then(res => res.json());
    },

    getFlightsByDestination() {
        return fetch(flightsURL + "destinations")
            .then(res => res.json());
    }
};

export default FlightDataService;