import { connectDB } from "../../../../lib/databaseConnection";
import Product from "../../../../models/Product";

const handler = async (req, res) => {
  const { id, name, desc, brand, category, weight, price } = req.body;
  await connectDB();

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, desc, brand, category, weight, price },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Unable to update product" });
  }
};

export default handler;