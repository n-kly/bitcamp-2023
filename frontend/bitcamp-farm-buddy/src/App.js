import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Results from "./pages/Results";


function App() {

  const [results, setResults] = useState("");


  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element= {results === "" ? <Home setResults={setResults}/> : <Navigate to="/results" />}
        />
        <Route 
          path="/results"
          element= {<Results results={results}/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
