import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="category/:category" element={<Products />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
