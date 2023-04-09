import Crops from "../components/Crops";
import SpeechBubble from "../components/SpeechBubble";
import Buddy from "../components/Buddy";
import Slide from "@mui/material/Slide";
import Fade from "@mui/material/Fade";

const Results = ({ results, setBuddyDone}) => {

    return (
        <div className="results-container">
            <Fade in={true} {...{timeout: 2000}}>
            <div className="left results">
                <Crops results={results}/>
            </div>
            </Fade>
            <div className="right">
                <Fade in={true} {...{timeout: 2000}}>
                <div className="top results">
                    <SpeechBubble results={results} setBuddyDone={setBuddyDone}/>
                </div>
                </Fade>
                <div className="bottom results">
                    <div></div>
                    <Slide direction="up" in={true}  timeout={500}>
                        <div><Buddy /></div>
                    </Slide>
                </div>
            </div>
        </div>
    )
}

export default Results;