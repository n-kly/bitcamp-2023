import Search from "../components/Search";
import Results from "./Results";
import { useState, useEffect } from "react";

const Home = () => {
    const [results, setResults] = useState("");
    const [submit, setSubmit] = useState(true);
    const [renderResults, setRenderResults] = useState(true);

    useEffect(() => {
        if (!submit) {
            setTimeout(() => {
                setRenderResults(true);
            }, 2000);
        }
    }, [submit]);

    return (
        <div>
            {!renderResults ? <Search setResults = {setResults} submit={submit} setSubmit={setSubmit} />
            : <Results results={results}/>}
        </div>
    )
}

export default Home;