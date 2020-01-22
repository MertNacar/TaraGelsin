import {
  Sequelize,
  Op,
  jwt,
  verifyPassword,
  hashPassword,
  models
} from "../imports"

var express = require("express");
var router = express.Router();

//validate for inputs
router.post("/password", async (req, res) => {
  try {
    let user = req.body.data;
    let data = await models.Users.findOne({
      attributes: ["userID", "gender", "taraPoint", "username", "fullname", "phone", "deviceID", "email", "birthday"],
      where: {
        username: user.username,
        phone: user.phone
      }
    });
    if (data !== null) res.json({ err: false, user: data });
    else res.json({ err: true });
  } catch {
    res.json({ err: true });
  }
});

router.post("/changePassword", async (req, res) => {
  try {
    let user = req.body.data;
    let data = await models.Users.findOne({
      attributes: ["userID"],
      where: {
        username: user.username,
      }
    });
    if (data !== null) {
      let hash = await hashPassword(user.password)
      await data.update({ password: hash }, { where: { userID: data.userID } });
      res.json({ err: false });
    } else throw new Error()
  } catch {
    res.json({ err: true });
  }
});

export default router;
