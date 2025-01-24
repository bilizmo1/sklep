import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatedPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const isPasswordValid = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return (
      password.length >= minLength && hasUppercase && hasLowercase && hasNumber
    );
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePasswords = async () => {
    setError("");

    if (!isEmailValid(email)) {
      setError("Nieprawidłowy adres e-mail.");
      return;
    }

    if (!isPasswordValid(password)) {
      setError(
        "Hasło musi zawierać co najmniej 8 znaków, w tym dużą literę, małą literę i cyfrę."
      );
      return;
    }

    if (password !== repeatPassword) {
      setError("Hasła nie są zgodne.");
      return;
    }

    await registerUser();
  };

  const registerUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        const errorData = errorText ? JSON.parse(errorText) : {};
        throw new Error(errorData.error || "Rejestracja nie powiodła się.");
      }

      const responseText = await response.text();
      const data = responseText ? JSON.parse(responseText) : null;

      if (data && data.id) {
        setError("Zarejestrowano pomyślnie!");
      } else {
        setError("Zarejestrowano pomyślnie!");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const validateInformation = () => {
    if (!username || !password || !repeatPassword || !email) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  React.useEffect(() => {
    validateInformation();
  }, [username, password, repeatPassword, email]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Rejestracja</h1>
      <div className="d-flex justify-content-center">
        <div
          className="card shadow p-4"
          style={{
            maxWidth: "500px",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nazwa użytkownika
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="form-control"
                placeholder="Wpisz nazwę użytkownika"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Adres e-mail
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="form-control"
                placeholder="Wpisz adres e-mail"
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
                placeholder="Wpisz hasło"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="repeatPassword" className="form-label">
                Powtórz hasło
              </label>
              <input
                type="password"
                id="repeatPassword"
                value={repeatPassword}
                onChange={handleRepeatedPasswordChange}
                className="form-control"
                placeholder="Wpisz hasło ponownie"
              />
            </div>
            <button
              type="button"
              disabled={isButtonDisabled}
              onClick={validatePasswords}
              className="btn btn-primary w-100"
            >
              Zarejestruj się
            </button>
          </form>
          <div
            className={`mt-3 ${
              error === "Zarejestrowano pomyślnie!" ||
              error.startsWith("Zarejestrowano pomyślnie") // Success
                ? "text-success"
                : "text-danger" // Error
            }`}
          >
            {error}
          </div>
        </div>
      </div>
      <div className="text-center mt-4"></div>
      <p className="mb-2">Masz już konto?</p>
      <Link to="/login" className="btn btn-outline-primary w-50">
        Przejdź do logowania
      </Link>
    </div>
  );
}

export default Register;
