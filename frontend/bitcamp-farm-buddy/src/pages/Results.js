import Crops from "../components/Crops";
import SpeechBubble from "../components/SpeechBubble";
import Mascot from "../components/Mascot";
import { useEffect, useState } from "react";


const Results = ({ location }) => {

    const [results, setResults] = useState("")

    const fetchData = async () => {
        /*const response = await fetch(`http://localhost:4000/?location=${location}`)
        const data = await response.json()
        setResults(data.results)*/
        console.log(location)
        setResults(location)
    }


    useEffect(() => {
        fetchData();
    }, [])

    
    return (
        <div className="results-container">
            <div className="left results">
                <Crops results={results}/>
            </div>
            <div className="right">
                <div className="top results">
                    <SpeechBubble />
                </div>
                <div className="bottom results">
                    <Mascot />
                </div>
            </div>
        </div>
    )
}

export default Results;