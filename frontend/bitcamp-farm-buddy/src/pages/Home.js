import Search from "../components/Search"

const Home = ({ setLocation }) => {
    return (
        <div>
            <Search setLocation={setLocation}/>
        </div>
    )
}

export default Home;