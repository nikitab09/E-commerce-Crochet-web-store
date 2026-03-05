import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });
  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handlePayNow = () => {
    if (!paymentMethod) {
      alert("Please select payment method 😌");
      return;
    }
    setShowPaymentDetails(true);
  };

  const handleOrder = async () => {
    try {
      if (!address.name || !address.phone || !address.street) {
        alert("Please enter delivery address 🚚");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await fetch("http://localhost:5050/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`
        },
        body: JSON.stringify({
          items: cartItems,
          totalPrice,
          paymentMethod,
          address
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }

      alert("Order placed successfully! 🎉");
      clearCart();
      navigate("/");

    } catch (err) {
      console.log(err);
      alert(err.message || "Order failed!");
    }
  };

  return (
    <div className="section">
      <h2>Checkout 🛍️</h2>

      <button className="btn back-btn" onClick={() => navigate("/cart")}>
        ← Back to Cart
      </button>

      {cartItems.length === 0 ? (
        <div className="card">
          <p>No items to checkout.</p>
        </div>
      ) : (
        <div className="card" style={{ maxWidth: "500px", margin: "0 auto" }}>
          <h3>Order Summary</h3>

          {cartItems.map(item => (
            <p key={item.id}>
              {item.name} - ₹{item.price} x {item.quantity || 1}
            </p>
          ))}

          <hr />
          <h3>Total: ₹{totalPrice}</h3>

          {/* DELIVERY ADDRESS */}
          <div style={addressBox}>
            <h4>Delivery Address 🚚</h4>

            <input
              name="name"
              placeholder="Full Name"
              style={addressInput}
              onChange={handleAddressChange}
            />

            <input
              name="phone"
              placeholder="Phone Number"
              style={addressInput}
              onChange={handleAddressChange}
            />

            <input
              name="street"
              placeholder="Street Address"
              style={addressInput}
              onChange={handleAddressChange}
            />

            <input
              name="city"
              placeholder="City"
              style={addressInput}
              onChange={handleAddressChange}
            />

            <input
              name="state"
              placeholder="State"
              style={addressInput}
              onChange={handleAddressChange}
            />

            <input
              name="pincode"
              placeholder="Pincode"
              style={addressInput}
              onChange={handleAddressChange}
            />
          </div>

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
                value="COD"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery (COD)
            </label>
          </div>

          {/* PAY NOW BUTTON */}
          {!showPaymentDetails && (
            <button className="btn" onClick={handlePayNow}>
              {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
            </button>
          )}

          {/* PAYMENT DETAILS BOX (only after Pay Now) */}
          {showPaymentDetails && (
            <div style={detailsBox}>
              {paymentMethod === "UPI" && (
                <>
                  <h4>UPI Payment</h4>

                  <div style={upiBox}>
                    <label>Enter UPI ID</label>
                    <input
                      type="text"
                      placeholder="example@upi"
                      style={upiInput}
                    />
                    <button className="btn">Verify & Pay</button>
                  </div>

                  <p style={{ margin: "10px 0" }}>— OR —</p>

                  <div style={upiBox}>
                    <h4>Scan QR to Pay</h4>
                    <img src="/images/upi-qr.png" style={upiQr} />
                  </div>
                </>
              )}

              {paymentMethod === "Card" && (
                <div style={cardBox}>
                  <h4>Enter Card Details</h4>

                  <input
                    type="text"
                    placeholder="Card Number"
                    style={cardInput}
                    maxLength={16}
                  />

                  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <input
                      type="text"
                      placeholder="Valid Thru (MM/YY)"
                      style={cardInput}
                      maxLength={5}
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      style={{ ...cardInput, width: "80px" }}
                      maxLength={3}
                    />
                  </div>

                  <button className="btn" style={{ marginTop: "12px" }}>
                    Pay Now
                  </button>
                </div>
              )}



              {paymentMethod === "COD" && (
                <p>Order will be delivered — pay on delivery 🚚</p>
              )}

              <button className="btn" style={{ marginTop: "12px" }} onClick={handleOrder}>
                Confirm Order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ----- STYLES ----- */

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

const detailsBox = {
  marginTop: "20px",
  padding: "15px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  textAlign: "center"
};


const upiBox = {
  marginTop: "10px",
  padding: "15px",
  background: "#fdf6f9",
  borderRadius: "12px",
  textAlign: "center"
};

const upiInput = {
  width: "85%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  marginTop: "8px",
  marginBottom: "12px"
};

const upiQr = {
  width: "180px",
  borderRadius: "10px",
  marginTop: "10px"
};
const cardBox = {
  marginTop: "15px",
  padding: "15px",
  background: "#fdf6f9",
  borderRadius: "12px",
  textAlign: "center"
};

const cardInput = {
  width: "95%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  marginTop: "8px"
};
const addressBox = {
  marginTop: "20px",
  padding: "15px",
  background: "#fdf6f9",
  borderRadius: "12px",
  textAlign: "left"
};

const addressInput = {
  width: "95%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  marginTop: "8px"
};

export default Checkout;