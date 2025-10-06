"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const lease_controllers_1 = require("../controllers/lease.controllers");
const router = express_1.default.Router();
router.get("/", (0, auth_middleware_1.authMiddleware)(["manager", "tenant"]), lease_controllers_1.getLeases);
router.get("/:id/payments", (0, auth_middleware_1.authMiddleware)(["manager", "tenant"]), lease_controllers_1.getLeasePayments);
exports.default = router;
