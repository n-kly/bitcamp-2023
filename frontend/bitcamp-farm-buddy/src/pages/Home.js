import Search from "../components/Search";
import Results from "./Results";
import Fade from "@mui/material/Fade";
import { useState, useEffect } from "react";

const Home = () => {
    const [results, setResults] = useState("");
    const [submit, setSubmit] = useState(true);
    const [renderResults, setRenderResults] = useState(false);

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
            : <Fade in={true} {...{timeout: 2000}}><div><Results results={results}/></div></Fade>}
        </div>
    )
}

export default Home;