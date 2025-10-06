import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createApplication,
  listApplications,
  updateApplicationStatus,
} from "../controllers/applications.controllers";

const router = express.Router();

router.post("/", authMiddleware(["tenant"]), createApplication);
router.put("/:id/status", authMiddleware(["manager"]), updateApplicationStatus);
router.get("/", authMiddleware(["manager", "tenant"]), listApplications);

export default router;
