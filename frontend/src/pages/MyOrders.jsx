import { useEffect, useState } from "react";
import API from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await API.get("/orders/myorders", {
          headers: {
            Authorization: `Bearer ${user?.token}`
          }
        });

        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="section">
      <h2>My Orders 📦</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="card">
            <p><b>Total:</b> ₹{order.totalPrice}</p>
            <p><b>Payment:</b> {order.paymentMethod}</p>
            <p><b>Status:</b> {order.orderStatus}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;