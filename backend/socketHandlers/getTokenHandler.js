const {GET_TOKEN, TOKEN_FROM_SERVER} = require('../const/socketEvents');
const {AccessToken} = require("livekit-server-sdk");

module.exports = (socket) => {
    const roomName = 'room';
    const getToken = (name) => {
        const at = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
            identity: name,
        });
        at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });
        const token = at.toJwt();

        socket.emit(TOKEN_FROM_SERVER, token)
    }

    socket.on(GET_TOKEN, getToken)
}
