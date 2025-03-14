import express from "express";
import latestController from "../controllers/latest.controller";
import chartController from "../controllers/chart.controller";
import datatableController from "../controllers/datatable.controller";

const router = express.Router();

router.get("/datatable", datatableController.findAll);
router.get("/chart", chartController.findAll);
router.get("/boxplot", chartController.findAllBoxPlot);

export default router;
