const MessageModel = require('./message');

const createMessage = async (req, res) => {
    const { user } = req;
    const { memberId } = req.params;

    const conversation = await MessageModel.findOne(
        { member: { $all: [user._id, memberId] } }
    )

    if (!conversation) {
        const newConversation = await MessageModel.create({
            member: [user._id, memberId],
            chat: []
        })
        res.send({
            success: true,
            data: newConversation
        })
    } else {
        res.send({
            success: true,
            data: conversation
        })
    }
}

const updateMessage = async (req, res) => {
    const { user } = req;
    const { userId } = req.params
    const { content } = req.body;

    const dataChat = {
        userId: user._id,
        content
    }
    const conversation = await MessageModel
    .findOneAndUpdate(
        { member: { $all: [user._id, userId] } },
        { $push: { chat: dataChat } },
        { new: true }
    )
    .populate({
        path: "chat",
        select: "username avatar",
    })
    res.send({
        success: true,
        data: conversation
    })

}

const getAllMessages = async (req, res) => {
    const { user } = req;
    const allConversation = await MessageModel
        .find(
            { member: { $all: [user._id] } }
        )
        .populate({
            path: "member",
            select: "username avatar",
        })
        .sort({ updatedAt: -1 })
    res.send({
        success: true,
        data: allConversation
    })
}

const getMessageByUserId = async (req, res) => {
    const { userId } = req.params
    const { user } = req;
    const conversation = await MessageModel
        .findOne(
            { member: { $all: [user._id, userId] } }
        )
        .populate({
            path: "member",
            select: "username avatar",
        })
        .populate({
            path: "chat",
            populate: {
                path: 'userId',
                select: "username avatar",
            }
        })
    // .sort({ createdAt: -1 })
    res.send({
        success: true,
        data: conversation
    })

}

module.exports = {
    createMessage,
    getAllMessages,
    getMessageByUserId,
    updateMessage
}