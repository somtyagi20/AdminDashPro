import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`
    );
    console.log(`Database Connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Database Connection Error: ", error);
    process.exit(1);
  }
};

export default connectDB;
