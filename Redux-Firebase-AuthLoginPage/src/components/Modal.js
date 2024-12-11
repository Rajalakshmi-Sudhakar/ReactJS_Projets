// components/Modal.js
import React from "react";
import classes from "../styling/Modal.module.scss";

export default function Modal({ title, children, onClose }) {
  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h3>{title}</h3>
          <button onClick={onClose} className={classes.closeButton}>
            &times;
          </button>
        </div>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
}
