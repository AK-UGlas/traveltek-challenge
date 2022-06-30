import React, { useEffect, useState } from 'react';
import { ROUND_FACTOR } from './utils/constants';
import { createFrequencyArray, removeEmptyVals, validateHhMmSs } from './utils/utilities';
import AirportInfoService from './services/AirportInfoService';
import FlightDataService from './services/FlightDataService';

// react components
import DestinationsList from './components/DestinationsList';
import CountryInfo from './components/CountryInfo';
import DepartureTimes from './components/DepartureTimes';

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
    let departuresBefore = 0;
    if (validateHhMmSs(departureTime)) {
      // grab all flight data from before this time
      FlightDataService.getDeparturesBefore(departureTime)
      .then(data => setFlightsBefore(data.length))
    } else {
      setFlightsBefore(0)
    }
  }

  // map destination countries using unique airport codes
  const getCountries = (airports) => {
    const destCountries = airports.map(airport => {
      return AirportInfoService.getAirportInfo(airport.destair);
    });
    Promise.all(destCountries)
    .then(responses => Promise.all(responses.map( res => res.country )))
    .then(countries => {
      const newDestinations = {data: [], set: true, countriesSet: true};

      for (let idx = 0; idx < countries.length; idx++) {
          newDestinations.data.push({...destinations.data[idx], country: countries[idx]})
      };
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
      </div>
    );
  }
  return (<h1>Loading data</h1>)
  
}

export default App;
