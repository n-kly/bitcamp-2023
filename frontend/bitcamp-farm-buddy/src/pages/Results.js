import Crops from "../components/Crops";
import SpeechBubble from "../components/SpeechBubble";
import Buddy from "../components/Buddy";
import Slide from "@mui/material/Slide";
import { useRef } from "react";

const Results = ({ results }) => {
    const containerRef = useRef();

    return (
        <div className="results-container">
            <div className="left results">
                <Crops results={results}/>
            </div>
            <div className="right">
                <div className="top results">
                    <SpeechBubble results={results}/>
                </div>
                <div className="bottom results" ref={containerRef}>
                    <Slide direction="up" in={true} container={containerRef.current} {...{timeout: 2500}}>
                        <div><Buddy /></div>
                    </Slide>
                </div>
            </div>
        </div>
    )
}

export default Results;