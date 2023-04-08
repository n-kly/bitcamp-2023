

const SpeechBubble = ({result}) => {
    const res = {buddy: "Hey there! My name is Vignesh Rangarajan and I absolutely LOVE farming!"}
    const buddy = res.buddy;
    
    
    return (
        <div className="speech-container">
            <div className="speech-bubble">
                <p>{buddy}</p>
            </div>
            
        </div>
    )
}

export default SpeechBubble;