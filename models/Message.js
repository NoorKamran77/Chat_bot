const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    botId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bot",
        required: true
    },

    userMessage: {
        type: String,
        required: true
    },

    aiResponse: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = new mongoose.model("Message", MessageSchema);