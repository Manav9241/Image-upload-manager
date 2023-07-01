const express = require("express");

const uploadRoutes = require("./uploadRoutes")

const router = express.Router();

router.use("/uploads" , uploadRoutes);

module.exports = router;