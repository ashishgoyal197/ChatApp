import mongoose from "mongoose";
// const mongoURI =
//   "mongodb+srv://ashishgoyal197:chatapp@cluster1.kc1zudi.mongodb.net/chat-app-db?retryWrites=true&w=majority&appName=Cluster1";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.mongo_db_uri);
    console.log("connected");
  } catch (error) {
    console.log("connection error", error.message);
  }
};

export default connectToMongoDB;
