import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Ensure this is the correct import
import CreateOrder from "../components/CreateOrder";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);

  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.id; // Replace with the actual field name in your token payload
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const fetchCartItems = async () => {
    const token = localStorage.getItem("authToken");
    const userId = getUserIdFromToken(token);
    setUserId(userId);

    if (!userId) {
      console.error("Invalid user ID from token.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/cart/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart items.");
      }

      const data = await response.json();
      setCartItems(data); // Assuming data is an array of cart items
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
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

  useEffect(() => {
    fetchCartItems();
    fetchProducts();
  }, []);

  const handleDelete = async (itemId) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `http://localhost:3000/api/cart/${userId}/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item from cart.");
      }

      fetchCartItems();
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const getProductDetails = (productId) => {
    return products.find((product) => product.id === productId);
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const product = getProductDetails(item.productId);
    return total + (product ? parseFloat(product.price, 10) : 0);
  }, 0);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center">
          Your cart is currently empty.
        </div>
      ) : (
        <>
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const product = getProductDetails(item.productId);
                return (
                  <tr key={item.id}>
                    <td>{product ? product.title : "Unknown"}</td>
                    <td>${product ? product.price : "Unknown"}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item.productId)}
                      >
                        <i className="fas fa-trash-alt"></i> Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="text-right mt-3">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          </div>
          <div className="text-center mt-4">
            <CreateOrder
              cartItems={cartItems}
              userId={userId}
              totalAmount={totalPrice}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
