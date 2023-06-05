import "../global.css";
import { NavLink } from "react-router-dom";
import { LOCALSTORAGE_VALUES } from "../spotify";


const Header = () => {


    // let dest = "";
    // if(LOCALSTORAGE_VALUES.accessToken){
    //     dest = "/moodring";
    // } else {
    //     dest = '/home';
    // }

    return(
        <div className="header">
            <NavLink to='/home' className='home-logo' style={{textDecoration: 'none', color: "black"}}> moodring </NavLink>
            <div className="nav-bar"> 
                <NavLink to='/about' className='page-option'>about</NavLink>
                <NavLink to='/privacy' className='page-option'>privacy</NavLink>
            </div>
        </div>
    );
};

export default Header;