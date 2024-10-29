import { useState } from "react";

export default function Counter() {
  const [inputChange, setInputChange] = useState(0);

  return (
    <div>
      <span>
        <h2>{inputChange}</h2>
      </span>
      <span className="button-group">
        <button
          className="btn plus"
          onClick={() => setInputChange(inputChange + 1)}
        >
          +
        </button>
        <button
          className="btn minus"
          onClick={() => setInputChange(inputChange - 1)}
        >
          -
        </button>
        <button onClick={() => setInputChange(0)}>Reset</button>
      </span>
    </div>
  );
}
