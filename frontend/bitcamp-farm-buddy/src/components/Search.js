import { useState } from "react";

const Search = () => {

    const [city, setCity] = useState("")
    const [pos, setPos] = useState({})
    const [message, setMessage] = useState("No city entered")

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    }

    const fetchData = async () => {
        const response = await fetch(`http://localhost:4000/?location=${city}`, {
        })
        const data = await response.json();
        console.log(pos)
        console.log(data)
        setMessage(data.message)
        //setMessage(location)
    }

    const findLocation = () => {
        console.log("finding location")
        if (navigator.geolocation) {
            console.log("exists")
            navigator.geolocation.getCurrentPosition( /* PROGRAM DOES NOT WAIT FOR THIS !!!! */
                position => {
                    console.log("set pos");
                    setPos({longitude: position.coords.longitude, latitude: position.coords.latitude});
                    
                }, 
                error => console.log(error)
            )
        }
        //fetchData();
    }

    return (
        <div class="search-container" >
            
            <img style={{width:"120px", height: "100px", padding: "10px"}} alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" />
            <form class="search-bar" action="/search" onSubmit={handleSubmit} >
                <input 
                    type="text" placeholder="Enter City Name" 
                    onChange={(e) => setCity(e.target.value)} 
                    value={city} />
                <button type="submit"><i class="fa fa-search" /></button>
            </form>
            <span>OR</span>
            <button class="secondary-button" onClick={findLocation}>Use Current Location</button>
            <p>{message}</p>
            <p>{pos.latitude}</p>
            <p>{pos.longitude}</p>
        </div>
        
    )
}

export default Search;