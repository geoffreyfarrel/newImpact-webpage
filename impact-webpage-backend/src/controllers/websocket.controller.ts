import { Server, Socket } from "socket.io";
import SensorModel from "../models/sensor.model";
import response from "../utils/response";
import socketResponse from "../utils/socket-response";
import { HourlyAverage } from "../utils/interface";

export default class SensorController {
  static async sendLatestSensorData(io: Server) {
    try {
      const latestSensor = await SensorModel.findOne().sort({ createdAt: -1 });
      socketResponse.success(
        io,
        "latestSensorData",
        latestSensor,
        "Success find latest data"
      );
    } catch (error) {
      socketResponse.error(
        io,
        "latestSensorData",
        error,
        "Failed to find latest data"
      );
    }
  }

  static async sendLatestChartSensorData(io: Server) {
    try {
      const result = await SensorModel.find()
        .sort({ createdAt: -1 })
        .limit(144); // Latest 144 records

      const reversedResult = [...result].reverse(); // Oldest to newest

      // Group by hour (e.g., 15:00)
      const hourlyGroups: { [hourKey: string]: typeof result } = {};

      reversedResult.forEach((item) => {
        const date = new Date(item.createdAt);
        date.setMinutes(0, 0, 0); // Round to the hour
        const hourKey = date.toISOString();

        if (!hourlyGroups[hourKey]) {
          hourlyGroups[hourKey] = [];
        }
        hourlyGroups[hourKey].push(item);
      });

      // Sort keys chronologically and take last 24 hours
      const last24Hours = Object.entries(hourlyGroups)
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .slice(-24);

      const hourlyAverages: HourlyAverage[] = [];

      last24Hours.forEach(([hourKey, group], i) => {
        const count = group.length;

        const hourAvg = group.reduce(
          (sum, item) => ({
            temperature: sum.temperature + (item.temperature ?? 0),
            pH: sum.pH + (item.pH ?? 0),
            conductivity: sum.conductivity + (item.conductivity ?? 0),
            oxygen: sum.oxygen + (item.oxygen ?? 0),
            ppm: sum.ppm + (item.ppm ?? 0),
            pm25: sum.pm25 + (item.pm25 ?? 0),
          }),
          { temperature: 0, pH: 0, conductivity: 0, oxygen: 0, ppm: 0, pm25: 0 }
        );

        // Calculate averages
        hourlyAverages.push({
          createdAt: new Date(hourKey),
          temperature: parseFloat((hourAvg.temperature / count).toFixed(2)),
          pH: parseFloat((hourAvg.pH / count).toFixed(2)),
          conductivity: parseFloat((hourAvg.conductivity / count).toFixed(2)),
          oxygen: parseFloat((hourAvg.oxygen / count).toFixed(2)),
          ppm: parseFloat((hourAvg.ppm / count).toFixed(2)),
          pm25: parseFloat((hourAvg.pm25 / count).toFixed(2)),
          index: i,
        });
      });

      socketResponse.success(
        io,
        "LatestChartSensorData",
        hourlyAverages,
        "Success find latest 24-hour data"
      );
    } catch (error) {
      socketResponse.error(
        io,
        "LatestChartSensorData",
        error,
        "Failed to find latest 24-hour data"
      );
    }
  }

  static async sendLatestDataTableData(io: Server) {
    try {
      const result = await SensorModel.find().sort({ createdAt: -1 }).limit(50);
      socketResponse.success(
        io,
        "LatestDataTableData",
        result,
        "Success find latest 50 data"
      );
    } catch (error) {
      socketResponse.error(
        io,
        "LatestDataTableData",
        error,
        "Failed to find 50 data"
      );
    }
  }

  static setupSocket(io: Server) {
    let connectedClients = 0;
    io.on("connection", async (socket) => {
      // console.log(`🟢 Client connected: ${socket.id}`);
      // connectedClients++;
      // console.log(`Active WebSocket Clients: ${connectedClients}`);

      await SensorController.sendLatestSensorData(io);
      await SensorController.sendLatestChartSensorData(io);
      await SensorController.sendLatestDataTableData(io);

      socket.on("disconnect", () => {
        // console.log(`Client disconnected: ${socket.id}`);
        // connectedClients--;
        // console.log(`🔴 Active WebSocket Clients: ${connectedClients}`);
      });
    });

    const changeStream = SensorModel.watch();
    changeStream.on("change", async () => {
      console.log("New sensor data detected in database!");
      await SensorController.sendLatestSensorData(io);
      await SensorController.sendLatestChartSensorData(io);
      await SensorController.sendLatestDataTableData(io);
    });
  }
}
