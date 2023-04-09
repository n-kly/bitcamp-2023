import Search from "../components/Search";
import Results from "./Results";
import Fade from "@mui/material/Fade";
import { useState, useEffect } from "react";

const Home = () => {
    const [results, setResults] = useState("");
    const [copyResults, setCopyResults] = useState("");
    const [buddyDone, setBuddyDone] = useState(false);
    const [submit, setSubmit] = useState(true);
    const [renderResults, setRenderResults] = useState(false);

    useEffect(() => {
        if (!submit) {
            setTimeout(() => {
                setRenderResults(true);
            }, 2000);
        }
    }, [submit]);

    useEffect(() => {
        if(buddyDone){
            console.log("dwagzesgsdiugshdugsbdifashofishgoiahsi")
            setCopyResults(results);
            console.log(results)
        }
    }, [buddyDone, results]);


    
    return (
        <div>
            {!renderResults ? <Search setResults = {setResults} submit={submit} setSubmit={setSubmit} />
            : <div><Results setBuddyDone={setBuddyDone} results={copyResults}/></div>}
        </div>
    )
}

export default Home;