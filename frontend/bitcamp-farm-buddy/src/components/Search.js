import { useState } from "react";
import Logo from "./Logo";
import axios from "axios";
import { Form, InputGroup, Button } from 'react-bootstrap';
import Grow from "@mui/material/Grow";

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
        fetchData({ location: zipCode, isLongLat: false });
    }

    const handleSubmitFindLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    let location = `${pos.coords.latitude},${pos.coords.longitude}`;
                    fetchData({ location: location, isLongLat: true });
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
            <div className="row1">
                <div></div>
                <Grow in={true} {...{timeout: 1500}}><div><Logo /></div></Grow>
            </div>
            <div className="row2">
                <h1>farm buddy</h1>

                <Form>
                    <InputGroup>
                        <Form.Control type="text" placeholder="enter your zip code..." value={zipCode} onChange={handleZipCodeChange} />
                        <Button className="search-button" variant="success" onClick={handleSubmitWithLocation}><i className="fa fa-search" /></Button>
                    </InputGroup>
                    
                </Form>

                <h3 className="or">~or~</h3>

                <Button className="secondary-button" onClick={handleSubmitFindLocation}>use current location</Button>
            </div>
            <div className="row3">

            </div>

        </div>

    )
}

export default Search;