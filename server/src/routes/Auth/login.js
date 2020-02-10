import {
  Sequelize,
  Op,
  jwt,
  verifyPassword,
  models
} from "../imports"

var express = require("express");
var router = express.Router();

//Get ınformation from user
router.get("/immediately", async (req, res) => {
  try {
    let username = req.query.username;
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);
    if (validate) {
      let data = await models.Users.findOne({
        attributes: [
          "userID",
          "fullname",
          "username",
          "email",
          "phone",
          "deviceID"
        ],
        where: {
          username
        },
      });
      if (data === null) throw new Error();
      else {
        let user = data.dataValues;
        user.token = token;
        user.loginDate = Date(Date.now()).toString();
        res.json({ err: false, user });
      }
    } else throw new Error();
  } catch {
    res.json({ err: true });
  }
});

//login validate with form
router.post("", async (req, res) => {
  try {
    let { username, password } = req.body.data;
    let data = await models.Users.findOne({
      attributes: [
        "userID",
        "fullname",
        "username",
        "password",
        "email",
        "phone",
        "deviceID"
      ],
      where: {
        username
      }
    });
    if (data === null) throw new Error();
    else {
      console.log(data.password)
      let confirm = await verifyPassword(password, data.password);
      if (confirm) {
        let token = jwt.createToken(data.username);
        let user = data.dataValues;
        user.token = token;
        user.loginDate = Date(Date.now()).toString();
        delete user.password;
        res.json({ err: false, user });
      } else throw new Error();
    }
  } catch {
    res.json({ err: true });
  }
});

export default router;
