import { Link } from "react-router-dom";
import Navbar from "./Navbar";
const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <h2>We are at heart of appropriate coachviewprofile</h2>

        <div>
          <Link to={`/coachlogin`}>Login as a coach </Link>
          <Link to={`/coachsignup`}>Join as a Coach</Link>
        </div>
        <div>
          <Link to={`/userlogin`}>Login as a User</Link>
          <Link to={`/usersignup`}>Join as a User</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
