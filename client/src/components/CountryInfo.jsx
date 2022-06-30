import React from "react";

const CountryInfo = (props) => {
    
    const handleChangeCountry = (evt) => {
        props.calcPerc(evt.target.value);
    }

    return (
        <>
        <section>
            <h2>Display flight info by country</h2>
            <form>
                <select name="countries" onChange = {handleChangeCountry} defaultValue="select a country">
                    {props.countries
                        .map((country, id) => <option key={id}>{country}</option>)}
                </select>
            </form>
            <p>
                {props.percentage > 0 ? `% total flights arriving here: ${props.percentage}`: ``}
            </p>
        </section>
        </>
    )

}

export default CountryInfo;