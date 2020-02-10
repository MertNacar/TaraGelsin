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


//SIGNUP
router.post("", async (req, res) => {
  try {
    let user = req.body.data;
    let hash = await hashPassword(user.password);
    user.password = hash;
    user.fullname = user.firstname + " " + user.surname
    delete user.firstname
    delete user.surname
    await models.Users.create(user);

    res.json({ err: false });
  } catch {
    res.json({ err: true });
  }
});


router.post("/validatePhone", async (req, res) => {
  try {
    let phone = req.query.phone;
    let data = await models.Users.findOne({
      attributes: ["phone"],
      where: {
        phone
      }
    });

    if (data === null) res.json({ err: false });
    else throw new Error()
  } catch {
    res.json({ err: true });
  }
});

router.post("/validatePhoneEmail", async (req, res) => {
  try {
    let { phone, email } = req.query;
    let data = await models.Users.findOne({
      attributes: ["phone"],
      where: {
        [Op.or]: [
          {
            email
          },
          {
            phone
          }
        ]
      }
    });

    if (data === null) res.json({ err: false });
    else throw new Error()
  } catch {
    res.json({ err: true });
  }
});

export default router;
