import { useState } from "react";
import Logo from "./Logo";
import axios from "axios";
import { Form, InputGroup, Button } from 'react-bootstrap';
import Grow from "@mui/material/Grow";
import Zoom from "@mui/material/Zoom";
import { CSSTransition } from 'react-transition-group';

const Search = ({ submit, setSubmit, setResults }) => {

    const [zipCode, setZipCode] = useState([]);
    const [startGrow, setStartGrow] = useState(false);

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
        setSubmit(false);
        fetchData({ location: zipCode, isLongLat: false });
    }

    const handleSubmitFindLocation = () => {
        setSubmit(false);
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

    const handleZoomEntered = () => {
        setTimeout(() => {
            setStartGrow(true);
        }, 0);
    }

    return (
        <CSSTransition in={submit} classNames="slide-down" timeout={6000} unmountOnExit>
        <div className="search-container" >
            

            <div className="row1">
                <div></div>
                <Grow in={startGrow} timeout={1000}><div><Logo /></div></Grow>
            </div>
            <Zoom in={true} timeout={1500} onEntered={handleZoomEntered}>
            <div className= "row2">
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
            </Zoom>
            <div className="row3">

            </div>

        </div>
        </CSSTransition>

    )
}

export default Search;