import "./Navbar.css";

import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

// Hooks
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, register, reset } from "../../slices/authSlice";
import { store } from "../../store";

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state: any) => state.auth);

  const navigate = useNavigate()

  const dispath = useDispatch()

  const handleLogout = () => {
    store.dispatch(logout())
    dispath(reset())
    navigate("/login")
  }

  return (
    <nav id="nav">
      <Link to="/">ReactGram</Link>
      <form id="search-form">
        <BsSearch />
        <input type="text" placeholder="Search" />
      </form>

      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill/>
                </NavLink>
              </li>
              
            )}
            <li>
              <NavLink to="/profile">
                <BsFillPersonFill/>
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Log out</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
