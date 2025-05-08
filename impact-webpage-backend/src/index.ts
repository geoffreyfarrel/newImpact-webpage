import express from "express";
import cors from "cors";

import { createServer } from "http";
import { Server } from "socket.io";

import router from "./routes/api";

import db from "./utils/database";
import bodyParser from "body-parser";
import { create } from "domain";
import SensorController from "./controllers/websocket.controller";

async function init() {
  try {
    const result = await db();
    console.log("Database status: ", result);

    const app = express();
    const server = createServer(app);

    app.use(cors());
    app.use(bodyParser.json());

    const PORT = 3000;

    // Check api running
    app.get("/", (req, res) => {
      res.status(200).json({
        message: "Server is running",
        data: null,
      });
    });

    app.use("/api", router);

    const io = new Server(server, {
      cors: { origin: "*", methods: ["GET", "POST"] },
      pingInterval: 10000, // Send ping every 10 seconds
      pingTimeout: 20000, // Disconnect if no response in 20 seconds
    });

    SensorController.setupSocket(io);

    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
