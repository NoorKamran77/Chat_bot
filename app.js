require("dotenv").config({
    quiet: true
});
const express = require("express");
const app = express();
const db = require("./config/mongoose-connect");
const botRoutes = require("./routes/botRoutes");
const chatRoutes = require("./routes/chatRoutes");
const PORT = process.env.PORT || 5000;
const { generateResponse } = require("./services/geminiService");
app.use(express.json());
app.use("/bot", botRoutes);
app.use("/chat", chatRoutes);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server Running"
    });
});
app.get("/test-gemini", async (req, res) => {
    const response = await generateResponse("Explain the quantum tunneling!");
    res.send(response);
});
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: "Server Error"
    });
});
app.listen(PORT, () => {
    console.log("Server Started at 3000");
});