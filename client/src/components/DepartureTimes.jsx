import React, { useState } from "react";

const DepartureTimes = (props) => {

    const [time, setTime] = useState("12:00:00");
    const dataReady = (props.numFlightsBefore > 0);  
    
    const handleChangeTime = (evt) => {
        console.log(`the time selected is ${evt.target.value}`);
        setTime(evt.target.value + ":00");
    }

    const handleTimeSubmit = (evt) => {
        evt.preventDefault();
        props.flightsBefore(time);
    }

    return (
        <>
            <div className="card">
                <div className="card-top">
                    <h3>
                        Enter a Time to View Previous Departures
                    </h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleTimeSubmit}>
                        <label htmlFor="deptTime">Departs Before:</label>
                        <input type="time" name="deptTime" onChange={handleChangeTime}/>
                        <input type="submit" value="Get flight count"/>
                    </form>
                    <div>
                        <p>
                            {dataReady ? `${props.numFlightsBefore} flights left before ${time}` : "Choose a time"}
                        </p>
                    </div>
                </div>
            </div> 
        </>
    );
};

export default DepartureTimes;