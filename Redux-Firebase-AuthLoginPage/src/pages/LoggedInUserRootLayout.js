import { Outlet } from "react-router-dom";
import LoggedInUserMainNavigation from "../components/LoggedInUserMainNavigation";

export default function LoggedInUserRootLayout() {
  return (
    <>
      <LoggedInUserMainNavigation />
      <Outlet />
    </>
  );
}
