import { connectDB, disconnectDB } from "../../../../lib/databaseConnection";
import User from "../../../../models/User";

const handler = async (req, res) => {
  try {
    const { email, password } = req.body;

    await connectDB();

    const user = await User.create({
      email,
      password,
    });

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.json({ error });
  } finally {
    // disconnectDB();
  }
};

export default handler;