import "./Navbar.css";

import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

const Navbar = () => {
  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form>
        <BsSearch />
        <input type="text" />
      </form>

      <ul id="nav-links">
        <NavLink to="/">
          <BsHouseDoorFill />
        </NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
