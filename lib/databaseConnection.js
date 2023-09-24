const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://sheikhusamabilal:Xsep7P3gM3NBr8jN@cluster0.mkqe5g5.mongodb.net/";

let connection;

export const connectDB = async () => {
  try {
    connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export const disconnectDB = async () => {
  await connection.disconnect();
};
