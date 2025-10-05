import { Router } from "express";
import { createManager, getManager } from "../controllers/manager.controllers";
const router = Router();
router.post("/", createManager);
router.get("/:cognitoId", getManager);

export default router;
