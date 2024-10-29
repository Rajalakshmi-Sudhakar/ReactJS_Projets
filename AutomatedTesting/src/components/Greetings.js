import { useState } from "react";

export default function Greetings() {
  const [changedText, setChangedText] = useState(false);

  function handleOnClick() {
    setChangedText(true);
  }

  return (
    <div>
      <h2>Hello world!</h2>
      {!changedText && <p>Good to see you!</p>}
      {changedText && <p> Changed! </p>}
      <button onClick={handleOnClick}>Change Text!</button>
    </div>
  );
}
