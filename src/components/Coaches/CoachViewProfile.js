import axios from "axios";
import { useState, useEffect } from "react";
import CoachNavbar from "./CoachNavbar";


const CoachHome = () => {
  const win = window.sessionStorage;
  const [coachData, setCoachData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/coaches?id=" + win.getItem("coachID"))
      .then((res) => {
        setCoachData(res.data);
      })
      .catch((error) => {
        console.log("Something went wrong");
      });
  }, []);

  return (
    <div >
      <CoachNavbar />
      <div >
      <ul>
        {coachData.map((data) => (
          <li>
            Coach Id:{data.id}
            <br></br>
             Date of Birth  :{data.dateOfBirth}
             <br></br>
             Mobile No: {data.mobileNumber}
             <br></br>
              Speciality:{data.speciality},
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default CoachHome;
