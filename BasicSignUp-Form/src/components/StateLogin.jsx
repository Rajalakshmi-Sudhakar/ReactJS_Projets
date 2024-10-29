import { useState } from "react";

export default function StateLogin() {
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({ email: false, password: false });

  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({ ...prevEdit, [identifier]: true }));
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValue) => ({ ...prevValue, [identifier]: value }));
    setDidEdit((prevEdit) => ({ ...prevEdit, [identifier]: false }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(enteredValues);
  }

  const emailIsInValid = didEdit.email && !enteredValues.email.includes("@");

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            onChange={(event) => handleInputChange("email", event.target.value)}
            value={enteredValues.email}
            onBlur={() => handleInputBlur("email")}
          />
        </div>
        <div className="control-error">
          {emailIsInValid && <p>Enter a valid email</p>}
        </div>
        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            value={enteredValues.password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
