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
      attributes: ["username"],
      where: {
        username: user.username,
      }
    });
    if (data !== null) {
      let hashPassword = await hashPassword(user.password)
      data.password = hashPassword;
      await data.save();
      res.json({ err: false });
    }
    else res.json({ err: true });
  } catch {
    res.json({ err: true });
  }
});

export default router;
