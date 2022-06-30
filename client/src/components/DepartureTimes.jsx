import React, { useState } from "react";

const DepartureTimes = (props) => {

    const [time, setTime] = useState("12:00:00");
    const dataReady = (props.flights.length === 0);  
    
    const handleChangeTime = (evt) => {
        console.log(`the time selected is ${evt.target.value}`);
        setTime(evt.target.value);
    }

    const handleTimeSubmit = (evt) => {
        console.log("you submitted a time query");
        evt.preventDefault();
    }

    return (
        <>
            <section>
                <h3>
                    Choose a time to see all available flights
                </h3>
                <form onSubmit={handleTimeSubmit}>
                    <label htmlFor="deptTime">Departs Before:</label>
                    <input type="time" name="deptTime" onChange={handleChangeTime}/>
                    <input type="submit" value="Submit"/>
                </form>
                <div>
                    <p>
                        {dataReady ? `${props.flights.length} flights left before ${time}` : "Choose a time"}
                    </p>
                </div>
            </section> 
        </>
    )
}

export default DepartureTimes;