import { jwtDecode } from "jwt-decode";

const AddToCart = ({ product }) => {
  const getUserIdFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const handleCart = async () => {
    const token = localStorage.getItem("authToken");
    const userId = getUserIdFromToken(token);
    const cartItem = {
      userId: userId,
      productId: product.id,
    };

    try {
      const response = await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: cartItem.userId,
          productId: cartItem.productId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleCart}>
      Dodaj do koszyka
    </button>
  );
};

export default AddToCart;
