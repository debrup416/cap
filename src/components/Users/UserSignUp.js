import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

 

const UserSignUp = () => {
  const navigate=useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    mobileNumber: 0,
    email:"",
    dateOfBirth: "",
    gender: "",
    pincode:0,
    city:"",
    state:"",
    country: "",
  });

  const [error,setError] = useState({
    name: "",
    password: "",
    mobileNumber: "",
    email:"",
    dateOfBirth: "",
    gender: "",
    pincode:0,
    city:"",
    state:"",
    country: "",
  });

   
  const validateName=(name)=>{
    let r=0;
    if(name.length>=3 && name.length<=50){
      console.log("name V");
      r=1;
      setError({
        ...error,
        name:""
      })
    }
    else{
      console.log("Name I")
      setError({
        ...error,
        name:"It must 3-50 char"
      })
    }
    return r;
  }
  
  const updateName =(event) => {
  
     setUserData({
      ...userData,
      name: event.target.value,
    });
    
  };
  

  const ValidatePass=(pass)=>{
    let r=0;
    if(pass.length>=5 && pass.length<=10){
      console.log("Pass V");
      r=1;
      setError({
        ...error,
        password:""
      })
    }
    else{
      console.log("Pass I")
      setError({
        ...error,
        password:"It must 5-10 character"
      })
    }
    return r;
  }

  const updatePassword = (event) => {
    setUserData({
      ...userData,
      password: event.target.value,
    });
    
  };

  const validateMobile=(phone)=>{
    let r=0,str=phone.toString();
    
    if(str.length===10){
      console.log("Mobile V")
      r=1;
      console.log(str);
      setError({
        ...error,
        mobileNumber:""
      })
    }
    else{
      console.log("Mobile I")
      setError({
        ...error,
        mobileNumber:"Mobile Number should have 10 digits"
      })
    }
    return r;
  }

  const updateMobileNumber = (event) => {
    setUserData({
      ...userData,
      mobileNumber: event.target.value,
    });
    
  };

  const ValidateEmail=(email)=>{
    let r=0;
    if(email){
      r=1;
      setError({
        ...error,
        email:""
      })
    }
    else{
      setError({
        ...error,
        email:"Required"
      })
    }
    return r;
  }  

  const updateEmail = (event) => {
    setUserData({
      ...userData,
      email: event.target.value,
    });
  };

  const vallidateDob=(dob)=>{
    let r=0;
    if(dob){
      r=1;
      console.log("Dob V")
      setError({
        ...error,
        dateOfBirth:""
      })
    }
    else{
      console.log("Dob I")
      setError({
        ...error,
        dateOfBirth:"Required"
      })
    }
    return r;
  }

  const updateDob = (event) => {
    setUserData({
      ...userData,
      dateOfBirth: event.target.value,
    });
    
  };

  const validateGender=(gen)=>{
    let r=0;
    if(gen){
      r=1;
      setError({
        ...error,
        gender:""
      })
    }
    else{
      setError({
        ...error,
        gender:"Required"
      })
    }
    return r;
  }  

  const updateGender = (event) => {
    setUserData({
      ...userData,
      gender: event.target.value,
    });
   
  };

  const validatePin=(pin)=>{
    let r=0;
    if(pin.toString().length==6){
      r=1;
      setError({
        ...error,
        pincode:""
      })
    }
    else{
      setError({
        ...error,
        pincode:"Pincode should have 6 digits"
      })
    }
    return r;
  }  

  const updatepincode = (event) => {
    setUserData({
      ...userData,
      pincode: event.target.value,
    });
  };

  const validateCity=(city)=>{
    let r=0;
    if(city.length>=6 && city.length<=20){
      r=1;
      setError({
        ...error,
        city:""
      })
    }
    else{
      setError({
        ...error,
        city:"City should have 6 to 20 characters"
      })
    }
    return r;
  }  


  const updateCity = (event) => {
    setUserData({
      ...userData,
      city: event.target.value,
    });
   
  };

  const validateState=(state)=>{
    let r=0;
    if(state.length>=6 && state.length<=20){
      r=1;
      setError({
        ...error,
        state:""
      })
    }
    else{
      setError({
        ...error,
        state:"state should have 6 to 20 characters"
      })
    }
    return r;
  }  


  const updateState = (event) => {
    setUserData({
      ...userData,
      state: event.target.value,
    });
  };

  const validateCn=(country)=>{
    let r=0;
    if(country.length>=6 && country.length<=20){
      console.log("County V");
      r=1;
      setError({
        ...error,
        country:""
      })
    }
    else{
      console.log("coun I");
      setError({
        ...error,
        country:"country should have 6 to 20 characters"
      })
    }
    return r;
  }  


  const updateCountry = (event) => {
    setUserData({
      ...userData,
      country: event.target.value,
    });
  };
  

  const addUser = (event) => {
    event.preventDefault();
     
    
    let x=(
      validateName(userData.name) && ValidatePass(userData.password) && 
    validateGender(userData.gender) && vallidateDob(userData.dateOfBirth) && 
    validateMobile(userData.mobileNumber) && validatePin(userData.pincode) &&
    validateCity(userData.city) && validateState(userData.state) && 
    validateCn(userData.country) && ValidateEmail(userData.email)
    )
    if(x!=1){
      return;
    }

    axios
      .post("http://localhost:4000/users", userData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log("Errorrr");
      });

      setUserData({
        name: "",
        password: "",
        mobileNumber: 0,
        email:"",
        dateOfBirth: "",
        gender: "",
        pincode:0,
        city:"",
        state:"",
        country: "",
      })
      navigate("/userlogin");
  };

  return (
    <>
    <Navbar/>
      <form onSubmit={addUser}>
        <label>Name</label>
        <input type="text" value={userData.name} onChange={updateName} />
        {error.name}

        <label>password</label>
        <input type="password" value={userData.password} onChange={updatePassword} />
        {error.password}

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

        <label>Date of Birth</label>
        <input type="Date" value={userData.dateOfBirth} onChange={updateDob} />
        {error.dateOfBirth}

        <label>email</label>
        <input type="email" value={userData.email} onChange={updateEmail}/>
        {error.email}

        <label>Mobile Number</label>
        <input type="number" value={userData.mobileNumber} onChange={updateMobileNumber} />
        {error.mobileNumber}

        <label>Pin Code</label>
        <input type="number" value={userData.pincode} onChange={updatepincode} />
        {error.pincode}

        <label>City</label>
        <input type="text" value={userData.city} onChange={updateCity} />
        {error.city}

        <label>State</label>
        <input type="text" value={userData.state} onChange={updateState} />
        {error.state}

        <label>country</label>
        <input type="text" value={userData.country} onChange={updateCountry} />
        {error.country}

        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default UserSignUp;
