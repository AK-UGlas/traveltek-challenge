const options = {
    method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ea3969fddcmsh92fbc35e1708974p1106e8jsncea31801db8f',
		'X-RapidAPI-Host': 'airport-info.p.rapidapi.com'
	}
};

const airportsUrl = 'https://airport-info.p.rapidapi.com/airport';

const AirportInfoService = {

    getAirportInfo(iata) {
        console.log(iata);
        let query = airportsUrl + '?iata=' + iata; 
        return fetch(query, options)
            .then(res => res.json())
    }

};

export default AirportInfoService;