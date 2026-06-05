const { buildPrompt } = require("../services/promptBuilder");
const botModel = require("../models/Bot");
const messageModel = require("../models/Message");
const { generateResponse } = require("../services/geminiService");
exports.chat = async function (req, res) {
    try {
        const { Botid, message } = req.body;
        const bot = await botModel.findById(Botid);
        if (!bot) {
            return res.status(404).json({
                success: false,
                message: "Bot not found"
            });
        }
        const prompt = buildPrompt(bot, message);
        const response = await generateResponse(prompt);
        try {
            await messageModel.create({
                botId: bot._id,
                userMessage: message,
                aiResponse: response
            });
        } catch (err) {
            console.error("Failed to save message:", err);
        }
        return res.status(200).json({
            success: true,
            message: response
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.getHistory = async function (req, res) {
    try {
        const { botId } = req.params;

        const messages = await messageModel
            .find({ botId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            messages
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};