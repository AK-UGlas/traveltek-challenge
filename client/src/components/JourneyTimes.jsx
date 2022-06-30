import React, { useState } from "react";

const JourneyTimes = (props) => {

    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    const handleChangeOrigin = (evt) => {
        console.log("origin changed to " + evt.target.value);
        //setOrigin(evt.target.value);
    }

    const handleChangeDestination = (evt) => {
        console.log("destination changed to " + evt.target.value);
        //setDestination(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log("user selected " + origin + " & " + destination);
        //getAverageJourneyTime(origin, destination);
    }

    return (
        <>
            <section>
                <h2>View average journey times</h2>
                <form onChange={handleSubmit}>
                    <select name="origin" defaultValue="Choose origin airport">
                        {props.origins.map((origin, id) => <option key={id}>{origin}</option>)}
                    </select>
                    <select name="destination" defaultValue="Choose destination">
                        {props.destinations.map((dest, id) => <option key={id}>{dest.destair}</option>)}
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