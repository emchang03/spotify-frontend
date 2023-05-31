import { useState, useEffect } from 'react';
import { accessToken} from './spotify'
import Header from './Components/Header'
import Moodring from './Pages/Moodring'
import Home from './Pages/Home'
import Footer from './Components/Footer'


function App() {

  const [token, setToken] = useState(null); 

  useEffect(()=>{
    setToken(accessToken);
  }, []);

  

  return (
    <div className="App">
      {/* <header className="App-header"> */}
     <Header />
      {!token ? (
        //takes us to the backend endpoint 
          <Home />
        ) : (
          <div>
          <Moodring 
            token={token}
          />

          <Footer/> 
         
          </div>
          
        )}
      {/* </header> */}
    </div>
  );
}

export default App;