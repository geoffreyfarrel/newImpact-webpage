import express from "express";
import chartController from "../controllers/chart.controller";
import datatableController from "../controllers/datatable.controller";
import predictionsController from "../controllers/predictions.controller";

const router = express.Router();

router.get("/datatable", datatableController.findAll);
router.get("/chart", chartController.findAll);
router.get("/boxplot", chartController.findAllBoxPlot);
router.get("/prediction/latest", predictionsController.findLatest);
router.get("/prediction/all", predictionsController.findLatestFrontend);

export default router;
