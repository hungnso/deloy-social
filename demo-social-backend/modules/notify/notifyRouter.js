const router = require("express").Router();
const auth = require("../../middleware/auth");
const followCtrl = require("./notifyCtrl");

router.post("/", auth, followCtrl.createNotify);
router.delete("/:id", auth, followCtrl.removeNotify);

module.exports = router;
