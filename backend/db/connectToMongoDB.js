import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_db_uri);
    console.log("connected");
  } catch (error) {
    console.log("connection error", error.message);
  }
};

export default connectToMongoDB;
