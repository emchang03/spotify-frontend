import React from "react";
import "../global.css";


const About = () => {
    return(
        <div className="center-container">
        <h2> About</h2>
        <div className="privacy">

        <h3>The Project</h3>
        <p>
        Moodring is a project utilizing the Spotify Web API. By taking your 20 most recently played tracks, Moodring analyzes the audio data from each track to render the 3 most prevalent moods your recent songs have demonstrated. Keep in mind, this build is still under review by the Spotify Developer Team, meaning only verified email addresses will work for the project. Stay tuned for updates! This project was built using an Express.js server and React.js frontend. 
        </p>


        <h3>The Person Behind the Project</h3>
        <p>
        Hello! My name is Emily, and I am a Computer Science student at Vanderbilt University. I have always had a passion for using technology to harness the intricacies of the human experience. What better way to do that than through music? If you are interested in learning more about me, click <a href="https://www.linkedin.com/in/emily-chang-03/">here</a>. With any questions or comments, you can reach me at emchang43@gmail.com 
        </p>

        <p>
        Thanks for stopping by!
        </p>
        </div>
       
        </div>
        
    );
};


export default About