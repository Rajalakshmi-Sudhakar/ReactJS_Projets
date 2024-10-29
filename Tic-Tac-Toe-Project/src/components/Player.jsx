import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);

  function handleEditClick() {
    setIsEditing(!isEditing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setUpdatedName(event.target.value);
  }

  let playerName = <span className="player-name">{updatedName}</span>;
  let btnCaption = "Edit";
  if (isEditing) {
    playerName = (
      <input type="text" value={updatedName} required onChange={handleChange} />
    );
    btnCaption = "Save";
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
