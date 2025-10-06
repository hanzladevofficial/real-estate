import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getProperties,
  getProperty,
  createProperty,
} from "../controllers/properties.controllers";
import multer from "multer";

// Multer Storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Routes
const router = Router();
router.get("/", getProperties);
router.get("/:id", getProperty);
router.post(
  "/",
  authMiddleware(["manager"]),
  upload.array("photos"),
  createProperty
);
export default router;
