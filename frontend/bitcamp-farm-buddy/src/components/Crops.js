import SingleCrop from "./SingleCrop";
import Loading from "./Loading";
const Crops = ({ results }) => {
    const res = {
        location: "College Park, Maryland",
        crops: [
            {name: "Tomatoes", description: "tomato tomato tomato tomato tomato tomato tomato tomato tomato "},
            {name: "Onions", description: "onions onions onions onions onions onions onions onions onions "},
            {name: "Watermelons", description: "watermelons watermelons watermelons watermelons watermelons watermelons"}
        ]
    }
    const {location, crops} = res

    return (
        <div className="crop-container">
            <div className="crops">
                <h1 className="title"><strong><b>{location ? location.toUpperCase() : ""}</b></strong></h1>
                <hr style={{borderColor:"#47a24D", borderRadius: "5px", borderTop: "3px solid"}}/>
                {crops ? crops.map(crop => <SingleCrop key={crop.name} crop={crop} />) 
                    : 
                    <Loading />}
            </div>
        </div>
    )
}

export default Crops;