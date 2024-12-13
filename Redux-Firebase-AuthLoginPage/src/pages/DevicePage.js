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
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [dashboardEditData, setDashboardEditData] = useState(null);
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

  const handleEditDevice = (deviceId) => {
    console.log("Device edit icon clicked for row id:", deviceId);
    const DeviceEditData = deviceDB.find(
      (device) => device.deviceId === deviceId
    );
    if (DeviceEditData) {
      console.log("device edit data:", DeviceEditData);
      setEditData(DeviceEditData);
    }
    const DashboardEditData = dashboardDB.find(
      (data) => data.deviceId === deviceId
    );
    if (DashboardEditData) {
      console.log("DashBoardEditData", DashboardEditData);
      setDashboardEditData(DashboardEditData);
    }
    setIsEdit(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    setIsEdit(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsEdit(false);
    const fd = new FormData(e.target);
    const deviceToEditObject = { uId: userId };
    fd.forEach((value, key) => {
      deviceToEditObject[key] = value;
    });

    console.log("device to be edited object", deviceToEditObject);

    //console.log("Dashboard to be edited object", dashboardToEditObject);

    // const existingDeviceTobeEdited = deviceDB.find(
    //   (device) =>
    //     device.uId === deviceToEditObject.uId &&
    //     device.brand === deviceToEditObject.brand &&
    //     device.device === deviceToEditObject.device
    // );
    // console.log("Device to be edited:", existingDeviceTobeEdited);

    // //if (existingDeviceTobeEdited) {
    // const existingDeviceTObeEditedId = existingDeviceTobeEdited.id;
    // console.log("existingDeviceTobeEditedID:", existingDeviceTObeEditedId);

    const exisitingDeviceTobeEditedId = editData.deviceId;
    if (exisitingDeviceTobeEditedId) {
      console.log("device to be edited id: ", exisitingDeviceTobeEditedId);
    }

    const exisitingDashboardTobeEditedId = dashboardEditData.id;
    if (exisitingDashboardTobeEditedId) {
      console.log("dashboard to be edited: ", exisitingDashboardTobeEditedId);
    }

    // const exisitingDashboardTobeEdited = dashboardDB.find(
    //   (dashboardData) => dashboardData.deviceId === existingDeviceTobeEdited
    // );

    const dashboardToEditObject = {
      uId: userId,
      deviceId: exisitingDeviceTobeEditedId,
    };
    fd.forEach((value, key) => {
      dashboardToEditObject[key] = value;
    });

    console.log("exisitingDashboardTobeEdited Object", dashboardToEditObject);

    try {
      await dispatch(
        updateDeviceInDB({
          deviceId: exisitingDeviceTobeEditedId,
          updatedData: deviceToEditObject,
        })
      ).unwrap();

      await dispatch(getDeviceDataFromDB()).unwrap();
      await dispatch(
        updateDashboardInDB({
          dashboardId: exisitingDashboardTobeEditedId,
          updatedData: dashboardToEditObject,
        })
      ).unwrap();
      await dispatch(getDashboardDataFromDB()).unwrap();
    } catch (error) {
      console.error("Error updating brand data:", error);
    }
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
      try {
        await dispatch(
          updateDeviceInDB({
            deviceId: existingDeviceId,
            updatedData: updatedDevice,
          })
        ).unwrap();
        console.log("updatedDevice:", updatedDevice);
        await dispatch(getDeviceDataFromDB()).unwrap();
      } catch (error) {
        console.log("updateDeviceInDB error", error);
      }

      if (exisitingDashboardData) {
        console.log("exisitingDashBoardData", exisitingDashboardData);
        try {
          await dispatch(
            updateDashboardInDB({
              dashboardId: exisitingDashboardData.id,
              updatedData: updatedDevice,
            })
          ).unwrap();
          await dispatch(getDashboardDataFromDB()).unwrap();
          console.log("updatedDevice:", updatedDevice);
        } catch (error) {
          console.log("Update Dashboard in DB error:", error);
        }
      }
    } else {
      console.log("formData", deviceObject);

      const result = await dispatch(addDeviceToDB(deviceObject)).unwrap();
      const deviceId = result.id;
      if (deviceId) {
        await dispatch(
          addDashboardDataToDB({ deviceId, dashBoardData: deviceObject })
        );
        console.log("**addDashB data**", {
          deviceId,
          dashBoardData: deviceObject,
        });
      } else {
        console.error("Failed to add device:", result.error.message);
      }

      dispatch(getDeviceDataFromDB());
      dispatch(getDashboardDataFromDB());
    }
  };

  const handleDelete = async (deviceId) => {
    const device = deviceDB.find((data) => data.deviceId === deviceId);
    if (!device) {
      console.error("Device not found for ID:", deviceId);
      return; // Exit if no matching device
    }
    const dashboardData = dashboardDB.find(
      (data) => data.deviceId === deviceId
    );
    if (!dashboardData) {
      console.error("DashboardData not found for ID:", deviceId);
      return; // Exit if no matching device
    }
    const dashboardDataId = dashboardData.id;
    console.log("device to be deleted:", device);
    console.log("dashboardData to be deleted:", dashboardData);
    console.log("dashboard id in handledelete function", dashboardDataId);

    let deviceQuantity = device.quantity;
    if (deviceQuantity > 1) {
      Number(deviceQuantity--);
      const updatedDevice = {
        ...device,
        quantity: String(deviceQuantity), // decrement the quantity
      };

      try {
        await dispatch(
          updateDeviceInDB({
            deviceId: device.deviceId,
            updatedData: updatedDevice,
          })
        ).unwrap();

        await dispatch(getDeviceDataFromDB()).unwrap();

        await dispatch(
          updateDashboardInDB({
            dashboardId: dashboardDataId,
            updatedData: updatedDevice,
          })
        ).unwrap();
        await dispatch(getDashboardDataFromDB()).unwrap();
        // Refresh local state
      } catch (error) {
        console.log("error updating deltion quantity data", error);
      }
    } else {
      try {
        console.log(
          "else part of delete item device Id, dashboardId:",
          deviceId,
          dashboardDataId
        );
        await dispatch(deleteDeviceInDB(deviceId)).unwrap();
        await dispatch(getDeviceDataFromDB()).unwrap();
        await dispatch(deleteDashboardInDB(dashboardDataId)).unwrap();
        await dispatch(getDashboardDataFromDB()).unwrap();
      } catch (error) {
        console.log("error deleting data", error);
      }
    }
  };

  return (
    <>
      {isOpen && (
        <DeviceModal onClose={handleCloseModal} onSubmit={handleSubmit} />
      )}

      {isEdit && (
        <DeviceModal
          onClose={handleCloseModal}
          onSubmit={handleEditSubmit}
          prePopulatedData={editData}
          isEditState={isEdit}
        />
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
                      <button
                        onClick={() => {
                          handleEditDevice(device.deviceId);
                        }}
                        className="icon-button"
                      >
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
