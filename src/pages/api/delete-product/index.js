import { connectDB, disconnectDB } from "../../../../lib/databaseConnection";
import Product from "../../../../models/Product";

const handler = async (req, res) => {
  try {
    const productId = req.body.id;
    await connectDB();

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Unable to delete product" });
  } finally {
    disconnectDB();
  }
};

export default handler;
