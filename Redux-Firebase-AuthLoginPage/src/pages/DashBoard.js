import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import classes from "../styling/DashBoard.module.scss";
import {
  //addDashboardDataToDB,
  getDashboardDataFromDB,
} from "../store/UserDataSlice";

export default function DashBoard() {
  const { user, userId } = useSelector((state) => state.auth);
  //const { deviceDB } = useSelector((state) => state.udata);
  const { dashboardDB, status, error } = useSelector((state) => state.uData);
  const dispatch = useDispatch();

  console.log("Current dashBoardDB in Redux state:", dashboardDB);
  console.log("dashboard Fetch status:", status);
  console.log("dashboard Fetch error (if any):", error);
  //console.log("logged in user's ID:", userId);

  useEffect(
    () => {
      //dispatch(addDashboardDataToDB(deviceDB));
      dispatch(getDashboardDataFromDB());
    },
    [dispatch]
    //deviceDB
  );

  useEffect(() => {
    console.log("Fetched dashboardDB from Redux:", dashboardDB);
  }, [dashboardDB]);

  return (
    <>
      <h1>{`${user.username}'s DashBoard`}</h1>

      <table className={classes.table}>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Device</th>

            <th>Status</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {status === "loading" && (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
          {status === "failed" && (
            <tr>
              <td>Error: {error}</td>
            </tr>
          )}
          {dashboardDB && dashboardDB.length > 0 ? (
            dashboardDB
              .filter((data) => data.uId === userId)
              .map((data, index) => (
                <tr key={`${data.uId}-${index}`}>
                  <td>{data.brand || "N/A"}</td>
                  <td>{data.device || "N/A"}</td>

                  <td>{data.status || "unknown"}</td>
                  <td>{data.quantity || "0"}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td>No data found for this user</td>
            </tr>
          )}
          {/* <tr>
            <td>Apple</td>
            <td>Iphone</td>
            <td>Active</td>
            <td>Active</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Apple</td>
            <td>Ipad</td>
            <td>Active</td>
            <td>Not-active</td>
            <td>2</td>
          </tr> */}
        </tbody>
      </table>
    </>
  );
}
