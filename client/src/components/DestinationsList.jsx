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
            <div className="card">
                <div className="card-top">
                    <h3>
                        Most Popular Destination Airports
                    </h3>
                </div>
                <div className="card-body">
                    <p>Top 10</p>
                    <ol>
                        {destinationItems}
                    </ol>
                </div>
            </div>
        </>
    )
}

export default DestinationsList;