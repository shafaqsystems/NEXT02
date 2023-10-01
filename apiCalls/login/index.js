import { connectDB, disconnectDB } from "../../../../lib/databaseConnection";
import User from "../../../../models/User";
const jwt = require("jsonwebtoken");

const jwtSecret = "hello1234";

const handler = async (req, res) => {
  const { email, password } = req.body;

  try {
    await connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = password === user.password;

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret);

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // disconnectDB();
  }
};

export default handler;