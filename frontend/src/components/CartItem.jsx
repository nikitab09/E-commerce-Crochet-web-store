function CartItem({ item, removeItem }) {
  return (
    <div className="card" style={{ marginBottom: "15px" }}>
      <h4>{item.name}</h4>
      <p>₹{item.price}</p>
      <button
        className="btn"
        onClick={() => removeItem(item.id)}
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;