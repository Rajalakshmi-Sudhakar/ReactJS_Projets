import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/AuthSlice";
import { Form, NavLink } from "react-router-dom";

import "../styling/style.scss";
import logo from "../assets/logo.svg";

export default function SignUp() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    //confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signupUser(formData));
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div className="login-page">
      <div className="login-logo">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="login-box">
        <Form onSubmit={handleSubmit}>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            maxLength={8}
          />

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Loading..." : "SignUp"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {status === "succeeded" && (
            <p style={{ color: "blue" }}>Signup successful!</p>
          )}
        </Form>
      </div>
      <div>
        <NavLink to="/">Existing user? LOGIN here.</NavLink>
      </div>
    </div>
  );
}
