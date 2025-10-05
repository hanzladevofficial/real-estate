import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { authMiddleware } from "./middlewares/auth.middleware";

// Routes Imports
import { managerRoutes, tenantRoutes } from "./routes/index.routes";
// Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, // if you send cookies or Authorization headers
  })
);

// Routes
app.get("/", (_, res) => {
  res.send("This is Home Route");
});
app.use("/tenants", authMiddleware(["tenant"]), tenantRoutes);
app.use("/managers", authMiddleware(["manager"]), managerRoutes);
// Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Sever running on ${port}`);
});
