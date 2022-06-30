import React, { useEffect, useState } from 'react';
import { ROUND_FACTOR, TIME_HHMMSS_REGEXP, IATA_REGEXP } from './utils/constants';
import { createFrequencyArray, removeEmptyVals, validateHhMmSs, validateInput, validateInputStringFormat } from './utils/utilities';
import AirportInfoService from './services/AirportInfoService';
import FlightDataService from './services/FlightDataService';

// react components
import DestinationsList from './components/DestinationsList';
import CountryInfo from './components/CountryInfo';
import DepartureTimes from './components/DepartureTimes';
import JourneyTimes from './components/JourneyTimes';

import './App.css';

function App() {
  
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

  const startUp = () => {
    getOrigins();
    getDestinations();
  } 

  const getOrigins = () => {
    FlightDataService.getFlightsByDeparture()
    .then(dep => setOrigins(dep));
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
      FlightDataService.getFullJourneys(from, to)
      .then()
    }
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
      console.log(countries[0]);
      for (let idx = 0; idx < countries.length; idx++) {
          newDestinations.data.push({...destinations.data[idx], ...countries[idx]})
      };
      console.log(newDestinations.data);
      setDestinations(newDestinations);
      setCountries(countries.filter( (country, pos) => countries.indexOf(country) === pos)
                          .filter( removeEmptyVals )
                          .sort());
    });  
  };

  if (destinations.countriesSet) {
    return (
      <div>
          <DestinationsList destinations={destinations.data} />
          <CountryInfo countries={countries} percentage={percentage} calcPerc={calculatePercentage} />
          <DepartureTimes flightsBefore={getFlightsBefore} numFlightsBefore={numFlightsBefore} />
          <JourneyTimes origins={origins} destinations={destinations.data}/>
      </div>
    );
  }
  return (<h1>Loading data</h1>)
  
}

export default App;
