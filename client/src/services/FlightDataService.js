const flightsUrl = "http://localhost:4444/api/flights";

const FlightDataService = {
    
    getAllFlights() {
        return fetch(flightsUrl)
            .then(res => res.json());
    },

    getFlightsByDeparture() {
        return fetch(`${flightsUrl}/departures`)
            .then(res => res.json());
    },

    getFlightsByDestination() {
        return fetch(`${flightsUrl}/destinations`)
            .then(res => res.json());
    },

    getDeparturesBefore(time) {
        return fetch(`${flightsUrl}/schedules/${time}`)
            .then(res => res.json());
    },

    getFullJourneys(from, to) {
        return fetch(`${flightsUrl}/departures/${from}-${to}`)
            .then(res => res.json());
    }
};

export default FlightDataService;