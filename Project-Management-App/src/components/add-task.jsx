export default function AddTask({ onClear, taskL }) {
  return (
    <div>
      <ul>
        {taskL.map((task, index) => (
          <li key={index}>
            <div className="flex items-center justify-between">
              <p className="text-lg text-stone-600 mb-2">{task}</p>
              <button
                className="text-stone-600 hover:text-stone-950"
                onClick={() => onClear(task)}
              >
                Clear
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
