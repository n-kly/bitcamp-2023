import SingleCrop from "./SingleCrop";

const Crops = ({ results }) => {
    const {location, crops} = results

    return (
        <div className="crop-container">
            <div className="crops">
                <h1 className="title"><strong><b>{location}</b></strong></h1>
                <hr style={{borderColor:"#47a24D", borderRadius: "5px", borderTop: "3px solid"}}/>
                {crops ? crops.map(crop => <SingleCrop crop={crop} />) 
                    : 
                    <div class="loading">
                        <img alt="Loading..." className="loading-img" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" />
                    </div>}
            </div>
        </div>
    )
}

export default Crops;