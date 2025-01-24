import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Lista kategorii</h1>
      <div className="row g-3">
        {categories.map((category) => (
          <div className="col-md-4 col-lg-3" key={category}>
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title text-capitalize">{category}</h5>
                <Link
                  to={`/category/${category}`}
                  className="btn btn-primary mt-3"
                >
                  Zobacz produkty
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Link to={"/"} className="btn btn-secondary">
          Powrót do strony głównej
        </Link>
      </div>
    </div>
  );
};

export default Home;
