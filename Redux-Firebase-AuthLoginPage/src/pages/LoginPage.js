import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/AuthSlice";
import { Form, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "../styling/style.scss";
import logo from "../assets/logo.svg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      console.log("login user matched db data");
      // Navigate to the welcome page on successful login
      navigate("/welcome");
    } else {
      console.error(resultAction.payload || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-logo">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="login-box">
        <Form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            maxLength={8}
          />
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
          {status === "failed" && <p style={{ color: "red" }}>{error}</p>}
        </Form>
      </div>
      <div>
        <NavLink to="signup">New user? SIGN UP here.</NavLink>
      </div>
    </div>
  );
};

export default LoginPage;
