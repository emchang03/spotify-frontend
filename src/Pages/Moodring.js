import React, {useState, useEffect} from "react";
import "../global.css";



const Moodring = ({token}) => {
    const [tracks, setTracks] = useState([]);
    const [yourMoods, setYourMoods] = useState([]);
    const [clicked, setClicked] = useState(); 
    const moodOptions = ["unhappy", "stressed", "nervous", "calm", "happy", "alert", "angry", "energized", "melancholy",  "content"];
    const colorOptions = [ "#25266f", "#01010d", "#a8a8a8", "#b1c563","#e080ab","#fcea3a","#d3484b", "#af63c5", "#5e173a", "#00a183"]; 


    useEffect(() => {
        const getTracks = async () => {
          try{
        
            var myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + token);

            var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };

            let data = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=50", requestOptions);
            // .then(response => response.text())
            // .then(result => console.log(result))
          

            data = await data.json();
            data = data.items;
            console.log(data);

            let trackId = [];
            let trackName = [];
            for(var i=0; i<data.length; ++i){
                trackId[i] = data[i].track.id;
                trackName[i] = data[i].track.name;
            }
            console.log(trackId);
            console.log(trackName);

            setTracks(trackId);
        

          }catch(error){
            console.log(error.body);
          }
        };
    
        getTracks(); 
      }, [token]);


      // for each song, get a mood 
        // show the 2 most prevalent moods 



      const getMoods = async () => {

        // clicked = true;
        let beforeMoods = [];
        for (var i = 0; i<50; ++i){
            beforeMoods[i] = songToMood(tracks[i]);
        }        
        // turn promises into an array 
        var moods = await Promise.all(beforeMoods);

        // set the state of all the moods from all 50 songs 
        console.log(moods);

        let yourMoods = mostFrequent(moods,3);
        setYourMoods(yourMoods);
        console.log(yourMoods);

      }


      const mostFrequent = (allMoods, num) => {
        const map = {};
        let keys = [];
        console.log("inside mostFrequent: " + allMoods);
        for (let i = 0; i < allMoods.length; i++) {
           if (map[allMoods[i]]) {
              map[allMoods[i]]++;
           } else {
              map[allMoods[i]] = 1;
           }
        }
        for (let w in map) {
           keys.push(w);
        }
        keys = keys.sort((a, b) => {
     
           if (map[a] === map[b]) {
     
              if (a > b) {
                 return 1;
              } else {
                 return -1;
              }
           }
           else {
              return map[b] - map[a];
           }
        })
        .slice(0, num);
        return keys;
     };


      const songToMood = async (id) => {

        // MAKE THE API REQUEST!! 
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        let songData = await fetch(`https://api.spotify.com/v1/audio-features/${id}`, requestOptions);
          
        songData = await songData.json();
        
        let danceability = songData.danceability;
        let energy = songData.energy;
        // let instrumentalness = songData.instrumentalness; 
        // let mode = songData.mode;
        let valence = songData.valence;

        console.log("Song to Mood"); 

        if(valence <= 0.35){
          // melancholy, stressed, nervous 
          if(energy <= 0.40){
            //return moodOptions[8]; // melancholy
            return 8;
          }
          else if (energy >= 0.60) {
            //return moodOptions[2]; // nervous 
            return 2;
          }
          else if(danceability < 0.5){
            //return moodOptions[1]; // stressed
            return 1;
          }
          else{
            return 9; // content
          }
        }
        else if(valence >= 0.65){
          // happy, energized 
          if(energy >= 0.65){
            //return moodOptions[7]; // energized
            return 7;
          }
          else{
            //return moodOptions[4]; // happy 
            return 4;
          }
        }
        // medium valence 
        else{
          if(energy <= 0.45){
            //return moodOptions[3]; // calm 
            return 3;
          }
          else if (energy >= 0.8) {
            //return moodOptions[6]; // angry 
            return 6;
          }
          else if(danceability < 0.5){
            //return moodOptions[5]; // alert
            return 5;
          }
          else{
            return 9; // content
          }
        }

      // end song to mood function!! 
      }

      
    return(
      
        <div>
            {
              clicked ? (
              <div className="center-container">
                <h2 style={{marginBottom:"0"}}>lately, your <p className="inline" style={{color: "#8D0688"}}>moods</p> have been...</h2>

                <div className="ellipse " style={{
                    background: `radial-gradient(${colorOptions[yourMoods[0]]}, ${colorOptions[yourMoods[1]]}, ${colorOptions[yourMoods[2]]})`}}> 
                </div>

                <div className="mood-options">
                  <h3 className="inline color-word" style={{color: colorOptions[yourMoods[0]]}} >
                    {moodOptions[yourMoods[0]] + ", "}
                  </h3>

                  <h3 className="inline color-word" style={{color: colorOptions[yourMoods[1]]}}>
                    {moodOptions[yourMoods[1]] + ", "}
                  </h3>
            
                  <h3 className="inline color-word" style={{color: colorOptions[yourMoods[2]]}}>
                    {moodOptions[yourMoods[2]]}
                  </h3> 
                </div>
                <p style={{fontSize: "small"}}> refresh this page to regnerate your moods after listening to 20+ songs</p>
              </div>
              ) : (
                
                
              <div className="center-container">
                <h2>are you ready to see your <p className="inline" style={{color: "#8D0688"}}>moods</p>?</h2>
                <button className="button-to-link" onClick={()=>{getMoods(); setClicked(true)}}>
                generate my moods
                </button>
              </div>
                
             )
            }

   


        </div>
    );
};

export default Moodring

// TODO:  
// refresh token  
// add header pages + redo routing  --> NavLink
