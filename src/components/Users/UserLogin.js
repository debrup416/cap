import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Navbar from "../Navbar";

const CoachLogin=()=>{

    const [userId,setUserID]=useState("");
    const [password,setPassword]=useState("");
    const [correct,setCorrect]=useState(0);
    const [msg,setMsg]=useState("")
    const navigator=useNavigate();
    const win=window.sessionStorage;

    const updateUserId=(event)=>{
        setUserID(event.target.value)
    }

    const updatePassword=(event)=>{
        setPassword(event.target.value);
    }
    
    const AlterNativeMethodFindUser=(event)=>{
        event.preventDefault();
        axios.get("http://localhost:4000/users/"+userId)
        .then((res)=>{
            if(password===res.data.password){
                setCorrect(1);
                setMsg("Welcome to wecare");
            }
            else{
                setMsg("Wrong Credential");
            }
        })
        .catch((error)=>{
            setMsg("Something went wrong...Try again later");
            console.log("Errorr")
        })
    }

    const findUser=(event)=>{
        event.preventDefault();
        axios.get("http://localhost:4000/users?id="+userId+'&password='+password)
        .then((res)=>{
            if(res.data.length===1){
                win.setItem("UserID",userId)
                setCorrect(1);
                setMsg("Welcome to wecare");
            }
            else{
                setMsg("Wrong Credential");
            }
        })
        .catch((error)=>{
            setMsg("Something went wrong...Try again later");
            console.log("Errorr")
        })
    }

    return (
         <>
         <Navbar/>
        {
            correct ===0 &&
             <form onSubmit={findUser}>
             {msg}
             <label>User ID</label>
             <input type="number" value={userId} onChange={updateUserId}/>
             <label>Password</label>
             <input type="password" value={password} onChange={updatePassword} />
             <button type="submit" >Login</button>
          </form>
        }

         {
            correct===1 && 
            navigator("/userhome")

         }
         </>

    )
}

export default CoachLogin