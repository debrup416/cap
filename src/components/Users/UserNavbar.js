import { Link } from "react-router-dom"
import classes from "../Navbar.module.css"

const CoachNavbar=()=>{
    return(
        <nav >
             <Link to="/userhome">My Home Page </Link>
            <Link to="/userviewprofile">View Profile</Link>
            <Link to="/userappointments">My appointment</Link>
            <a href="tel:080 2233447">Call us:080 2233447</a>
            <Link to="/logout">LogOut</Link>
        </nav>
    )   
}

export default CoachNavbar