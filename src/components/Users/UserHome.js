import axios from "axios";
import { useState, useEffect } from "react";
import UserNavbar from "./UserNavbar";

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
  
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
  
    return [year, month, day].join('-');
  }

const UserHome = () => {
  const win = window.sessionStorage;
  const [coachsData, setCoachData] = useState([]);
  const [isBooking, setIsBooking] = useState(0);
  const [appointmentDate, setAppointmentDate] = useState();
  const [slot, setSlot] = useState("");
  const [coachId, setCoachId] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorDate,setErrorDate]=useState("");
  const [errorSlot,setErrorSlot]=useState("")

  useEffect(() => {
    axios
      .get("http://localhost:4000/coaches")
      .then((res) => {
        setCoachData(res.data);
      })
      .catch((error) => {
        console.log("Something went wrong");
      });
  }, []);

  const updateSlot = (event) => {
    setSlot(event.target.value);
  };

  const updateDate = (event) => {
    setAppointmentDate(event.target.value);
  };

  const bookAppointment = (event) => {
    event.preventDefault();
    let obj = {
      appointmentDate: appointmentDate,
      slot: slot,
      userId: win.getItem("UserID"),
      coachId: coachId,
    };
    
    
     
 
    axios
      .post("http://localhost:4000/bookings", obj)
      .then((res) => {
        setIsBooking(2);
        setSuccessMsg("Your Appointment is scheduled successfully");
      })
      .catch((err) => {
        console.log("Some wrong");
      });
  };

  function trybook() {
    setIsBooking(1);
    setCoachId(this);
  }

  const goBack = () => {
    setIsBooking(0);
  };

  return (
    <>
      <UserNavbar />
      {isBooking === 0 && (
        <ul>
          {coachsData.map((data) => (
            <li>
              <h2>{data.name}</h2>
              <h2>{data.id}</h2>
              <h4>{data.mobileNumber}</h4>
              <h4>{data.speciality}</h4>
              <button type="submit" onClick={trybook.bind(data.id)}>
                Book a appointment
              </button>
            </li>
          ))}
        </ul>
      )}

      {isBooking === 1 && (
        <>
          <h2>Procces with your appointment</h2>
          <form onSubmit={bookAppointment}>
            <label>Date of appointment</label>
            <input type="Date" value={appointmentDate} onChange={updateDate} required/>
            <label>Preference Slot</label>
            <input
              type="radio"
              name="slot"
              value="9 AM to 10 AM"
              onChange={updateSlot}
            />{" "}
            9 AM to 10 AM"
            <input
              type="radio"
              name="slot"
              value="10 AM to 11 AM"
              onChange={updateSlot}
            />{" "}
            10 AM to 11 AM"
            <input
              type="radio"
              name="slot"
              value="11 AM to 12 PM"
              onChange={updateSlot}
            />{" "}
            11 AM to 12 PM"
            <input
              type="radio"
              name="slot"
              value="2 PM to 3 PM"
              onChange={updateSlot}
            />{" "}
            2 PM to 3 PM"
            <input
              type="radio"
              name="slot"
              value="3 PM to 4 PM"
              onChange={updateSlot}
            />{" "}
            3 PM to 4 PM"
            <input
              type="radio"
              name="slot"
              value="4 PM to 5 PM"
              onChange={updateSlot}
            />{" "}
            4 PM to 5 PM"
            <button type="submit">Confirm appointment</button>
          </form>
        </>
      )}
      {successMsg}
      {isBooking === 2 && (
        <button type="submit" onClick={goBack}>
          Go Back
        </button>
      )}
    </>
  );
};

export default UserHome;
