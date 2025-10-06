import { Router } from "express";
import {
  createManager,
  getManager,
  getManagerProperties,
  updateManager,
} from "../controllers/manager.controllers";
const router = Router();
router.post("/", createManager);
router.get("/:cognitoId", getManager);
router.put("/:cognitoId", updateManager);
router.post("/:cognitoId/properties", getManagerProperties);
export default router;
