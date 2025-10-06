"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const applications_controllers_1 = require("../controllers/applications.controllers");
const router = express_1.default.Router();
router.post("/", (0, auth_middleware_1.authMiddleware)(["tenant"]), applications_controllers_1.createApplication);
router.put("/:id/status", (0, auth_middleware_1.authMiddleware)(["manager"]), applications_controllers_1.updateApplicationStatus);
router.get("/", (0, auth_middleware_1.authMiddleware)(["manager", "tenant"]), applications_controllers_1.listApplications);
exports.default = router;
