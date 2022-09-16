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
    <>
      <CoachNavbar />
      {win.getItem("coachID")}
      <ul>
      {coachData.map((data) => (
            <li>
                Coach Id:{data.id},
                Date of Birth:{data.dateOfBirth},
                Mobile No:{data.mobileNumber},
                Speciality:{data.speciality},

            </li>
        ))}
      </ul>
    </>
  );
};

export default CoachHome;
