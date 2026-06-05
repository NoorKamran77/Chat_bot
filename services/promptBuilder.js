function buildPrompt(bot, userMessage) {
    const knowledgeText = bot.knowledge
        .map(item =>
            `${item.category}:\n${item.content}`
        )
        .join("\n\n");
    return `System Prompt:\n${bot.systemPrompt}\n Knowledge:\n${knowledgeText}\n Questions:\n${userMessage}`;
}

module.exports = { buildPrompt };