import { useState } from "react";
import Logo from "./Logo";
import axios from "axios";
import { Form, InputGroup, Button } from 'react-bootstrap';

const Search = ({ setResults }) => {

    const [zipCode, setZipCode] = useState([]);

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
        fetchData({location: zipCode, isLongLat: false});
    }

    const handleSubmitFindLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    let location = `${pos.coords.longitude}, ${pos.coords.latitude}`;
                    fetchData({location: zipCode, isLongLat: true});
                }, 
                error => console.log(error)
                )
            }
    }

    return (
        <div className="search-container" >
            <Logo />
            <h1>Farm Buddy</h1>

            <Form>
                <InputGroup>
                    <Form.Control type="text" placeholder="Enter your zip code..." value={zipCode} onChange={handleZipCodeChange} />
                </InputGroup>
            </Form>
    
            <button type="button" onClick={handleSubmitWithLocation}>Submit</button>

            <span>OR</span>
            
            <button className="secondary-button" onClick={handleSubmitFindLocation}>Use Current Location</button>
        </div>
        
    )
}

export default Search;