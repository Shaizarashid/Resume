import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  const handleClick = async () =>{
    //e.preventDefault();

    try {

    } catch (err) {
      console.log("Error response:", err.response.data); // Log error response
    }
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">lamabooking</span>
        </Link>
        {user ? (
          <div className="navItems">
          {user.username}
          <button onClick={() => handleClick("r")} className="navButton">Logout</button>
          </div>
        )
         : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;