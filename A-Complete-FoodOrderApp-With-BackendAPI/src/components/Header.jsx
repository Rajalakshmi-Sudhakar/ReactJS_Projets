//import { useState } from "react";
import logoImage from "../assets/logo.jpg";

export default function Header({ onCartClick, order }) {
  const totalCartItems = order.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImage} alt="Food Logo" />
        <h1>React Food</h1>
      </div>
      <button onClick={onCartClick}>{`Cart(${totalCartItems})`}</button>
    </header>
  );
}
