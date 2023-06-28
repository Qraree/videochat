const {ENTER_CHAT} = require('../const/socketEvents');

module.exports = (socket, users) => {

    const handleNewUser = (name) => {
        users.push(name);
    }

    socket.on(ENTER_CHAT, handleNewUser)
}
