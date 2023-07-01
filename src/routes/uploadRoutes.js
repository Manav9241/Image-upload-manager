const express = require("express");
const { UploadsController } = require("../controllers");
const { uploadMiddleware } = require("../middlewares");

const router = express.Router();

router.post("/" , uploadMiddleware , UploadsController.uploadFile);

module.exports = router;