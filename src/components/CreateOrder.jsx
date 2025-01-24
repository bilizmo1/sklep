import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateOrder = ({ cartItems, userId, totalAmount }) => {
  const [orders, setOrders] = useState([]);
  const [orderMessage, setOrderMessage] = useState("");
  const [address, setAddress] = useState("");

  const createOrder = async () => {
    if (!address.trim()) {
      setOrderMessage("Address is required.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!userId) {
      console.error("Invalid user ID from token.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          products: cartItems,
          totalAmount: totalAmount,
          address: address,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create order.");
      }

      const newOrder = await response.json();
      setOrders((prevOrders) => [...prevOrders, newOrder]);
      setOrderMessage("Product ordered successfully!");

      // Clear the cart
      await fetch(`http://localhost:3000/api/cart/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAddress(""); // Clear the address field after a successful order
    } catch (error) {
      console.error("Error creating order:", error);
      setOrderMessage("Failed to order product.");
    }
  };

  return (
    <div className="container mt-4 p-4 border rounded shadow">
      <h2 className="mb-4 text-center">Create Order</h2>
      <div className="form-group mb-3">
        <label htmlFor="address" className="form-label">
          Shipping Address
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          placeholder="Enter your shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="mb-0">
          Total Amount: <strong>${totalAmount.toFixed(2)}</strong>
        </p>
        <button
          className="btn btn-primary"
          onClick={createOrder}
          disabled={!address.trim()}
        >
          Create Order
        </button>
      </div>
      {orderMessage && (
        <div
          className={`alert ${
            orderMessage.includes("successfully")
              ? "alert-success"
              : "alert-danger"
          } mt-3`}
          role="alert"
        >
          {orderMessage}
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
