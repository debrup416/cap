import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";


function diffYear(arg){
  let d=arg.split('-');
  let date1 = new Date(+d[0], +d[1] - 1, +d[2]);
  let date2 = new Date();
  let diffTime = (date2 - date1);
  let diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365)); 
  return diff;
}


const CoachSignUp = () => {
  const navigate = useNavigate();
  const [coachData, setCoachData] = useState({
    name: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    mobileNumber: 0,
    speciality: "",
  });

  const [error, setError] = useState({
    name: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    mobileNumber: "",
    speciality: "",
  });

  const [msg, setMsg] = useState("");

  const validateName = (name) => {
    let r = 0;
    if (name.length >= 3 && name.length <= 50) {
      console.log("name V");
      r = 1;
      setError({
        ...error,
        name: "",
      });
    } else {
      console.log("Name I");
      setError({
        ...error,
        name: "It must 3-50 char",
      });
    }
    return r;
  };

  const updateName = (event) => {
    setCoachData({
      ...coachData,
      name: event.target.value,
    });
  };

  const ValidatePass = (pass) => {
    let r = 0;
    if (pass.length >= 5 && pass.length <= 10) {
      console.log("Pass V");
      r = 1;
      setError({
        ...error,
        password: "",
      });
    } else {
      console.log("Pass I");
      setError({
        ...error,
        password: "It must 5-10 character",
      });
    }
    return r;
  };

  const updatePassword = (event) => {
    setCoachData({
      ...coachData,
      password: event.target.value,
    });
  };

  const vallidateDob = (dob) => {
    let r = 0,diff=diffYear(dob);
    if (diff>=20 && diff<=100) {
      r = 1;
      console.log("Dob V");
      setError({
        ...error,
        dateOfBirth: "",
      });
    } else {
      console.log("Dob I");
      setError({
        ...error,
        dateOfBirth: "Age should be 20-100",
      });
    }
    return r;
  };

  const updateDob = (event) => {
    setCoachData({
      ...coachData,
      dateOfBirth: event.target.value,
    });
  };

  const validateGender = (gen) => {
    let r = 0;
    if (gen) {
      console.log("GEn V");
      r = 1;
      setError({
        ...error,
        gender: "",
      });
    } else {
      console.log("Gen I");
      setError({
        ...error,
        gender: "Required",
      });
    }
    return r;
  };

  const updateGender = (event) => {
    setCoachData({
      ...coachData,
      gender: event.target.value,
    });
  };

  const validateMobile = (phone) => {
    let r = 0,
      str = phone.toString();

    if (str.length === 10) {
      console.log("Mobile V");
      r = 1;
      console.log(str);
      setError({
        ...error,
        mobileNumber: "",
      });
    } else {
      console.log("Mobile I");
      setError({
        ...error,
        mobileNumber: "Mobile Number should have 10 digits",
      });
    }
    return r;
  };

  const updateMobileNumber = (event) => {
    setCoachData({
      ...coachData,
      mobileNumber: event.target.value,
    });
  };

  const validateSpeciality = (spe) => {
    let r = 0;
    if (spe.length >= 10 && spe.length <= 50) {
      r = 1;
      console.log("Spe V");
      setError({
        ...error,
        speciality: "",
      });
    } else {
      console.log("Spe I");
      setError({
        ...error,
        speciality: "Speciality should have 10 to 50 characters",
      });
    }
    return r;
  };

  const updateSpeciality = (event) => {
    setCoachData({
      ...coachData,
      speciality: event.target.value,
    });
  };

  const addCoach = (event) => {
    event.preventDefault();
    // if(!validateGender(coachData.gender)){
    //   setError({
    //     ...error,
    //     gender:"required"
    //   })
    // }
    // else{
    //   setError({
    //     ...error,
    //     gender:""
    //   })
    // }
    console.log(coachData);
    let x =
      validateGender(coachData.gender) &&
      validateName(coachData.name) &&
      ValidatePass(coachData.password) &&
      validateMobile(coachData.mobileNumber) &&
      validateSpeciality(coachData.speciality) &&
      vallidateDob(coachData.dateOfBirth);
    console.log(x);
    if (x === 0) return;

    axios
      .post("http://localhost:4000/coaches", coachData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Errorrr");
      });

    setCoachData({
      name: "",
      password: "",
      gender: "",
      dateOfBirth: "",
      mobileNumber: 0,
      speciality: "",
    });
    navigate("/coachlogin");
  };

  return (
    <>
      <Navbar />
      {msg}
      <div>
        <form onSubmit={addCoach}>
          <label>Name</label>
          <input type="text" value={coachData.name} onChange={updateName} />
          {error.name}
          <label>password</label>
          <input
            type="password"
            value={coachData.password}
            onChange={updatePassword}
          />
          {error.password}
          <label>Date of Birth</label>
          <input
            type="Date"
            value={coachData.dateOfBirth}
            onChange={updateDob}
          />
          {error.dateOfBirth}
          <label>Gender</label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={updateGender}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={updateGender}
          />
          Female
          {error.gender}
          <label>Mobile Number</label>
          <input
            type="number"
            value={coachData.mobileNumber}
            onChange={updateMobileNumber}
          />
          {error.mobileNumber}
          <label>speciality</label>
          <input
            type="text"
            value={coachData.speciality}
            onChange={updateSpeciality}
          />
          {error.speciality}
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
};

export default CoachSignUp;
