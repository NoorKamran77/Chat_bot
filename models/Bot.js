const mongoose = require("mongoose");

const BotSchema = new mongoose.Schema({
    botName: {
        type: String,
        required: true
    },

    systemPrompt: {
        type: String,
        default: ""
    },

    knowledge: [{
        category: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });

module.exports = new mongoose.model("Bot", BotSchema);