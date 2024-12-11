import classes from "../styling/DashBoard.module.scss";
import BrandModal from "../components/BrandModal.js";
import {
  addBrandToDB,
  getBrandDataFromDB,
  deleteBrandInDB,
  updateBrandInDB,
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
  const [isEdit, setIsEdit] = useState(false);
  const [selectedDataToEdit, setSelectedDataToEdit] = useState(null);
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
    setIsEdit(false);
  };

  const handleSubmit = async (e) => {
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
      try {
        await dispatch(addBrandToDB(brandObject)).unwrap();
        await dispatch(getBrandDataFromDB()).unwrap();
      } catch (error) {
        console.log("Error adding Brand Data", error);
      }
    } else {
      alert("Brand already added!");
    }
    //dispatch(getBrandDataFromDB());
  };

  const handleEdit = (brandId) => {
    console.log("Edit Icon clicked on row:", brandId);
    const brandEditData = brandDB.find((brand) => brand.id === brandId);
    if (brandEditData) {
      console.log("Brand edit data:", brandEditData);
      setSelectedDataToEdit(brandEditData);
    }
    setIsEdit(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsEdit(false);
    const fd = new FormData(e.target);
    const brandToEditObject = { id: selectedDataToEdit.id, uId: userId };
    fd.forEach((value, key) => {
      brandToEditObject[key] = value;
    });
    console.log("Brand to be edited object", brandToEditObject);
    try {
      await dispatch(
        updateBrandInDB({
          brandId: brandToEditObject.id,
          updatedData: brandToEditObject,
        })
      ).unwrap();

      await dispatch(getBrandDataFromDB()).unwrap();
    } catch (error) {
      console.error("Error updating brand data:", error);
    }
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
      )}

      {isEdit && (
        <BrandModal
          onClose={handleCloseModal}
          onSubmit={handleEditSubmit}
          prePopulatedData={selectedDataToEdit}
          isEditState={isEdit}
        />
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
                      <button
                        onClick={() => handleEdit(brand.id)}
                        className="icon-button"
                      >
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
