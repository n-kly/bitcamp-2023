import './styles.css';
import { TypeAnimation } from "react-type-animation";

const SpeechBubble = ({results}) => {
    let introduce = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum "
    const buddy = results.buddy;
    
    return (
        <div className="speech-container">
            <div className="bubble bubble-bottom-left">
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