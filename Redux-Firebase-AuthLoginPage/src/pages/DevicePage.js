import classes from "../styling/DashBoard.module.scss";
import DeviceModal from "../components/DeviceModal.js";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  addDashboardDataToDB,
  addDeviceToDB,
  getDeviceDataFromDB,
  updateDeviceInDB,
  updateDashboardInDB,
  deleteDeviceInDB,
  deleteDashboardInDB,
  getDashboardDataFromDB,
} from "../store/UserDataSlice.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DevicePage() {
  const [isOpen, setIsOpen] = useState(false);
  const { userId } = useSelector((state) => state.auth);
  const { deviceDB, status, error, dashboardDB } = useSelector(
    (state) => state.uData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeviceDataFromDB());
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetched deviceDB from Redux:", deviceDB);
  }, [deviceDB]);

  const handleAddDevice = () => {
    console.log("Button Clicked");
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOpen(false);

    const fd = new FormData(e.target);

    const deviceObject = { uId: userId };
    fd.forEach((value, key) => {
      deviceObject[key] = value;
    });
    console.log("Device Object", deviceObject);

    const existingDevice = deviceDB.find(
      (device) =>
        device.uId === deviceObject.uId &&
        device.brand === deviceObject.brand &&
        device.device === deviceObject.device
    );
    console.log("existingDevice:", existingDevice);
    if (existingDevice) {
      const existingDeviceId = existingDevice.deviceId;
      console.log("existingDeviceId:", existingDeviceId);

      const exisitingDashboardData = dashboardDB.find(
        (dashboardData) => dashboardData.deviceId === existingDeviceId
      );

      const updatedQuantity =
        Number(existingDevice.quantity) + Number(deviceObject.quantity);
      const updatedDevice = {
        ...existingDevice,
        quantity: String(updatedQuantity), // Increment the quantity
      };

      // Dispatch an action to update the existing entry in the DB
      dispatch(
        updateDeviceInDB({
          deviceId: existingDeviceId,
          updatedData: updatedDevice,
        })
      );
      console.log("updatedDevice:", updatedDevice);
      dispatch(getDeviceDataFromDB());

      if (exisitingDashboardData) {
        console.log("exisitingDashBoardData", exisitingDashboardData);
        dispatch(
          updateDashboardInDB({
            dashboardId: exisitingDashboardData.id,
            updatedData: updatedDevice,
          })
        );
        dispatch(getDashboardDataFromDB());
        console.log("updatedDevice:", updatedDevice);
      }
    } else {
      console.log("formData", deviceObject);

      const result = await dispatch(addDeviceToDB(deviceObject)).unwrap();
      const deviceId = result.id;
      if (deviceId) {
        await dispatch(
          addDashboardDataToDB({ deviceId, dashBoardData: deviceObject })
        );
      } else {
        console.error("Failed to add device:", result.error.message);
      }

      dispatch(getDeviceDataFromDB());
      dispatch(getDashboardDataFromDB());
    }
  };

  const handleDelete = (deviceId) => {
    const device = deviceDB.find((data) => data.deviceId === deviceId);
    if (!device) {
      console.error("Device not found for ID:", deviceId);
      return; // Exit if no matching device
    }
    const dashboardData = dashboardDB.find(
      (data) => data.deviceId === device.deviceId
    );
    if (!dashboardData) {
      console.error("DashboardData not found for ID:", deviceId);
      return; // Exit if no matching device
    }
    const dashboardDataId = dashboardData.id;
    console.log("device to be deleted:", device);

    let deviceQuantity = device.quantity;
    if (deviceQuantity > 1) {
      deviceQuantity--;
      const updatedDevice = {
        ...device,
        quantity: deviceQuantity, // decrement the quantity
      };

      dispatch(
        updateDeviceInDB({
          deviceId: device.deviceId,
          updatedData: updatedDevice,
        })
      );

      dispatch(getDeviceDataFromDB());

      dispatch(
        updateDashboardInDB({
          deviceId: device.deviceId,
          updatedData: updatedDevice,
        })
      );
      dispatch(getDashboardDataFromDB()); // Refresh local state
    } else {
      dispatch(deleteDeviceInDB(deviceId));
      dispatch(deleteDashboardInDB(dashboardDataId));
    }
  };

  return (
    <>
      {isOpen && (
        <DeviceModal onClose={handleCloseModal} onSubmit={handleSubmit} />
      )}
      <div>
        <div className={classes.container}>
          <h2>Brand list</h2>
          <button
            className={classes["container-button"]}
            onClick={handleAddDevice}
          >
            +Add Device
          </button>
        </div>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Device</th>
              <th>Brand</th>
              <th>Status</th>
              <th>Quantity</th>
              <th></th>
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
            {deviceDB && deviceDB.length > 0 ? (
              deviceDB
                .filter((device) => device.uId === userId)
                .map((device) => (
                  <tr key={device.deviceId}>
                    <td>{device.device}</td>
                    <td>{device.brand}</td>
                    <td>{device.status}</td>
                    <td>{device.quantity}</td>
                    <td>
                      <button onClick={() => {}} className="icon-button">
                        <EditIcon fontSize="small" titleAccess="Edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(device.deviceId)}
                        className="icon-button"
                      >
                        <DeleteIcon fontSize="small" titleAccess="Delete" />
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td>No Brands Found</td>
              </tr>
            )}
            {/* <tr>
              <td>Laptop</td>
              <td>Apple</td>
              <td>Active</td>
              <td>1</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
}
