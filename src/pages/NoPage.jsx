import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div>
      <h1>Ups! Nie ma takiej strony!</h1>
      <div className="mt-2">
        <Link to={"/"} className="btn btn-secondary">
          Powrót do strony głównej
        </Link>
      </div>
    </div>
  );
};

export default NoPage;
