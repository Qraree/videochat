const {GET_ALL_MESSAGES, ALL_MESSAGES_FROM_SERVER} = require('../const/socketEvents');
const Message = require('../models/Message');

module.exports = (socket) => {

    const fetchData = async () => {
        const messages = await Message.find({});
        socket.emit(ALL_MESSAGES_FROM_SERVER, messages);
    }

    socket.on(GET_ALL_MESSAGES, fetchData)
}
