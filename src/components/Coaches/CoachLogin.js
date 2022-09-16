import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

const CoachLogin = () => {
  const [coachId, setCoachID] = useState("");
  const [password, setPassword] = useState("");
  const [correct, setCorrect] = useState(0);
  const [msg, setMsg] = useState("");
  const navigator = useNavigate();
  const win = window.sessionStorage;

  const updateCoachId = (event) => {
    setCoachID(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const AlterNativeMethodFindCoach = (event) => {
    event.preventDefault();
    axios
      .get("http://localhost:4000/coaches/" + coachId)
      .then((res) => {
        if (password === res.data.password) {
          setCorrect(1);
          setMsg("Welcome to wecare");
        } else {
          setMsg("Wrong Credential");
        }
      })
      .catch((error) => {
        setMsg("Something went wrong...Try again later");
        console.log("Errorr");
      });
  };

  const findCoach = (event) => {
    event.preventDefault();

    axios
      .get(
        "http://localhost:4000/coaches?id=" + coachId + "&password=" + password
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.length === 1) {
          win.setItem("coachID", coachId);
          setCorrect(1);
          setMsg("Welcome to wecare");
        } else {
          setMsg("Wrong Credential");
        }
      })
      .catch((error) => {
        setMsg("Something went wrong...Try again later");
        console.log("Errorr");
      });
  };

  return (
    <>
      <Navbar />
      {correct === 0 && (
        <form onSubmit={findCoach}>
          {msg}
          <label>Coach ID</label>
          <input type="number" value={coachId} onChange={updateCoachId} />
          <label>Password</label>
          <input type="password" value={password} onChange={updatePassword} />
          <button type="submit">Login</button>
        </form>
      )}

      {correct === 1 && navigator("/coachhome")}
    </>
  );
};

export default CoachLogin;
