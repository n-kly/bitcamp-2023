import { useState } from 'react';
import './App.css';
import Home from "./pages/Home";
import Results from "./pages/Results";


function App() {

  const [results, setResults] = useState("");


  return (
    <div className="App">
      {results === "" ? <Home setResults={setResults}/> : <Results results={results} />}
    </div>
  );
}

export default App;
