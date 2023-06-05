import React, {useState, useEffect} from "react";
import Moodring from "./Moodring";
import {accessToken} from '../spotify'
import "../global.css";
// import { logout } from "../spotify";

const Home = () =>{ 

    const [token, setToken] = useState(null); 

    useEffect(()=>{
      setToken(accessToken);
    }, []);

    if(token){
        // won't even let us go here unless we have a token, makes us revalidate otherwise
        return <Moodring 
            token={token}
        />
     } 
     else{
        return(
            <div className="center-container">
                <div>
                    <h2>welcome to your <p className="inline" style={{color: "#8D0688"}}> music moodring</p></h2>
                    <a className="link" href="http://localhost:8888/login"> 
                        log in to Spotify
                    </a>
                </div>
                
            </div>
            )
            
    }

};

export default Home;

