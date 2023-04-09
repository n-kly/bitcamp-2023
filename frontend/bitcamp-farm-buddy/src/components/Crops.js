import SingleCrop from "./SingleCrop";
import Loading from "./Loading";
import Fade from "@mui/material/Fade";
const Crops = ({ results }) => {
    const {location, crops} = results

    return (
        <div className="crop-container">
            <div className="crops">
                <div className="title">
                    {location &&
                    <Fade in={true} timeout={2000}>
                    <h1 className="title"><strong><b>{location.toUpperCase()}</b></strong></h1>
                    </Fade>}
                </div>
                
                <hr style={{borderTop: "3px solid black", color: "black"}}/>
                {crops ? crops.map(crop => <SingleCrop key={crop.name} crop={crop} />) 
                    : 
                    <Loading />}
            </div>
        </div>
    )
}

export default Crops;