import React, { useEffect, useState } from 'react';
import { createFrequencyArray } from './utils/utilities';
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
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState({data:[], set: false, countriesSet: false});
  const [countries, setCountries] = useState([]);
  const [flightData, setFlightData] = useState([]);

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
    const runningTotal = 0;
    destinations.data.forEach((destination) => {
      if (destination.country === selectedDest) runningTotal += destination.count;
    });

    setPercentage( (runningTotal / flightCount) * 100 );
  }

  // map destination countries using unique airport codes
  const getCountries = (airports) => {
    const destCountries = airports.map(airport => {
      return AirportInfoService.getAirportInfo(airport.destair);
    });
    Promise.all(destCountries)
    .then(responses => Promise.all(responses.map( res => res.country )))
    .then(countries => {
      //console.log(destinations);
      const newDestinations = {data: [], set: true, countriesSet: true};

      for (let idx = 0; idx < countries.length; idx++) {
          newDestinations.data.push({...destinations.data[idx], country: countries[idx]})
      };
      setDestinations(newDestinations);
    });  
  };

  if (destinations.countriesSet) {
    return (
      <div>
          <DestinationsList destinations={destinations.data} />
          <CountryInfo countries={destinations.data} percentage={percentage} calcPerc={calculatePercentage}/>
          <DepartureTimes flights={flightData} />
      </div>
    );
  }
  return (<h1>Loading data</h1>)
  
}

export default App;
