const Router =  require('express');
const Message = require('../models/Message');
const router = new Router();

router.post('/messages', async (req, res) => {
    try {
        const {username, content, time} = req.body;
        const message = {
            username,
            content,
            time
        }
        const savedMessage = await Message.create(message);
        await savedMessage.save();
        return res.json({message: "Message has been published"})
    } catch (e) {
        console.log(e)
    }
})

router.get('/messages', (req, res) => {
    return res.json({message: "Get all messages"});
})

module.exports = router
