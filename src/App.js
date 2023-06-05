import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import Root from './Components/Root'
import Privacy from './Pages/Privacy'
import About from './Pages/About'
import Home from './Pages/Home'
import Moodring from './Pages/Moodring';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path= '/' element={<Root/>}>
    <Route index element={<Navigate to='/home' />} />
    <Route path= '/home' element={<Home />}/>
    <Route path= '/moodring' element={ <Moodring/>}/>
    <Route path= '/privacy' element={<Privacy />}/>
    <Route path= '/about' element={ <About />}/>
  </Route>
));


function App() {

  return (

    <RouterProvider router={router} /> );
}

export default App;