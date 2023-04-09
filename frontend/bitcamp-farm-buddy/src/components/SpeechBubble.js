

const SpeechBubble = ({results}) => {
    const buddy = results.buddy;
    
    
    return (
        <div className="speech-container">
            <div className="speech-bubble">
                <p>{buddy}</p>
            </div>
            
        </div>
    )
}

export default SpeechBubble;