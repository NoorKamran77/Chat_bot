const express = require("express");
const chatController = require("../controllers/chatController");
const router = express.Router();

router.post("/", chatController.chat);
router.get("/history/:botId", chatController.getHistory);

module.exports = router;