import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://first:first@cluster0.1byqncu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Uses the environment variable

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default dbConnect;
