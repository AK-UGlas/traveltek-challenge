import React from "react";
import { sortByKey } from "../utils/utilities";
import Destination from './Destination';

const DestinationsList = ({destinations}) => {

    const destinationItems = sortByKey(destinations, "count", true)
                                .slice(0, 10)
                                .map((destination, index) => {
                                    return <Destination key={index} destination={destination.destair} country={destination.country}/>
                                });                                       

    return (
        <>
            <section>
                <h2>
                    Most Popular Destination Airports
                </h2>
                <ol >
                    {destinationItems}
                </ol>
            </section>
        </>
    )
}

export default DestinationsList;