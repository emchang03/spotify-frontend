import "../global.css";

const Home = () =>{ 
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
    

};

export default Home;