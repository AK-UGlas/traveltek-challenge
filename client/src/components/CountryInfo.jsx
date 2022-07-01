import React from "react";

const CountryInfo = (props) => {
    
    const handleChangeCountry = (evt) => {
        props.calcPerc(evt.target.value);
    }

    return (
        <>
        <div className="card">
            <div className="card-top">
                <h3>Display Flight Info By Country</h3>
            </div>
            <div className="card-body">
                <form>
                    <select name="countries" onChange = {handleChangeCountry} defaultValue="select a country">
                        {props.countries
                            .map((country, id) => <option key={id}>{country}</option>)}
                    </select>
                </form>
                <p>
                    {props.percentage > 0 ? `% total flights arriving here: ${props.percentage}`: ``}
                </p>
            </div>
        </div>
        </>
    )

}

export default CountryInfo;