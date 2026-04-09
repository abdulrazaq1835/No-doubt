import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postRoute.js";
import initWebSocket from "./websocket/wsServer.js";
import { autoSeedPosts } from "./controllers/postControllers.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors({
   origin: process.env.ALLOWED_ORIGIN || "*",
  methods: ["GET", "POST"]
}));
app.use(express.json());

connectDB().then(() => {
  autoSeedPosts();
});

app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Api is running...");
});

initWebSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});