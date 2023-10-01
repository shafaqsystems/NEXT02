import { connectDB, disconnectDB } from "../../../../lib/databaseConnection";
import Product from "../../../../models/Product";

const handler = async (req, res) => {
  try {
    await connectDB();
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ error: "Unable to retrieve product" });
  } finally {
    // disconnectDB();
  }
};

export default handler;