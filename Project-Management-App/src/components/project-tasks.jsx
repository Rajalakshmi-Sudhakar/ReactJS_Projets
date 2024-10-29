import { useState, useRef } from "react";
import AddTask from "./add-task";

export default function ProjectTasks({
  project,
  onProjectDelete,
  onAddTask,
  onClearTask,
  taskList,
  displayTask,
}) {
  //const [tasks, setTasks] = useState([]);
  //const [viewTasks, setViewTasks] = useState(false);
  const task = useRef();
  console.log("ProjectTask: ProjectData:", { project });

  const formattedDate = new Date(project.DueDate).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    date: "numeric",
  });

  /* function handleClearTask(task) {
    setTasks((prevTasks) => prevTasks.filter((prevTask) => prevTask !== task));
  }

  function handleAddTask(task) {
    setTasks((prevTasks) => [...prevTasks, task]);
    console.log("Tasks: ", tasks);
    setViewTasks(true);
  }*/

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4border-b-2 border-stone-300 ">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project.Title}
          </h1>
          <button
            className="text-stone-600 hover:text-stone-950"
            onClick={() => onProjectDelete(project.Id)}
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>

        <p className="text-stone-600 whitespace-pre-wrap">
          {project.Description}
        </p>
      </header>
      <div>
        <h2>Tasks</h2>
        <input
          ref={task}
          type="text"
          placeholder="enter the project task here"
          className="w-full p-1 border-b-2 border-stone-300 rounded-sm bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
        <button
          className="text-stone-600 hover:text-stone-950"
          onClick={() => {
            onAddTask(task.current.value);
          }}
        >
          Add Task
        </button>
        {displayTask && <AddTask taskL={taskList} onClear={onClearTask} />}
        {!displayTask && (
          <p>This project does not have any task. Add it here.</p>
        )}
      </div>
    </div>
  );
}
