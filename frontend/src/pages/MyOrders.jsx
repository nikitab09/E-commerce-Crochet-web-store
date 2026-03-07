import { useEffect, useState } from "react";
import API from "../services/api";

function MyOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const fetchOrders = async () => {

            try {

                const res = await API.get("/orders/myorders", {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });

                setOrders(res.data);

            } catch (err) {
                console.log(err);
            }

        };

        fetchOrders();

    }, []);
    const cancelOrder = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem("user") || "null");

            await API.put(`/orders/cancel/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            alert("Order cancelled successfully");

            // refresh orders
            setOrders(prev =>
                prev.map(o =>
                    o._id === id ? { ...o, orderStatus: "Cancelled" } : o
                )
            );

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="section">

            <h2>My Orders 📦</h2>

            {orders.length === 0 ? (
                <p>No orders yet</p>
            ) : (

                orders.map(order => (

                    <div key={order._id} className="card">

                        <h3>Order ID: {order._id}</h3>

                        {/* PRODUCTS */}
                        {order.products.map((item, index) => (

                            <div key={index} style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>

                                <img
                                    src={item.product?.image}
                                    alt={item.product?.name}
                                    width="80"
                                    height="80"
                                    style={{ borderRadius: "8px" }}
                                />

                                <div>
                                    <p><b>{item.product?.name}</b></p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ₹{item.product?.price}</p>
                                </div>

                            </div>

                        ))}

                        {/* DELIVERY ADDRESS */}
                        <div style={{ marginTop: "10px" }}>
                            <p><b>Delivery Address:</b></p>

                            <p>{order.address?.name}</p>
                            <p>{order.address?.phone}</p>
                            <p>
                                {order.address?.street}, {order.address?.city}
                            </p>
                            <p>
                                {order.address?.state} - {order.address?.pincode}
                            </p>
                        </div>

                        {/* ORDER INFO */}

                        <p><b>Total:</b> ₹{order.totalPrice}</p>
                        <p><b>Payment:</b> {order.paymentMethod}</p>
                        <p><b>Status:</b> {order.orderStatus}</p>

                        {/* TRACKING MESSAGE */}
                        {order.orderStatus === "Processing" && <p>📦 Your order is being prepared</p>}
                        {order.orderStatus === "Shipped" && <p>🚚 Your order has been shipped</p>}
                        {order.orderStatus === "Delivered" && <p>✅ Your order has been delivered</p>}
                        {order.orderStatus === "Cancelled" && <p>❌ This order was cancelled</p>}

                        {/* BUTTONS */}
                        <div style={{ marginTop: "10px" }}>

                            {order.orderStatus !== "Cancelled" && order.orderStatus !== "Delivered" && (
                                <button
                                    onClick={() => cancelOrder(order._id)}
                                    style={{
                                        background: "#ff4d4d",
                                        color: "white",
                                        border: "none",
                                        padding: "8px 14px",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        marginRight: "10px"
                                    }}
                                >
                                    Cancel Order
                                </button>
                            )}

                            <button
                                onClick={() => alert(`Order Status: ${order.orderStatus}`)}
                                style={{
                                    background: "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    padding: "8px 14px",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                            >
                                Track Order
                            </button>

                        </div>

                    </div>

                ))

            )}

        </div>
    );

}

export default MyOrders;