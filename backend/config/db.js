import mongoose from "mongoose";

const ConnectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
         console.log("MongoDB connected");
    } catch (error) {
         console.error("MongoDB connection failed:", error.message)
    }
}

export default ConnectDB