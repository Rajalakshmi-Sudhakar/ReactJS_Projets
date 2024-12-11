import classes from "../styling/Modal.module.scss";
//import { useRef } from "react";
import { Form } from "react-router-dom";

export default function BrandModal({ onClose, onSubmit }) {
  //const bnameRef = useRef();
  //const statusRef = useRef();

  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h3>Add Brand</h3>
          <button onClick={onClose} className={classes.closeButton}>
            &times;
          </button>
        </div>
        <div className={classes.content}>
          <Form onSubmit={onSubmit}>
            <div className={classes["form-group"]}>
              <label htmlFor="brandName">Brand Name:</label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                //ref={bnameRef}
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
            <div className={classes["form-actions"]}>
              <button type="submit">Add Brand</button>
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
