import classes from "../styling/Modal.module.scss";
//import { useRef } from "react";
import { Form } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BrandModal({ onClose, onSubmit }) {
  //   const deviceRef = useRef();
  //   const statusRef = useRef();
  //   const brandRef = useRef();
  //   const quantityRef = useRef();

  const { brandDB } = useSelector((state) => state.uData);

  const { userId } = useSelector((state) => state.auth);

  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h3>Add Device</h3>
          <button onClick={onClose} className={classes.closeButton}>
            &times;
          </button>
        </div>
        <div className={classes.content}>
          <Form onSubmit={onSubmit}>
            <div className={classes["form-group"]}>
              <label htmlFor="existingBrand">Existing Brands</label>
              <select
                id="existingBrand"
                name="brand"
                defaultValue="Select an existing brand"
              >
                {/* <option value="" disabled selected>
                  Select an existing brand
                </option> */}
                {brandDB && brandDB.length > 0 ? (
                  brandDB
                    .filter((brand) => brand.uId === userId)
                    .map((brand) => (
                      <option value={brand.brandName}>{brand.brandName}</option>
                    ))
                ) : (
                  <option value="No brands found">No brands found</option>
                )}
                {/* // <option value="apple">Apple</option>
                // <option value="samsung">Samsung</option>
                // <option value="google">Google</option>
                // <option value="microsoft">Microsoft</option> */}
              </select>
            </div>
            <div className={classes["form-group"]}>
              <label htmlFor="device">Device:</label>
              <input
                type="text"
                id="device"
                name="device"
                //ref={deviceRef}
                required
              />
            </div>
            <div className={classes["form-group"]}>
              <label htmlFor="status">Status:</label>
              <select id="status" name="status">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className={classes["form-group"]}>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                //ref={quantityRef}
                required
              />
            </div>
            <div className={classes["form-actions"]}>
              <button type="submit">Add Device</button>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
