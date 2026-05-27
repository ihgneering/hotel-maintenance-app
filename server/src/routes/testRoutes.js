import express from "express";

import { verifyToken }
from "../middleware/authMiddleware.js";

import { allowRoles }
from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/admin-only",
  verifyToken,
  allowRoles("admin"),
  (req, res) => {

    res.json({
      message: "Welcome Admin",
      user: req.userProfile,
    });

  }
);

export default router;