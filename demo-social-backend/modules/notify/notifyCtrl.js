const NotifiesModel = require("./notify");

const createNotify = async (req, res) => {
  try {
    const { user } = req;
    const { recipients, url, text, content, image } = req.body;
    if (recipients.includes(req.user._id.toString())) return;

    const newNotify = await NotifiesModel.create({
      id: user._id,
      recipients,
      url,
      text,
      content,
      image,
    });
    res.send({
      success: true,
      data: newNotify,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const removeNotify = async (req, res) => {
  try {
    const { user } = req;

    const removeNotify = await NotifiesModel.findOneAndDelete({
      id: user._id,
    });
    res.send({
      success: true,
      data: removeNotify,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createNotify,
  removeNotify,
};
