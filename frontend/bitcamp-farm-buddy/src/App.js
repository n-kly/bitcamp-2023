import { useState } from 'react';
import './App.css';
import Home from "./pages/Home";
import Results from "./pages/Results";


function App() {

  const [location, setLocation] = useState("");


  return (
    <div className="App">
      {location === "" ? <Home setLocation={setLocation}/> : <Results location={location} />}
    </div>
  );
}

export default App;
