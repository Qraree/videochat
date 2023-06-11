const {Schema, model} = require("mongoose");

const Message = new Schema({
    username: {type: String, required: true},
    content: {type: String, required: true},
    time: {type: Date, required: true}
})

module.exports = model('Message', Message);
