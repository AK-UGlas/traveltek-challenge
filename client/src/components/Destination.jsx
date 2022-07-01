import React from "react";
import '../styles/Destination.css'

const Destination = (props) => {
    return (
        <li className="list-item">
            <p>{props.destination} ({props.country})</p>
        </li>
    )
}

export default Destination;