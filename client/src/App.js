import React, { useEffect, useState } from 'react';
import { createFrequencyArray } from './utils/utilities';
import AirportInfoService from './services/AirportInfoService';
import FlightDataService from './services/FlightDataService';

import DestinationsList from './components/DestinationsList';
import CountryInfo from './components/CountryInfo';

import './App.css';

function App() {
  
  const [flightCount, setFlightCount] = useState(0);
  const [origins, setOrigins] = useState([]);
  const [destinations, setDestinations] = useState({data:[], set: false});
  const [countries, setCountries] = useState([]);
  const [flightData, setFlightData] = useState([]);

  useEffect(() => {
    startUp();
  }, []);

  useEffect(() => {
    if (destinations.set) {
      getCountries(destinations.data);
    }
  }, [destinations.set]);

  const startUp = () => {
    getOrigins();
    getDestinations();
  } 

  const getOrigins = () => {
    FlightDataService.getFlightsByDeparture()
    .then(dep => setOrigins(dep))
  };
  
  const getDestinations = async () => {
    FlightDataService.getFlightsByDestination()
    .then(dest => {
      setFlightCount(dest.length);
      setDestinations({data: createFrequencyArray(dest, "destair"), set: true});
    });
  };

  // map destination countries using unique airport codes
  const getCountries = (airports) => {
    const destCountries = airports.map(airport => {
      return AirportInfoService.getAirportInfo(airport.destair)
    });
    Promise.all(destCountries)
    .then(responses => Promise.all(responses.map( res => res.country )))
    .then(countries => {
      setCountries(countries)
    })  
  }

  return (
    <div>
      <section>
        <DestinationsList destinations={destinations.data}/>
      </section>
      <section>
        <CountryInfo countries={countries}/>
      </section>
    </div>
  );
}

export default App;
