import { Router } from "express";
import { documentsRouter } from "./documents.js";
import { healthRouter } from "./health.js";

export const router = Router();

router.use("/", healthRouter);
router.use("/documents", documentsRouter);
