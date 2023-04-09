import Fade from "@mui/material/Fade";

const SingleCrop = ({ crop }) => {
    return (
        <Fade in={true} timeout={2000}>
        <div key={crop.name} className="single-crop">
            <h3>{crop.name}</h3>
            <p>{crop.description}</p>
        </div>
        </Fade>
    )
}

export default SingleCrop;