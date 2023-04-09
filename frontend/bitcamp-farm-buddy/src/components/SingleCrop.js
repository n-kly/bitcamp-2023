
const SingleCrop = ({ crop }) => {
    return (
        <div key={crop.name} className="single-crop">
            <h3>{crop.name}</h3>
            <p>{crop.description}</p>
        </div>
    )
}

export default SingleCrop;