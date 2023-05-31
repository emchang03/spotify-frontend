import "../global.css";
import {logout} from '../spotify';


const Header = () => {
    return(
        <div className="header">
            <span className="home-logo" onClick={logout}> moodring </span>
            <div className="nav-bar"> 
                <span className="page-option"> about </span>
                <span className="page-option"> privacy </span>
            </div>
        </div>
    );
};

export default Header;