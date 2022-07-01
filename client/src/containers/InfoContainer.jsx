import React, { useEffect, useState } from 'react';
import { ROUND_FACTOR, TIME_HHMMSS_REGEXP, IATA_REGEXP } from '../utils/constants';
import { createFrequencyArray, removeEmptyVals, validateHhMmSs, validateInput, validateInputStringFormat } from '../utils/utilities';

// api services
import AirportInfoService from '../services/AirportInfoService';
import FlightDataService from '../services/FlightDataService';
import TimezoneService from '../services/TimezoneService';

// react components
import DestinationsList from '../components/DestinationsList';
import CountryInfo from '../components/CountryInfo';
import DepartureTimes from '../components/DepartureTimes';
import JourneyTimes from '../components/JourneyTimes';

export const InfoContainer = () => {

  const [percentage, setPercentage] = useState(0);
  const [flightCount, setFlightCount] = useState(0);
  const [numFlightsBefore, setFlightsBefore] = useState(0);
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState({data:[], set: false, countriesSet: false});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    startUp();
  }, []);

  useEffect(() => {
    if (!destinations.countriesSet && destinations.set) {
      getCountries(destinations.data);
    }
  }, [destinations.set]);

  // fetch data required at app start
  const startUp = () => {
    getOrigins();
    getDestinations();
  } 

  const getOrigins = () => {
    FlightDataService.getFlightsByDeparture()
    .then(dep => setOrigins( [...new Set(dep)].sort() ));
  };
  
  const getDestinations = async () => {
    FlightDataService.getFlightsByDestination()
    .then(dest => {
      setFlightCount(dest.length);
      setDestinations({data: createFrequencyArray(dest, "destair"), set: true});
    });
  };

  const calculatePercentage = (selectedDest) => {
    let runningTotal = 0;
    destinations.data.forEach((destination) => {
      if (destination.country === selectedDest) runningTotal += destination.count;
    });
    // save number to 3 decimal places 
    setPercentage( Math.round( ((((runningTotal / flightCount) * 100) + Number.EPSILON) * ROUND_FACTOR) ) / ROUND_FACTOR );
  };

  const getFlightsBefore = (departureTime) => {
    // ensure input time string is in a valid format (HH:MM:SS);
    if (validateInputStringFormat(departureTime, TIME_HHMMSS_REGEXP)) {
      // grab all flight data from before this time
      FlightDataService.getDeparturesBefore(departureTime)
      .then(data => setFlightsBefore(data.length));
    } else {
      setFlightsBefore(0);
    };
  };

  const getAverageJourneyTime = (from, to) => {
    // ensure inputs conform to IATA format
    if (validateInputStringFormat(from, IATA_REGEXP) && validateInputStringFormat(to, IATA_REGEXP)) {
      
        // get timezones for origin and destination
      const tzObjs = [from, to].map( item => {
        return destinations.data.find( obj => obj.destair === item);
      });

      // use lat and long values to grab timezone information from origin and destination
      // then convert destination to origin time zone and calculate the time difference
      
      Promise.all(tzObjs.map( tz => {
        return TimezoneService.getTimezoneFromLatlong(tz.lat, tz.long)
      }))
      .then( res => res.map ( zone => zone.timeZone) )
      .then( zones => queryFlightPath(from, to, zones))
           
      
      // .then(journeys => {
      //   const timeZones = journeys.map( )
      // })
    }
  }

  const queryFlightPath = (from, to, timezones) => {
     
    // get all flights matching original flightpath query
    FlightDataService.getFullJourneys(from, to)
    .then( flightPaths => flightPaths.map( path => {
      return {outdepdt: `${path.outdepartdate} ${path.outdeparttime}`, outarrdt: `${path.outarrivaldate}T${path.outarrivaltime}`}
    }))
    .then( datetimes => Promise.all(datetimes.map( dt => {
      TimezoneService.convertToTimeZone(timezones[0], dt.outdepdt, timezones[1])
      .then(res => matchTimeZones(res.conversionResult.dateTime, dt.outarrdt))
    })));
  }

  const matchTimeZones = (outDepartureTime, outArrivalTime) => {
    console.log(outDepartureTime);
    console.log(outArrivalTime);
  }

  // map destination countries using unique airport codes
  const getCountries = (airports) => {
    const destCountries = airports.map(airport => {
      return AirportInfoService.getAirportInfo(airport.destair);
    });
    Promise.all(destCountries)
    .then(responses => Promise.all(responses.map( res => {
      return {country: res.country, lat: res.latitude, long: res.longitude} 
    })))
    .then(countries => {
      // add country data to destinations data, required for later step
      const newDestinations = {data: [], set: true, countriesSet: true};
      
      for (let idx = 0; idx < countries.length; idx++) {
          newDestinations.data.push({...destinations.data[idx], ...countries[idx]})
      };
                                  
      setDestinations(newDestinations);
      setCountries(countries.map( item => item.country)
                            .filter( (country, pos, rep) => rep.indexOf(country) === pos)
                            .filter( removeEmptyVals )
                            .sort());
    });  
  };

    if (destinations.countriesSet) {
        return (
            <>
                <DestinationsList destinations={destinations.data} />
                <CountryInfo countries={countries} percentage={percentage} calcPerc={calculatePercentage} />
                <DepartureTimes flightsBefore={getFlightsBefore} numFlightsBefore={numFlightsBefore} />
                <JourneyTimes origins={origins} destinations={destinations.data} getJourneyTime={getAverageJourneyTime} />
            </>
        )}
    return (<h1>Loading data</h1>)
};

export default InfoContainer;