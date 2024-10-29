import "./ToDoList.css";

export default function ToDoList({ newList, onDoneTask, onDeleteTask }) {
  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Task Number</th>
            <th>Task List</th>
            <th>Task status</th>
          </tr>
        </thead>
        <tbody>
          {newList.map((list) => (
            <tr key={list.taskNo}>
              <td>{list.taskNo}</td>
              <td>{list.taskName}</td>
              <td>
                <button onClick={() => onDoneTask(list.taskName)}>Done</button>
                <button onClick={() => onDeleteTask(list.taskNo)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
