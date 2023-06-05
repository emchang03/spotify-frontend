import React from "react";
import "../global.css";


const Privacy = () => {
    return(
        <div className="center-container">
        <h2> Privacy Policy</h2>
        <div className="privacy">
        <p>
        Moodring uses the Spotify Web API to get data from your Spotify profile. By using Moodring, you agree to the use of your account username and information about your recently played tracks as stated by this policy.
        </p>

        <p>
        None of the account data used by Moodring is stored or collected, and it is not shared with any third parties. The information is only used on your personal device to generate your Moodring.
        </p>

        <p>
        If at any point you wish to remove Moodring's permissions to generate your graphic on Spotify, you can do so <a href="https://support.spotify.com/us/article/spotify-on-other-apps/" >here</a>.
        </p>
        </div>
       
        </div>
        
    );
};


export default Privacy