import {
  Sequelize,
  Op,
  jwt,
  verifyPassword,
  hashPassword,
  models,
  regex
} from "../imports"

var express = require("express");
var router = express.Router();

//validate for inputs
router.post("/password", async (req, res) => {
  try {
    let { email, phone } = req.body.data;
    let phoneValid = regex.validateRegex(regex.phoneRegex, phone)
    let emailValid = regex.validateRegex(regex.emailRegex, email)

    if (phoneValid && emailValid) {
      let data = await models.Users.findOne({
        attributes: ["userID", "taraPoint", "fullname", "phone", "deviceID", "email"],
        where: {
          email,
          phone
        }
      });

      if (data !== null) res.json({ err: false, user: data });
      else throw new Error()

    } else throw new Error()
  } catch {
    res.json({ err: true });
  }
});

router.post("/change-password", async (req, res) => {
  try {
    let { phone, password } = req.body.data;
    let phoneValid = regex.validateRegex(regex.phoneRegex, phone)
    let passValid = regex.validateRegex(regex.passwordRegex, password)

    if (phoneValid && passValid) {
      let data = await models.Users.findOne({
        attributes: ["userID"],
        where: {
          phone
        }
      });

      if (data !== null) {
        let hash = await hashPassword(user.password)
        await data.update({ password: hash }, { where: { userID: data.userID } });
        res.json({ err: false });
      } else throw new Error()

    } else throw new Error()
  } catch {
    res.json({ err: true });
  }
});

export default router;
