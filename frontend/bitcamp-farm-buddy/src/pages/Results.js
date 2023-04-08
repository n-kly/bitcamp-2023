import Crops from "../components/Crops";
import SpeechBubble from "../components/SpeechBubble";
import Mascot from "../components/Mascot";

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
                    <Mascot />
                </div>
            </div>
        </div>
    )
}

export default Results;