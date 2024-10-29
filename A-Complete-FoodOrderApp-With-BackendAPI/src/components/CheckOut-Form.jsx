export default function CheckOutForm({ onSubmit }) {
  /* function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log("Formdata", data);
  }*/
  return (
    <form onSubmit={() => onSubmit(event)}>
      <div className="control">
        <h2>CheckOut</h2>
        <p>Total Amoiunt:</p>
        <label htmlFor="name">Full Name: </label>
        <input type="text" name="name" required />
        <label htmlFor="email">Email Address: </label>
        <input type="email" name="email" required />
        <label htmlFor="street">Street: </label>
        <input type="text" name="street" required />

        <div className="control-row">
          <label htmlFor="postal-code">Postal Code: </label>
          <input type="number" name="postal-code" required />
          <label htmlFor="city">City: </label>
          <input type="text" name="city" required />
        </div>
        <button type="submit" className="button">
          Submit Order
        </button>
      </div>
    </form>
  );
}
