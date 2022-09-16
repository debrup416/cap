import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";

const UserAppointment = () => {
  const win = window.sessionStorage;
  const navigator = useNavigate();
  const [appointment, setAppointment] = useState([]);
  const [pageState, setPageState] = useState(0);
  const [newDate, setNewDate] = useState("");
  const [newSlot, setNewSlot] = useState("");
  const [BookId, setNewBookId] = useState();
  const [coachId, setNewCoachId] = useState();
  const [msg, setMsg] = useState("");
  const [reDate,setReDate]=useState("")

  useEffect(() => {
    axios
      .get("http://localhost:4000/bookings?userId=" + win.getItem("UserID"))
      .then((res) => {
        setAppointment(res.data);
      })
      .catch((err) => {
        console.log("Something went wroong");
      });
  }, []);

  function rescheduleAppointment() {
    setPageState(1);
    setNewDate(this.appointmentDate);
    setNewSlot(this.slot);
    setNewCoachId(this.coachId);
    setNewBookId(this.id);
  }

  function cancelAppointmet() {
    if (window.confirm("Are you Sure you need to cancel")) {
      axios
        .delete("http://localhost:4000/bookings/" + this)
        .then((response) => {
          setMsg("Deleted Succesfully");
          setPageState(0);
        })
        .catch((err) => {
          console.log("BookId ", this);
          setPageState(0);
        });
    } else {
      setPageState(0);
    }
  }

  const updateDate = (event) => {
    setNewDate(event.target.value);
  };

  const updateSlot = (event) => {
    setNewSlot(event.target.value);
  };

  const updateAppointment = (event) => {
    event.preventDefault();
    let newObj = {
      id: BookId,
      appointmentDate: newDate,
      slot: newSlot,
      userId: win.getItem("UserID"),
      coachId: coachId,
    };
    console.log(newObj);
    let d=newObj.appointmentDate.split('-');
    let date1 = new Date(+d[0], +d[1] - 1, +d[2]);
    let date2 = new Date();
    let diffTime = (date1 - date2);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if(diffDays<0 || diffDays>7){
        setReDate("Date should be withhin 7 days");
        return ;
    }
    else{
      setReDate("");
    }

    axios
      .put("http://localhost:4000/bookings/" + newObj.id, newObj)
      .then((res) => {
        setMsg("Your Appointmet is rescheduled successfully");
        setPageState(2);
      })
      .catch((err) => {
        console.log("Del");
      });
  };

  const goBack = () => {
    setMsg("");
    setPageState(0);
    navigator("/userhome");
  };

  return (
    <>
      <UserNavbar />
      {reDate}
      {pageState === 0 &&
        appointment.map((data) => (
          <div>
            Appointment Date: {data.appointmentDate}
            Slot: {data.slot}
            Booking id: {data.id}
            User Id: {data.userId}
            Coach Id: {data.coachId}
            <button type="submit" onClick={rescheduleAppointment.bind(data)}>
              Reschedule
            </button>
            <button type="submit" onClick={cancelAppointmet.bind(data.id)}>
              Cancel
            </button>
          </div>
        ))}
      {pageState === 0 && appointment.length == 0 && <h2>Noo apointment</h2>}
      {pageState === 1 && (
        <form onSubmit={updateAppointment}>
          <label>Reschedule your appointment</label>
          <input type="Date" value={newDate} onChange={updateDate} />
          <label>Preferred Slot</label>
          <input
            type="radio"
            name="newSlot"
            value="9 AM to 10 AM"
            onChange={updateSlot}
          />{" "}
          "9 AM to 10 AM"
          <input
            type="radio"
            name="newSlot"
            value="10 AM to 11 AM"
            onChange={updateSlot}
          />{" "}
          "10 AM to 11 AM"
          <input
            type="radio"
            name="newSlot"
            value="11 AM to 12 PM"
            onChange={updateSlot}
          />{" "}
          "11 AM to 12 PM"
          <input
            type="radio"
            name="newSlot"
            value="2 PM to 3 PM"
            onChange={updateSlot}
          />{" "}
          "2 PM to 3 PM"
          <input
            type="radio"
            name="newSlot"
            value="3 PM to 4 PM"
            onChange={updateSlot}
          />{" "}
          "3 PM to 4 PM"
          <input
            type="radio"
            name="newSlot"
            value="4 PM to 5 PM"
            onChange={updateSlot}
          />{" "}
          "4 PM to 5 PM"
          <button type="submit">Reschedule appointment</button>
        </form>
      )}
      {msg}
      {pageState === 2 && (
        <button type="submit" onClick={goBack}>
          Go Back
        </button>
      )}

      {pageState === 3 && (
        <button type="submit" onClick={goBack}>
          Go Back
        </button>
      )}
    </>
  );
};

export default UserAppointment;
