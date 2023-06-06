import React from "react";
import "../global.css";


const Error = () => {
    return(

        <div className="center-container">
            <h2>well this is awkward...</h2>
            <div className="privacy">
            <p>it seems that we were unable to access data from your spotify account! this can mean a few things: either your session has expired, you are not a verifed user under the Spotify Developer Dashboard, or you just haven't listened to any music! please log out and try again.</p>
            </div>
           
        </div>
    )
};

export default Error;