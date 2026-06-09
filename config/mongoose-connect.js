const mongoose = require('mongoose');


mongoose.connect(`${process.env.MONGO_URI}chat-bot`)
    .then(() => {
        console.log("Connected");
    })
    .catch(err => {
        console.log(err);
    });

module.exports = mongoose.connection;