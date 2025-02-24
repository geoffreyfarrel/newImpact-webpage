import express from "express";
import latestController from "../controllers/latest.controller";
import chartController from "../controllers/chart.controller";

const router = express.Router();

router.get("/latest", latestController.findLatest);
router.get("/datatable/latest");
router.get("datatable/all");
router.get("/chart/latest", chartController.findLatest);
router.post("/chart", chartController.findAll);

export default router;
