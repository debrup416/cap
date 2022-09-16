import axios from "axios";
import { useState, useEffect } from "react";
import CoachNavbar from "./CoachNavbar";

const CoachHome = () => {
  const win = window.sessionStorage;
  const [coachSchedules, setcoachSchedules] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/bookings?coachId=" + win.getItem("coachID"))
      .then((res) => {
        setcoachSchedules(res.data);
      })
      .catch((error) => {
        console.log("Something went wrong");
      });
  }, []);

  return (
    <>
      <CoachNavbar />
      <ul>
        {coachSchedules.map((data) => (
          <li>
            Appointment Date: {data.appointmentDate}
            Slot:{data.slot}
            Booking id:{data.id}
            User id:{data.userId}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CoachHome;
