import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleOrder = () => {
    if (!paymentMethod) {
      alert("Please select a payment method 😌");
      return;
    }

    alert(
      paymentMethod === "COD"
        ? "Order placed successfully! 🎉 (Cash on Delivery)"
        : `Payment successful via ${paymentMethod}! 🎉`
    );

    clearCart();
  };

  return (
    <div className="section">
      <h2>Checkout 🛍️</h2>

      {/* BACK BUTTON */}
      <button className="btn back-btn" onClick={() => navigate("/cart")}>
        ← Back to Cart
      </button>

      {cartItems.length === 0 ? (
        <div className="card">
          <p>No items to checkout.</p>
        </div>
      ) : (
        <div className="card">
          <h3>Order Summary</h3>

          {cartItems.map(item => (
            <p key={item.id}>
              {item.name} - ₹{item.price} x {item.quantity || 1}
            </p>
          ))}

          <hr />
          <h3>Total: ₹{totalPrice}</h3>

          {/* PAYMENT OPTIONS */}
          <div style={paymentBox}>
            <h4>Select Payment Method</h4>

            <label style={paymentOption}>
              <input
                type="radio"
                name="payment"
                value="UPI"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI
            </label>

            <label style={paymentOption}>
              <input
                type="radio"
                name="payment"
                value="Card"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Debit / Credit Card
            </label>

            <label style={paymentOption}>
              <input
                type="radio"
                name="payment"
                value="Netbanking"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Net Banking
            </label>

            <label style={paymentOption}>
              <input
                type="radio"
                name="payment"
                value="COD"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery (COD)
            </label>
          </div>

          {/* PLACE ORDER / PAY BUTTON */}
          <button className="btn" onClick={handleOrder}>
            {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ----- Styles ----- */

const paymentBox = {
  marginTop: "15px",
  padding: "15px",
  background: "#fdf6f9",
  borderRadius: "12px",
  textAlign: "left"
};

const paymentOption = {
  display: "block",
  margin: "8px 0",
  cursor: "pointer"
};



export default Checkout;