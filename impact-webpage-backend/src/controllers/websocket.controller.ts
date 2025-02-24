import { Server, Socket } from "socket.io";
import SensorModel from "../models/sensor.model";
import response from "../utils/response";
import socketResponse from "../utils/socket-response";
import { HourlyAverage } from "../utils/interface";

export default class SensorController {
  static async sendLatestSensorData(io: Server) {
    try {
      const latestSensor = await SensorModel.find()
        .sort({ createdAt: -1 })
        .limit(1);
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
        .limit(144);
      const reversedResult = result.reverse();

      // Calculate hourly averages (6 data points per hour)
      const hourlyAverages: HourlyAverage[] = [];
      for (let i = 0; i < 24; i++) {
        const start = i * 6;
        const end = start + 6;
        const hourData = reversedResult.slice(start, end);

        // Calculate the average for this hour
        const hourAvg = hourData.reduce(
          (sum, item) => {
            return {
              temperature: sum.temperature + (item.temperature ?? 0) / 6,
              pH: sum.pH + (item.pH ?? 0) / 6,
              conductivity: sum.conductivity + (item.conductivity ?? 0) / 6,
              oxygen: sum.oxygen + (item.oxygen ?? 0) / 6,
              ppm: sum.ppm + (item.ppm ?? 0) / 6,
              pm25: sum.pm25 + (item.pm25 ?? 0) / 6,
              index: i,
            };
          },
          { temperature: 0, pH: 0, conductivity: 0, oxygen: 0, ppm: 0, pm25: 0 }
        );

        // Round the timestamp to the start of the hour
        const roundedDate = new Date(hourData[0].createdAt ?? new Date());
        roundedDate.setMinutes(0, 0, 0); // Set minutes, seconds, and milliseconds to zero

        // Format values to 2 decimal places and add to hourly averages
        hourlyAverages.push({
          createdAt: roundedDate,
          temperature: parseFloat(hourAvg.temperature.toFixed(2)),
          pH: parseFloat(hourAvg.pH.toFixed(2)),
          conductivity: parseFloat(hourAvg.conductivity.toFixed(2)),
          oxygen: parseFloat(hourAvg.oxygen.toFixed(2)),
          ppm: parseFloat(hourAvg.ppm.toFixed(2)),
          pm25: parseFloat(hourAvg.pm25.toFixed(2)),
          index: i,
        });
      }
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

  static setupSocket(io: Server) {
    let connectedClients = 0;
    io.on("connection", async (socket) => {
      // console.log(`🟢 Client connected: ${socket.id}`);
      // connectedClients++;
      // console.log(`Active WebSocket Clients: ${connectedClients}`);

      await SensorController.sendLatestSensorData(io);
      await SensorController.sendLatestChartSensorData(io);

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
    });
  }
}
