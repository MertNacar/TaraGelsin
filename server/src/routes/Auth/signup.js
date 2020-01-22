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
router.post("/", async (req, res) => {
  try {
    let user = req.body.data;
    var token = jwt.createToken(user.username);
    let hash = await hashPassword(user.password);
    user.password = hash;
    user.fullname = user.firstname + " " + user.surname
    delete user.firstname
    delete user.surname

    let data = await models.Users.create(user);

    delete data.dataValues.password
    delete data.dataValues.updatedAt
    delete data.dataValues.createdAt
    let newUser = { ...data.dataValues }
    newUser.token = token;
    newUser.loginDate = Date(Date.now()).toString();

    res.json({ err: false, user: newUser });
  } catch {
    res.json({ err: true });
  }
});

//validate for inputs
router.post("/validateUsername", async (req, res) => {
  try {
    let username = req.body.data;
    let data = await models.Users.findOne({
      attributes: ["username"],
      where: {
        username
      }
    });
    if (data === null) res.json({ err: false });
    else res.json({ err: true });
  } catch (err) {
    res.json({ err: true });
  }
});

//validate for inputs
router.post("/validateEmail", async (req, res) => {
  try {
    let email = req.body.data;
    let data = await models.UserModel.findOne({
      attributes: ["email"],
      where: {
        email
      }
    });

    if (data === null) res.json({ err: false });
    else res.json({ err: true });
  } catch {
    res.json({ err: true });
  }
});

router.post("/validatePhone", async (req, res) => {
  try {
    let phone = req.body.data;
    let data = await models.UserModel.findOne({
      attributes: ["phone"],
      where: {
        phone
      }
    });

    if (data === null) res.json({ err: false });
    else res.json({ err: true });
  } catch {
    res.json({ err: true });
  }
});

export default router;
