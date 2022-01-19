const router = require('express').Router();
const auth = require('../../middleware/auth');
const messageController = require('./message.controller')

router.get('/create/:memberId', auth, messageController.createMessage);
router.get('/allConversation', auth, messageController.getAllMessages);
router.get('/conversation/:userId', auth, messageController.getMessageByUserId);
router.put('/chat/:userId', auth, messageController.updateMessage);

module.exports = router
