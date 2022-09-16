import { Route, Routes,Navigate} from "react-router-dom";
import './App.css';

import Home from "./components/Home"
import CoachSignUp from "./components/Coaches/CoachSignUp"
import CoachLogin from "./components/Coaches/CoachLogin"
import UserSignUp from "./components/Users/UserSignUp"
import UserLogin from "./components/Users/UserLogin"
import CoachHome from "./components/Coaches/CoachHome"
import CoachSchedules from "./components/Coaches/CoachSchedules"
import CoachViewProfile from "./components/Coaches/CoachViewProfile"
import UserHome from "./components/Users/UserHome"
import UserViewProfile from "./components/Users/UserViewProfile"
import UserAppointments from "./components/Users/UserAppointments"
import Logout from "./components/Logout"
import NotFound from "./components/NotFound"

function App() {
  return (
     <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/coachsignup" element={<CoachSignUp />} />
        <Route path="/coachlogin" element={<CoachLogin />} />
        <Route path="/usersignup" element={<UserSignUp />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/coachhome" element={<CoachHome />} />
        <Route path="/coachschedules" element={<CoachSchedules />} />
        <Route path="/coachviewprofile" element={<CoachViewProfile />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/userviewprofile" element={<UserViewProfile />} />
        <Route path="/userappointments" element={<UserAppointments />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
     </>
  );
}

export default App;
