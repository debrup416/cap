import axios from "axios";
import { useState, useEffect } from "react";
import UserNavbar from "./UserNavbar";

const UserViewProfile = () => {
  const win = window.sessionStorage;
  const [userID, setUserID] = useState();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/users?id=" + win.getItem("UserID"))
      .then((res) => {
        setUserData(res.data);
        console.log(userData);
      })
      .catch((error) => {
        console.log("Something went wrong");
      });
  }, []);

  return (
    <>
      <UserNavbar />
      <ul>
        {userID}
        {userData.map((data) => (
          <div>
            <h3>{data.name}</h3>
            <h4>Date of Birth: {data.dateOfBirth}</h4>
            <h4>Mobile No:{data.mobileNumber}</h4>
            <h4>
              Address:{data.city},{data.state}
            </h4>
            <h4>{data.country}</h4>
            <h4>{data.pincode}</h4>
          </div>
        ))}
      </ul>
    </>
  );
};

export default UserViewProfile;
