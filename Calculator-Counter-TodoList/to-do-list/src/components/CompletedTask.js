export default function CompletedTask({ completedTask }) {
  return (
    <section>
      <h3>Completed Tasks:</h3>
      <ol>
        {completedTask.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ol>
    </section>
  );
}
