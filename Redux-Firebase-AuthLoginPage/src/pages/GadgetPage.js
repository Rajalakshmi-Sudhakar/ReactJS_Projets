import BrandPage from "./BrandPage";
import DevicePage from "./DevicePage";
//import { getBrandDataFromDB } from "../store/UserDataSlice";
import classes from "../styling/AddGadget.module.scss";

import { useState } from "react";
//import { useDispatch } from "react-redux";

export default function GadgetPage() {
  const [openIndex, setOpenIndex] = useState(null);

  //const dispatch = useDispatch();
  //const [isOpen, setIsOpen] = useState(false);
  //console.log(`${openIndex}`);

  // const toggleBrandSection = (index) => {
  //   // console.log(`${openIndex} before`);
  //   // setIsOpen((prevState) => !prevState);
  //   setOpenIndex(openIndex === index ? null : index);
  //   //dispatch(getBrandDataFromDB());
  //   // console.log(`${openIndex} after`);
  // };

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={classes.accordion}>
      <div className={classes.item}>
        <button
          className={classes["accordion-header"]}
          onClick={() => toggleSection(1)}
        >
          Brand
          <span className={classes["accordion-icon"]}>+</span>
        </button>
        <div
          className={` ${
            openIndex === 1
              ? classes["accordion-content"].show
              : classes["accordion-content"]
          }`}
        >
          <BrandPage />
        </div>
      </div>
      <div className={classes.item}>
        <button
          className={classes["accordion-header"]}
          onClick={() => toggleSection(2)}
        >
          Device
          <span className={classes["accordion-icon"]}>+</span>
        </button>
        <div
          className={` ${
            openIndex === 2
              ? classes["accordion-content"].show
              : classes["accordion-content"]
          }`}
        >
          <DevicePage />
        </div>
      </div>
    </div>
  );
}
