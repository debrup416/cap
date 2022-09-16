import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";

const Logout=()=>{
    const win=window.sessionStorage;
    win.clear();
    const navigator=useNavigate();
    useEffect(()=>{
        navigator("/home");
    },[])
    return(
        <Navbar/>
    )
}
export default Logout