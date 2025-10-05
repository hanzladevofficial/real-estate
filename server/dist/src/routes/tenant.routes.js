"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tenant_controllers_1 = require("../controllers/tenant.controllers");
const router = (0, express_1.Router)();
router.post("/", tenant_controllers_1.createTenant);
router.get("/:cognitoId", tenant_controllers_1.getTenant);
exports.default = router;
