import './styles.css';import { TypeAnimation } from "react-type-animation";

const SpeechBubble = ({results}) => {
    let introduce = "hey! my name is buddy and i love to farm!!!!!!!! "
    const buddy = results.buddy;
    
    
    return (
        <div className="speech-container">
            <div className="speech-bubble">
                <TypeAnimation 
                    speed={50} 
                    sequence={[introduce]}
                    repeat={0}
                    cursor={false}/>
                <br /> <br /> <br /> 
                {buddy && 
                <TypeAnimation 
                    speed={80}
                    sequence={[buddy.toLowerCase()]}
                    repeat={0}
                    cursor={false}/>}
            </div>
            
        </div>
    )
}

export default SpeechBubble;