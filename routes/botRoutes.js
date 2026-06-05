const express = require("express");
const botController = require("../controllers/botController");
const router = express.Router();

router.post("/create", botController.createBot);
router.get("/:id", botController.getBotid)
router.post("/:id", botController.updateBot);
router.get("/", botController.getAllBots);
router.delete("/:id", botController.deleteBot);

module.exports = router;