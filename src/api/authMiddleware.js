import jsonwebtoken from "jsonwebtoken";
const SECRET_KEY = "7s2kFJvL3nMeQ8R1Pz0XyW4vT9gB6dCjH5aN1mOoV2k";

export function authMiddleware(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Odmowa dostępu." });
  }

  try {
    const decoded = jsonwebtoken.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: "Nieprawidłowy token." });
  }
}

export default authMiddleware;
