import { WebSocketServer } from "ws";
import Post from "../models/post.js";

const initWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("WebSocket client connected");

    ws.on("message", async (message) => {
      try {
        const { query } = JSON.parse(message);

        if (!query || query.trim() === "") {
          const posts = await Post.find().sort({ postId: 1 }).limit(20);
          return ws.send(JSON.stringify({ type: "search_result", data: posts }));
        }

        const posts = await Post.find({
          $or: [
            { title: { $regex: query, $options: "i" } },
            { body: { $regex: query, $options: "i" } }
          ]
        }).limit(20);

        ws.send(JSON.stringify({ type: "search_result", data: posts }));
      } catch (error) {
        ws.send(JSON.stringify({ type: "error", message: error.message }));
      }
    });

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });
};

export default initWebSocket;