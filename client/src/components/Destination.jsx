import React from "react";

const Destination = (props) => {
    return (
        <li>
            <h1>{props.destination} ({props.country})</h1>
        </li>
    )
}

export default Destination;