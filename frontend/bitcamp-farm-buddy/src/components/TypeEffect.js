import { useState, useEffect } from "react";

const TypeEffect = ({ text, speed = 50, delay = 0, onComplete }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (index < text.length) {
        setDisplayText((displayText) => displayText + text[index]);
        setIndex(index + 1);
      } else {
        onComplete();
      }
    }, speed);
    return () => clearTimeout(timeoutId);
  }, [index, speed, text, onComplete]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIndex(0);
      setDisplayText("");
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [delay]);

  return <div>{displayText}</div>;
};

export default TypeEffect;