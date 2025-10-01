"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manager_controllers_1 = require("../controllers/manager.controllers");
const router = (0, express_1.Router)();
router.post("/", manager_controllers_1.createManager);
router.get("/:cognitoId", manager_controllers_1.getManager);
exports.default = router;
