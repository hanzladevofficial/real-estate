"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const properties_controllers_1 = require("../controllers/properties.controllers");
const multer_1 = __importDefault(require("multer"));
// Multer Storage
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
// Routes
const router = (0, express_1.Router)();
router.get("/", properties_controllers_1.getProperties);
router.get("/:id", properties_controllers_1.getProperty);
router.post("/", (0, auth_middleware_1.authMiddleware)(["manager"]), upload.array("photos"), properties_controllers_1.createProperty);
exports.default = router;
