import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [products, setProducts] = useState([]);

  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userId = getUserIdFromToken(token);
    setUserId(userId);

    const fetchOrders = async () => {
      if (!userId) {
        console.error("Invalid user ID from token.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/orders/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchOrders();
    fetchProducts();
  }, [userId]);

  const getProductDetails = (productId) => {
    const product = products.find((product) => product.id === productId);
    return product ? product.title : "Unknown Product";
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Your Orders</h2>
      {orders.length === 0 ? (
        <div className="alert alert-info text-center">
          You have no orders yet. Start shopping now!
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card border-primary h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Order ID: {order.id}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-success">{order.status}</span>
                  </p>
                  <h6>Products:</h6>
                  <ul className="list-group list-group-flush">
                    {order.products.map((product, index) => (
                      <li key={index} className="list-group-item">
                        {getProductDetails(product.productId)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer">
                  <div>
                    <span>
                      <strong>Total Products:</strong> {order.products.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
