import { Router } from "express";
import { createTenant, getTenant } from "../controllers/tenant.controllers";
const router = Router();
router.post("/", createTenant);
router.get("/:cognitoId", getTenant);

export default router;
