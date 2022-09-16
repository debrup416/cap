import classes from "./NotFound.module.css"
import Navbar from "./Navbar";
const NotFound = () => {
  return (
    <>
    <Navbar/>
      <div>Page Not Found</div>
      <p className={classes.c1}>Testing</p>
    </>
  )
  
};
export default NotFound;
