
const Crops = ({ results }) => {
    const res = {
        location: "College Park, Maryland",
        crops: [
            {name: "Tomatoes", description: "tomato tomato tomato tomato tomato tomato tomato tomato tomato "},
            {name: "Onions", description: "onions onions onions onions onions onions onions onions onions "},
            {name: "Watermelons", description: "watermelons watermelons watermelons watermelons watermelons watermelons"}
        ]
    }   
    const {location, crops} = results

    return (
        <div className="crop-container">
            <div className="crops">
                <h1>{location}</h1>
                <hr style={{borderColor:"#47a24D", borderRadius: "5px"}}/>
                {crops && crops.map(crop => (
                    <div key={crop.name} className="single-crop">
                        <h2>{crop.name}</h2>
                        <p>{crop.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Crops;