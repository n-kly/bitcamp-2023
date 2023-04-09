import { useState, useEffect } from "react";
import Fade from '@mui/material/Fade';

const Loading = () => {
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowLoading(true);
        }, 23000)
    })

    return (
        <div class="loading">
            {showLoading && 
                <Fade in={true} timeout={2000}><img alt="Loading..." className="loading-img" src="/25.gif" /></Fade>
            }
        </div>
    )
}

export default Loading;