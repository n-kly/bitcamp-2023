import Search from "../components/Search"

const Home = ({ setResults }) => {
    return (
        <div>
            <Search setResults={setResults}/>
        </div>
    )
}

export default Home;