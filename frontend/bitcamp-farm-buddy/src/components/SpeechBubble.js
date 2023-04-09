import './styles.css';
import { TypeAnimation } from "react-type-animation";

const SpeechBubble = ({results, setBuddyDone}) => {
    

    let introduce = [
        // "howdy! i'm buddy, your ai farming assistant. i see you're interested in growing your own food?",
        // 2000,
        // "i'll take a look at your local environmental factors like soil fertility, precipitation, and much more to find the best crops for your backyard",
        // 3000,
        // "i'm currently searching through all of my data, but don't worry, i'll be back in a sec with some personalized recommendations just for you!",
        3000,
        () => {setBuddyDone(true)}]
    
    let text = results.error;

    return (
        <div className="speech-container">
            <div className="bubble bubble-bottom-left">
                {results ?
                    // <TypeAnimation 
                    // speed={50}
                    // sequence={[text.toLowerCase()]}
                    // repeat={0}
                    // cursor={false}
                    // deletionSpeed={75}/>
                    text.toLowerCase()
                    :
                    <TypeAnimation 
                    speed={50} 
                    sequence={introduce}
                    repeat={0}
                    deletionSpeed={75}
                    cursor={false}/>}               
            </div>
        </div>
    )
}

export default SpeechBubble;