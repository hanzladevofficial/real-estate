"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
// Routes Imports
const index_routes_1 = require("./routes/index.routes");
// Configurations
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: false,
}));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, // if you send cookies or Authorization headers
}));
// Routes
app.get("/", (_, res) => {
    res.send("This is Home Route");
});
app.use("/tenants", (0, auth_middleware_1.authMiddleware)(["tenant"]), index_routes_1.tenantRoutes);
app.use("/managers", (0, auth_middleware_1.authMiddleware)(["manager"]), index_routes_1.managerRoutes);
// Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Sever running on ${port}`);
});
