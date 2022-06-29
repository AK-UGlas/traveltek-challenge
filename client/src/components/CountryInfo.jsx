import React from "react";

const CountryInfo = ({countries}) => {
    
    const handleChangeCountry = (evt) => {
        console.log("user chose " + evt.target.value);
    }

    return (
        <>
            <h2>Display flight info by country</h2>
            <form>
                <label htmlFor="countries">Choose a country</label>
                <select name="countries" onChange = {handleChangeCountry}>
                    {countries.map((country, id) => <option key={id}>{country}</option>)}
                </select>
            </form>
        </>
    )

}

export default CountryInfo;