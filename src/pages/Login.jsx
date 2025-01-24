import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      setError("");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.Error || "Nieprawidłowe dane wejściowe.");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateInput = () => {
    if (!email || !password) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  useEffect(() => {
    validateInput();
  }, [password, email]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Logowanie</h1>
      <div className="d-flex justify-content-center">
        <div
          className="card shadow p-4"
          style={{
            maxWidth: "500px",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Adres email
              </label>
              <input
                type="text"
                id="username"
                value={email}
                onChange={handleEmailChange}
                className="form-control"
                placeholder="Podaj email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Hasło
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="form-control"
                placeholder="Podaj hasło"
              />
            </div>
            <button
              type="submit"
              disabled={isButtonDisabled}
              className="btn btn-primary w-100"
            >
              Zaloguj
            </button>
          </form>
          <div
            className={`mt-3 ${
              error === "Zalogowano pomyślnie!" ? "text-success" : "text-danger"
            }`}
          >
            {error}
          </div>
          <p className="mt-3 text-center">Pierwszy raz u nas?</p>
          <Link to="/register" className="btn btn-secondary w-100">
            Zarejestruj się!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
