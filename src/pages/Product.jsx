import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddToCart from "../components/AddToCart";

const Product = () => {
  const [product, setProduct] = useState(null);
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productId) {
          const response = await fetch(
            `https://fakestoreapi.com/products/${productId}`
          );
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Ładowanie...</span>
        </div>
        <p className="mt-3">Ładowanie produktu...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="row g-0">
          <div className="col-md-5 text-center p-3">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxWidth: "300px" }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h1 className="card-title text-primary">{product.title}</h1>
              <p className="card-text text-muted">{product.description}</p>
              <p className="card-text">
                <strong>Cena:</strong> {product.price}$
              </p>
              <p className="card-text">
                <strong>Ocena:</strong> {product.rating.rate}
              </p>
              <p className="card-text">
                <strong>Ilość opinii:</strong> {product.rating.count}
              </p>
              <AddToCart product={{ id: product.id, quantity: 1 }} />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <Link to={"/"} className="btn btn-secondary">
          Powrót do strony głównej
        </Link>
      </div>
    </div>
  );
};

export default Product;
