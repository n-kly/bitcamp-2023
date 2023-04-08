import { useState } from "react";
import Logo from "./Logo";
/* loading bar ? */

const Search = ({ setResults }) => {

    const [location, setLocation] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    }

    const fetchData = async () => {
        /*const response = await fetch(`http://localhost:4000/?location=${location}`)
        const data = await response.json()
        setResults(data.results)*/
        console.log(location)
        console.log("setting results")
        setResults(location)
    }

    const findLocation = () => {
        console.log("finding location")

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( /* PROGRAM DOES NOT WAIT FOR THIS !!!! */
                position => {
                    console.log("set pos");
                    const location = `${position.coords.longitude}, ${position.coords.latitude}`;
                    setLocation(location);
                    fetchData();
                }, 
                error => console.log(error)
            )
        }
        //fetchData();
    }

    return (
        <div className="search-container" >
            <Logo />
            <h1>Farm Buddy</h1>
            <form className="search-bar" action="/search" onSubmit={handleSubmit} >
                <input 
                    type="text" placeholder="Enter City Name" 
                    onChange={(e) => setLocation(e.target.value)} 
                    value={location} /> 
                <button type="submit"><i className="fa fa-search" /></button>
            </form>
            <span>OR</span>
            <button className="secondary-button" onClick={findLocation}>Use Current Location</button>
        </div>
        
    )
}

export default Search;