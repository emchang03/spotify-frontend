import { Outlet } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'



function Root() {

  return (
    <div>
     <Header />
     <Outlet />
     <Footer />       

    </div>
  );
}

export default Root;


//  {!token ? (
//         //takes us to the backend endpoint 
//           <Home />
          
//         ) : (
//           <div>
//           <Moodring 
//             token={token}
//           />

//           <Footer/> 
         
//           </div>
          
//         )}