import SingleCrop from "./SingleCrop";
import Loading from "./Loading";
const Crops = ({ results }) => {
    const {location, crops} = results

    return (
        <div className="crop-container">
            <div className="crops">
                <h1 className="title"><strong><b>{location}</b></strong></h1>
                <hr style={{borderColor:"#47a24D", borderRadius: "5px", borderTop: "3px solid"}}/>
                {crops ? crops.map(crop => <SingleCrop crop={crop} />) 
                    : 
                    <Loading />}
            </div>
        </div>
    )
}

export default Crops;