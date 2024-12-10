import jwt from "jsonwebtoken";
import config from "../config/config.js";

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is require" });
  }
  try {
    const decoded = jwt.verify(auth, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token wrong or expired" });
  }
};

export default ensureAuthenticated;
