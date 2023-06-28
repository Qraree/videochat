const {SEND_MESSAGE, SEND_MESSAGE_TO_ALL} = require('../const/socketEvents');
const Message = require('../models/Message');


module.exports = (socket, io) => {
    const sendMessage = async (message) => {
        await Message.create(message)
        io.emit(SEND_MESSAGE_TO_ALL, message)
    }

    socket.on(SEND_MESSAGE, sendMessage)
}
