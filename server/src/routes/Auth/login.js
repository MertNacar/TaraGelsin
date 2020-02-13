import {
  Sequelize,
  Op,
  jwt,
  verifyPassword,
  models,
  regex
} from "../imports"

var express = require("express");
var router = express.Router();

//Get ınformation from user
router.post("/immediately", async (req, res) => {
  try {
    let { phone } = req.query.data;
    let phoneValid = regex.validateRegex(regex.phoneRegex, phone)
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);

    if (validate && phoneValid) {
      let data = await models.Users.findOne({
        attributes: [
          "userID",
          "fullname",
          "email",
          "phone",
        ],
        where: {
          phone
        },
        include: [
          deviceID
        ]
      });

      if (data !== null) {
        let user = data.dataValues;
        user.token = token;
        user.loginDate = Date(Date.now()).toString();
        res.json({ err: false, user });
      } else throw new Error();

    } else throw new Error();
  } catch {
    res.json({ err: true });
  }
});

//login validate with form
router.post("", async (req, res) => {
  try {
    let { phone, password } = req.body.data;
    let phoneValid = regex.validateRegex(regex.phoneRegex, phone)
    let passValid = regex.validateRegex(regex.passwordRegex, password)

    if (phoneValid && passValid) {
      let data = await models.Users.findOne({
        attributes: [
          "userID",
          "fullname",
          "password",
          "email",
          "phone",
          "deviceID"
        ],
        where: {
          phone
        }
      });

      if (data !== null) {
        let confirm = await verifyPassword(password, data.password);

        if (confirm) {
          let token = jwt.createToken(data.phone);
          let user = data.dataValues;
          user.token = token;
          user.loginDate = Date(Date.now()).toString();
          delete user.password;
          res.json({ err: false, user });
        } else throw new Error();

      } else throw new Error();

    } else throw new Error();
  } catch {
    res.json({ err: true });
  }
});

export default router;
