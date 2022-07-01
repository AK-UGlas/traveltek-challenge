import React, { useState } from "react";
import { MILLIS_PER_HOUR } from "../utils/constants";

const JourneyTimes = (props) => {

    const avg = (props.jt.reduce( (a, b) => a + b ) / props.jt.length) / MILLIS_PER_HOUR;
    // hardcoded until I can achieve POST request on external API
    const [origin, setOrigin] = useState("LHR");
    const [destination, setDestination] = useState("DXB");

    const handleChangeOrigin = (evt) => {
        setOrigin(evt.target.value);
    }

    const handleChangeDestination = (evt) => {
        setDestination(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.getJourneyTime(origin, destination);
    }

    return (
        <>
            <div className="card">
                <div className="card-top">
                    <h3>View Average Journey Times</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="origin">Origin:</label>
                        <select name="origin" value="LHR" onChange={handleChangeOrigin} disabled>
                            {props.origins.map((origin, id) => <option key={id}>{origin}</option>)}
                        </select>
                        <label htmlFor="destination">Destination:</label>
                        <select name="destination" value="DXB" onChange={handleChangeDestination} disabled>
                            {props.destinations.sort().map((dest, id) => <option key={id}>{dest.destair}</option>)}
                        </select>
                        <input type="submit" value="Get journey times"/>
                    </form>
                    <p>
                        {avg > 0 ? `Average journey time: ${Math.round(avg * 100) / 100} hours` : ``}
                    </p>
                </div>
            </div>
        </>
    );
};

export default JourneyTimes;