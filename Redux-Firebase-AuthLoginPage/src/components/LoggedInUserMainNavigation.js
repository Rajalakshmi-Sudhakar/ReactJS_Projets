import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/AuthSlice";
import classes from "../styling/MainNavigation.module.scss";
export default function LoggedInUserMainNavigation() {
  const dispatch = useDispatch();
  return (
    <header className={classes.header}>
      <NavLink
        onClick={() => dispatch(logout())} // Clear the state and local storage
        to="/"
        className={({ isActive }) => (isActive ? classes.active : undefined)}
        end
      >
        LogOut
      </NavLink>
    </header>
  );
}
