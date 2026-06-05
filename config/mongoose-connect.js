const mongoose = require('mongoose');
const configs = require("config");


mongoose.connect(`${configs.get("MONGODB_URI")}chat-bot`)
    .then(() => {
        console.log("Connected");
    })
    .catch(err => {
        console.log(err);
    });

module.exports = mongoose.connection;