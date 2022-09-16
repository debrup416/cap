import { Link } from "react-router-dom";

const CoachNavbar = () => {
  return (
    <nav>
      <Link to="/coachviewprofile">View Profile</Link>
      <Link to="/coachschedules">My Schedules</Link>
      <a href="tel:080 2233447">Call us:080 2233447</a>
      <Link to="/logout">LogOut</Link>
    </nav>
  );
};

export default CoachNavbar;
