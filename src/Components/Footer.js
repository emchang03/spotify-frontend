import "../global.css";
import {logout} from '../spotify';


const Footer = () => {
    return(
        <div className="footer">
         <button className="button-to-link footer-button" onClick={logout}>Logout</button>
        </div>
    );
};

export default Footer;