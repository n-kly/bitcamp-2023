import { useState } from "react";
import Logo from "./Logo";
import axios from "axios";
import { Typeahead } from 'react-bootstrap-typeahead'; 

const Search = ({ setResults }) => {

    const [locationWords, setLocationWords] = useState([]);

    const fetchData = async (locData) => { 
        locData.unixTime = Date.now();
        // CHANGE URL
        axios.post("http://localhost:4000/search", locData).then(res => {
            setResults(res.data);
        }).catch(err => {
            console.log(err);
        })

        setResults(location)
    }

    const handleSubmitWithLocation = (e) => {
        e.preventDefault();
        fetchData({location: locationWords, isLongLat: false});
    }

    const handleSubmitFindLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    let location = `${pos.coords.longitude}, ${pos.coords.latitude}`;
                    fetchData({location: location, isLongLat: true});
                }, 
                error => console.log(error)
                )
            }
    }

    return (
        <div className="search-container" >
            <Logo />
            <h1>Farm Buddy</h1>

            <Typeahead
            minLength={2}
            highlightOnlyResult={true}
            paginate={true}
            
            id="basic-typeahead-single"
            labelKey="county"
            onChange={setLocationWords}
            options={options}
            placeholder="Please enter your county..."
            selected={locationWords}
            />
    
            <button type="button" onClick={handleSubmitWithLocation}>Submit</button>

            <span>OR</span>
            
            <button className="secondary-button" onClick={handleSubmitFindLocation}>Use Current Location</button>
        </div>
        
    )
}

export default Search;