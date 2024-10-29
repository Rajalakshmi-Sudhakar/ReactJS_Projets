import { useState } from "react";

import "./App.css";
import AddTask from "./components/AddTask";
import ToDoList from "./components/ToDoList";
import CompletedTask from "./components/CompletedTask";

const myToDoList = [
  {
    taskNo: 1,
    taskName: "study React",
    taskStatus: "done",
  },
  {
    taskNo: 2,
    taskName: "program react",
    taskStatus: "in-progress",
  },
];

function App() {
  const [newTask, setNewTask] = useState(myToDoList);
  const [taskDone, setTaskDone] = useState([]);
  //const [taskDelete,setTaskDelete] = useState([]);

  function handleAddTask(task) {
    const lastTaskNo =
      newTask.length > 0 ? newTask[newTask.length - 1].taskNo : 0;

    if (task.trim() !== "") {
      const newData = {
        taskNo: lastTaskNo + 1,
        taskName: task,
        taskStatus: "not-started",
      };

      setNewTask((prevTask) => {
        return [...prevTask, newData];
      });
    }
  }
  console.log(newTask);

  function handleTaskDone(doneTask) {
    console.log(doneTask);
    setTaskDone((prevDoneTask) => {
      return [...prevDoneTask, doneTask];
    });
    let updatedTaskList = newTask.filter((task) => task.taskName !== doneTask);
    setNewTask(updatedTaskList);
  }

  console.log(taskDone);

  function handleDeleteTask(deleteTaskNumber) {
    console.log(deleteTaskNumber);
    let deleteTaskList = newTask.filter(
      (task) => task.taskNo !== deleteTaskNumber
    );

    setNewTask(deleteTaskList);
  }

  return (
    <div className="App">
      <header>
        <h1>To-Do-List</h1>
      </header>
      <main>
        <AddTask onAddNewTask={handleAddTask} />
        <ToDoList
          newList={newTask}
          onDoneTask={handleTaskDone}
          onDeleteTask={handleDeleteTask}
        />
        <CompletedTask completedTask={taskDone} />
      </main>
    </div>
  );
}

export default App;
