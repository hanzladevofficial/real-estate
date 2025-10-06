"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRoutes = exports.leaseRouter = exports.propertiesRouter = exports.managerRoutes = exports.tenantRoutes = void 0;
const tenant_routes_1 = __importDefault(require("./tenant.routes"));
exports.tenantRoutes = tenant_routes_1.default;
const manager_routes_1 = __importDefault(require("./manager.routes"));
exports.managerRoutes = manager_routes_1.default;
const properties_routes_1 = __importDefault(require("./properties.routes"));
exports.propertiesRouter = properties_routes_1.default;
const lease_routes_1 = __importDefault(require("./lease.routes"));
exports.leaseRouter = lease_routes_1.default;
const application_routes_1 = __importDefault(require("./application.routes"));
exports.applicationRoutes = application_routes_1.default;
