import { connectDB, disconnectDB } from "../../../../lib/databaseConnection";
import Product from "../../../../models/Product";

const handler = async (req, res) => {
  try {
    const { name, desc, brand, category, weight, price } = req.body;
    await connectDB();
    const product = await Product.create({
      name,
      desc,
      brand,
      category,
      weight,
      price,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Unable to create product" });
  } finally {
    // disconnectDB();
  }
};

export default handler;