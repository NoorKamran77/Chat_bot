const botModel = require("../models/Bot");
const express = require("express");

exports.createBot = async function (req, res) {
    try {
        const { botName, systemPrompt, knowledge } = req.body;
        const existingBot = await botModel.findOne({ botName });

        if (existingBot) {
            return res.status(400).json({
                message: "Bot already exists"
            });
        }
        const createdBot = await botModel.create({
            botName,
            systemPrompt,
            knowledge
        });

        res.status(201).json(createdBot);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}
exports.getBotid = async function (req, res) {
    const { id } = req.params;

    const bot = await botModel.findById(id);

    res.status(200).json(bot);
}
exports.getAllBots = async function (req, res) {
    try {
        const bots = await botModel.find();

        return res.status(200).json({
            success: true,
            bots
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
exports.updateBot = async function (req, res) {
    try {
        const { botId } = req.params
        const Bot = await botModel.findById(botId);
        if (!Bot) {
            return res.status(404).json({
                success: false,
                message: "Bot not found"
            });
        }
        const { botName, systemPrompt, knowledge } = req.body;

        if (botName) Bot.botName = botName;
        if (systemPrompt) Bot.systemPrompt = systemPrompt;
        if (knowledge) Bot.knowledge = knowledge;

        await Bot.save();

        return res.status(200).json({
            success: true,
            bot
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}
exports.deleteBot = async function (req, res) {
    try {
        const { id } = req.params;

        const bot = await botModel.findById(id);

        if (!bot) {
            return res.status(404).json({
                success: false,
                message: "Bot not found"
            });
        }

        await messageModel.deleteMany({
            botId: bot._id
        });

        await bot.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Bot deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
