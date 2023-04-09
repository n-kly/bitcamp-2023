import SingleCrop from "./SingleCrop";

const Crops = ({ results }) => {
    const {location, crops} = results

    return (
        <div className="crop-container">
            <div className="crops">
                <h1 className="title"><strong><b>{location.toUpperCase()}</b></strong></h1>
                <hr style={{borderColor:"#47a24D", borderRadius: "5px", borderTop: "3px solid"}}/>
                {crops ? crops.map(crop => <SingleCrop crop={crop} />) 
                    : 
                    <div class="loading">
                        <img alt="Loading..." className="loading-img" src="/25.gif" />
                    </div>}
            </div>
        </div>
    )
}

export default Crops;