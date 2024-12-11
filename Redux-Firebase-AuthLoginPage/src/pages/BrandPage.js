import classes from "../styling/DashBoard.module.scss";
import BrandModal from "../components/BrandModal.js";
import {
  addBrandToDB,
  getBrandDataFromDB,
  deleteBrandInDB,
} from "../store/UserDataSlice.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

//import Modal from "../components/Modal.js";
//import { Form } from "react-router-dom";
//import { formData } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function BrandPage() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const { brandDB, status, error, deviceDB } = useSelector(
    (state) => state.uData
  );
  // console.log("Current brandDB in Redux state:", brandDB);
  // console.log("Fetch status:", status);
  // console.log("Fetch error (if any):", error);
  // console.log("logged in user's ID:", userId);
  //const { brandDB } = useSelector((state) => state.uData);
  const [isOpen, setIsOpen] = useState(false);
  // const bnameRef = useRef();
  // const statusRef = useRef();

  useEffect(() => {
    dispatch(getBrandDataFromDB());
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetched brandDB from Redux:", brandDB);
  }, [brandDB]);

  const handleAddBrand = () => {
    console.log("Button Clicked");
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsOpen(false);
    const fd = new FormData(e.target);

    const brandObject = { uId: userId };
    fd.forEach((value, key) => {
      brandObject[key] = value;
    });
    console.log("formData", brandObject);
    const isDuplicate = brandDB.some(
      (brand) =>
        brand.brandName.toLowerCase() === brandObject.brandName.toLowerCase()
    );

    if (!isDuplicate) {
      dispatch(addBrandToDB(brandObject));
      dispatch(getBrandDataFromDB());
    } else {
      alert("Brand already added!");
    }
    dispatch(getBrandDataFromDB());
  };

  const handleDelete = (brandId) => {
    const tobeDeletedBrandData = brandDB.find((data) => data.id === brandId);
    const tobeDeletedBrandName = tobeDeletedBrandData.brandName;

    if (
      deviceDB.find(
        (device) =>
          device.brand === tobeDeletedBrandName &&
          device.uId === tobeDeletedBrandData.uId
      )
    ) {
      alert(
        "Cannot delete brand. You have an active device in usage in this brand."
      );
    } else {
      dispatch(deleteBrandInDB(brandId));
    }
  };

  return (
    <>
      {isOpen && (
        <BrandModal onClose={handleCloseModal} onSubmit={handleSubmit} />
        /*<Modal title="Brand New Brand" onClose={handleCloseModal}>
          <Form onSubmit={handleSubmit}>
            <div className={classes["form-group"]}>
              <label htmlFor="brandName">Brand Name:</label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                ref={bnameRef}
                required
              />
            </div>
            <div className={classes["form-group"]}>
              <label htmlFor="status">Status:</label>
              <select id="status" name="status" ref={statusRef}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className={classes["form-actions"]}>
              <button type="submit">Add Brand</button>
              <button type="button" onClick={handleCloseModal}>
                Cancel
              </button>
            </div>
          </Form>
        </Modal>*/
      )}

      <div>
        <div className={classes.container}>
          <h2>Brand list</h2>
          <button
            className={classes["container-button"]}
            onClick={handleAddBrand}
          >
            +Add Brand
          </button>
        </div>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Status</th>
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

            {brandDB && brandDB.length > 0 ? (
              brandDB
                .filter((brand) => brand.uId === userId)
                .map((brand) => (
                  <tr key={brand.id}>
                    <td>{brand.brandName}</td>
                    <td>{brand.status}</td>
                    <td>
                      <button onClick={() => {}} className="icon-button">
                        <EditIcon fontSize="small" titleAccess="Edit" />
                      </button>
                      <button
                        onClick={() => handleDelete(brand.id)}
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
          </tbody>
        </table>
      </div>
    </>
  );
}
