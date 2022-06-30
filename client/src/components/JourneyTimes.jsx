import React, { useState } from "react";

const JourneyTimes = (props) => {

    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

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
            <section>
                <h2>View average journey times</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="origin">Origin:</label>
                    <select name="origin" defaultValue="Choose origin airport" onChange={handleChangeOrigin}>
                        {props.origins.map((origin, id) => <option key={id}>{origin}</option>)}
                    </select>
                    <label htmlFor="destination">Destination:</label>
                    <select name="destination" defaultValue="Choose destination" onChange={handleChangeDestination}>
                        {props.destinations.sort().map((dest, id) => <option key={id}>{dest.destair}</option>)}
                    </select>
                    <input type="submit" value="Get journey times"/>
                </form>
                <p>
                    
                </p>
            </section>
        </>
    );
};

export default JourneyTimes;