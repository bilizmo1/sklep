import {
  login as loginService,
  register as registerService,
  getAllOrders as getAllOrdersService,
  getOrderById as getOrderByIdService,
  createOrder as createOrderService,
  addToCart as addToCartService,
  getCart as getCartService,
  deleteCartItem as deleteCartItemService,
  clearCart as clearCartService,
} from "./apiService.js";

// apiController.js

export const login = async (req, res) => {
  try {
    const credentials = req.body;
    const data = await loginService(credentials);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const userData = req.body;
    const data = await registerService(userData);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const userId = req.params;
    const data = await getAllOrdersService(userId);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getOrderByIdService(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: `Error fetching order with ID ${id}`,
      error: error.message,
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const data = await createOrderService(orderData);
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const cartData = req.body;
    const data = await addToCartService(cartData);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await getCartService(userId);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const data = await deleteCartItemService(userId, productId);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting cart item", error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await clearCartService(userId);
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error clearing cart", error: error.message });
  }
};