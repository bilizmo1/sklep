import { User, Order, Cart } from "./apiModel.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = "7s2kFJvL3nMeQ8R1Pz0XyW4vT9gB6dCjH5aN1mOoV2k";

export const login = async (credentials) => {
  try {
    const user = await User.findOne({
      where: { email: credentials.email, password: credentials.password },
    });
    if (!user) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return { user, token };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const getAllOrders = async (userId) => {
  try {
    const orders = await Order.findAll({ where: userId });
    return orders;
  } catch (error) {
    console.error(`Error fetching orders for user with ID ${userId}:`, error);
    throw error;
  }
};

export const getOrderById = async (id) => {
  try {
    const order = await Order.findByPk(id);
    if (!order) throw new Error(`Order with ID ${id} not found`);
    return order;
  } catch (error) {
    console.error(`Error fetching order with ID ${id}:`, error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const newOrder = await Order.create(orderData);
    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const addToCart = async (cartData) => {
  try {
    const newCartItem = await Cart.create(cartData);
    return newCartItem;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const getCart = async (userId) => {
  try {
    const cartItems = await Cart.findAll({ where: { userId } });
    if (!cartItems.length) {
      throw new Error(`No cart items found for user with ID ${userId}`);
    }
    return cartItems;
  } catch (error) {
    console.error(
      `Error fetching cart items for user with ID ${userId}:`,
      error
    );
    throw error;
  }
};

export const deleteCartItem = async (userId, productId) => {
  try {
    const result = await Cart.destroy({ where: { userId, productId } });
    if (result === 0) {
      throw new Error(
        `Cart item not found for user ID ${userId} and product ID ${productId}`
      );
    }
    return { message: "Cart item deleted successfully" };
  } catch (error) {
    console.error(
      `Error deleting cart item for user ID ${userId} and product ID ${productId}:`,
      error
    );
    throw error;
  }
};

export const clearCart = async (userId) => {
  try {
    const result = await Cart.destroy({ where: { userId } });
    if (result === 0) {
      throw new Error(`No cart items found for user with ID ${userId}`);
    }
    return { message: "Cart cleared successfully" };
  } catch (error) {
    console.error(`Error clearing cart for user with ID ${userId}:`, error);
    throw error;
  }
};