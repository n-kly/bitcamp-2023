import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
const SingleCrop = ({ crop }) => {
    return (
        <Fade in={true} timeout={2000}>
        <div className="single-crop">
            <h3>{crop.name}</h3>
            <p>{crop.description}</p>
        </div>
        </Fade>
    )
}

export default SingleCrop;