import { Router } from "express";
import {
  createTenant,
  getTenant,
  updateTenant,
} from "../controllers/tenant.controllers";
const router = Router();
router.post("/", createTenant);
router.get("/:cognitoId", getTenant);
router.put("/:cognitoId", updateTenant);
export default router;
