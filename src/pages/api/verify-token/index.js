import { connectDB, disconnectDB } from "../../../../lib/databaseConnection";
const jwt = require("jsonwebtoken");

const jwtSecret = "hello1234";

const handler = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Failed to authenticate token" });
      }

      req.user = decoded;
      return res.status(200).json({ message: "Token authenticated" });
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

export default handler;
