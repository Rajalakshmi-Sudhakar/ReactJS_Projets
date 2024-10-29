export default function Cart({ order, onAddToCart, onRemoveFromCart }) {
  const totalPrice = order.reduce(
    (acc, ord) => acc + Number(ord.price) * (ord.quantity || 1),
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {order.map((ord) => (
          <li key={ord.id}>
            <div className="cart-item">
              <p>{ord.name} </p>
              <p>{ord.price} </p>
              <div className="cart-item-actions">
                <button onClick={() => onRemoveFromCart(ord.id)}>-</button>
                <p>{ord.quantity}</p>
                <button onClick={() => onAddToCart(ord)}>+</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <p>{formattedTotalPrice} </p>
      </div>
    </div>
  );
}
