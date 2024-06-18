import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.String_Connection);
    console.log("Connect success");
  } catch (error) {
    console.error(error);
  }
};
export default connectDB;
