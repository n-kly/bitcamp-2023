import { useState, useEffect } from "react";


const Loading = () => {
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowLoading(true);
        }, 20000)
    })

    return (
        <div class="loading">
            {showLoading && 
                <img alt="Loading..." className="loading-img" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" />
            }
        </div>
    )
}

export default Loading;