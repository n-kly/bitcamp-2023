import './App.css';
import Home from "./pages/Home";
import { useEffect, useState } from 'react';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    console.log(userAgent);
    setIsMobile(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent));
  })
  
  return (
    <div>
    {isMobile ? (<p>{"This content is not accessible on mobile"}</p>) : <Home />}
    </div>
  );
}

export default App;
