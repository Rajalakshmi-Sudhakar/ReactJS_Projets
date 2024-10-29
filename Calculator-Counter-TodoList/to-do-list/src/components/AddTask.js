import { useState } from "react";
export default function AddTask({ onAddNewTask }) {
  const [task, setTask] = useState("");

  return (
    <section>
      <input
        type="text"
        placeholder="Enter your task here"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      />
      <button onClick={() => onAddNewTask(task)}>Add Task</button>
    </section>
  );
}
