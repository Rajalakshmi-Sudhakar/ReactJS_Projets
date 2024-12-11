import classes from "../styling/SideNavigation.module.scss";
import { NavLink } from "react-router-dom";
//import { useSelector, useDispatch } from "react-redux";
//import { addDashboardDataToDB } from "../store/UserDataSlice";

export default function LoggedInUserSideNavigation() {
  // const dispatch = useDispatch();
  // const { userId } = useSelector((state) => state.auth);
  // const {
  //   deviceDB = [],
  //   brandDB = [],
  //   //dashboardDB = [],
  // } = useSelector((state) => state.uData || {});

  // const handleDashboardClick = () => {
  //   if (!deviceDB.length && !brandDB.length) {
  //     console.log("No data available");
  //     return;
  //   }

  //   let dashboardData = [];
  //   let filteredBrandDB = [];
  //   let filteredDeviceDB = [];

  //   // const existingDashboardData = dashboardDB.map((item) =>
  //   //   JSON.stringify(item)
  //   // );

  //   if (brandDB && brandDB.length > 0) {
  //     filteredBrandDB = brandDB.filter((brand) => brand.uId === userId);
  //   }
  //   if (deviceDB && deviceDB.length > 0) {
  //     filteredDeviceDB = deviceDB.filter((device) => device.uId === userId);
  //   }

  //   dashboardData = filteredDeviceDB.map((device) => {
  //     const matchingBrand = filteredBrandDB.find(
  //       (brand) => brand.brandName.toLowerCase() === device.brand.toLowerCase()
  //     );
  //     const dashBoardDataEntry = {
  //       brand: device.brand,
  //       device: device.device,
  //       brandStatus: matchingBrand?.status || "Unknown",
  //       deviceStatus: device.status,
  //       quantity: device.quantity,
  //       uId: device.uId,
  //     };
  //     return dashBoardDataEntry;
  //   });

  //   // const uniqueDashboardData = dashboardData.filter(
  //   //   (entry) => !existingDashboardData.includes(JSON.stringify(entry))
  //   // );

  //   // // Ensure no duplicate data is sent to Firebase
  //   // const existingData = dashboardDB.filter((item) => item.uId === userId);
  //   // const newData = dashboardData.filter(
  //   //   (data) =>
  //   //     !existingData.some(
  //   //       (existing) =>
  //   //         existing.device === data.device &&
  //   //         existing.brand === data.brand &&
  //   //         existing.uId === data.uId
  //   //     )
  //   // );

  //   // if (newData.length === 0) {
  //   //   console.log("No new data to add to the dashboard.");
  //   //   return;
  //   // }

  //   console.log("Adding new data to the dashboard:", dashboardData);
  //   dispatch(addDashboardDataToDB(dashboardData));

  //   // console.log("dashboardData:", dashboardData);
  //   // dispatch(addDashboardDataToDB(dashboardData));
  // };

  return (
    <aside className={classes.sidebar}>
      <div>
        <NavLink
          //onClick={handleDashboardClick}
          to="dashboard"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          + Dashboard
        </NavLink>
      </div>
      <div>
        <NavLink
          to="gadget"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          + Add/Edit your Gadget
        </NavLink>
      </div>
    </aside>
  );
}
