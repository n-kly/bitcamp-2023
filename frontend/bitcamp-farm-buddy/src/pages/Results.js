import Crops from "../components/Crops";
import SpeechBubble from "../components/SpeechBubble";
import Buddy from "../components/Buddy";
import Slide from "@mui/material/Slide";

const Results = ({ results }) => {

    return (
        <div className="results-container">
            <div className="left results">
                <Crops results={results}/>
            </div>
            <div className="right">
                <div className="top results">
                    <SpeechBubble results={results}/>
                </div>
                <div className="bottom results">
                    <Slide direction="up" in={true} {...{timeout: 2000}}>
                        <div><Buddy /></div>
                    </Slide> 
                    {/*<div className="hidden">
                        <Buddy />
    </div>*/}
                </div>
            </div>
        </div>
    )
}

export default Results;