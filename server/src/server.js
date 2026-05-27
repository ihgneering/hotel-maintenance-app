import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import uploadImageRoute from "./routes/uploadImageRoutes.js";
import roomAssignmentRoutes from "./routes/roomAssignmentRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.use("/api/test", testRoutes);

// auth route
app.use("/api/auth", authRoutes);

// rooms route
app.use("/api/rooms", roomRoutes);
// room assignment route
app.use("/api/room-assignments", roomAssignmentRoutes);

// reports route
app.use("/api/reports", reportRoutes);
// upload image route
app.use("/api/upload", uploadImageRoute)


app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});