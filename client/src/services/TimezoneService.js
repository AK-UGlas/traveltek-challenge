// Time API: https://www.timeapi.io/swagger/index.html
const timezoneUrl = 'https://www.timeapi.io/api';

const TimezoneService = {
    
    getTimezoneFromLatlong(lat, long) {
        const query = `${timezoneUrl}/TimeZone/coordinate?latitude=${lat}&longitude=${long}`;

        let options = {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Origin': 'http://localhost:3000',
                'Access-Control-Request-Headers': 'access-control-allow-origin'
            }
        };

        return fetch(query, options)
            .then(res => res.json());
    },

    convertToTimeZone(fromZone, fromDateTime, toZone) {
        const query = `${timezoneUrl}/Conversion/ConvertTimeZone`;
        const body = {
            'fromTimeZone': fromZone,
            'dateTime': fromDateTime,
            'toTimeZone': toZone,
            'dstAmbiguity': '' 
        };

        let options = {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:3000'
            },
            body: JSON.stringify(body)
        };

        return fetch(query, options)
            .then(res => res.json());
    }
};

export default TimezoneService;