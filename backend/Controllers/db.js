import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "JobPortal" });
    console.log("DataBase Connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB