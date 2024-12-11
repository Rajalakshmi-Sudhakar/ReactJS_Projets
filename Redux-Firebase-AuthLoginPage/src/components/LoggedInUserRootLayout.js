import { Outlet } from "react-router-dom";
import LoggedInUserMainNavigation from "./LoggedInUserMainNavigation";
import LoggedInUserSideNavigation from "./LoggedInUserSideNavigation";
import classes from "../styling/SideNavigation.module.scss";

export default function LoggedInUserRootLayout() {
  return (
    <>
      <LoggedInUserMainNavigation />
      <div className={classes.container}>
        <LoggedInUserSideNavigation />
        <main className={classes.content}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
