import { useState } from "react";
import Logo from "./Logo";
import axios from "axios";
import { Form, InputGroup, Button } from 'react-bootstrap';

const Search = ({ setResults }) => {

    const [zipCode, setZipCode] = useState([]);

    const fetchData = async (locData) => { 

        locData.date = new Date().toISOString().split("T")[0];
        // CHANGE URL
        console.log(locData)
        axios.post("http://localhost:4000/", locData).then(res => {
            setResults(res.data);
        }).catch(err => {
            console.log(err);
        })
        /*console.log(zipCode);
        setResults(zipCode)*/
    }

    const handleSubmitWithLocation = (e) => {
        e.preventDefault();
        fetchData({location: zipCode, isLongLat: false});
    }

    const handleSubmitFindLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    let location = `${pos.coords.latitude},${pos.coords.longitude}`;
                    fetchData({location: location, isLongLat: true});
                }, 
                error => console.log(error)
                )
            }
    }

    const handleZipCodeChange = (e) => {
        setZipCode(e.target.value)
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