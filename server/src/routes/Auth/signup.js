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


//register user
router.post("", async (req, res) => {
  try {
    let user = req.body.data;
    let firstValid = regex.validateRegex(regex.nameRegex, user.firstname)
    let surValid = regex.validateRegex(regex.nameRegex, user.surname)
    let passValid = regex.validateRegex(regex.passwordRegex, user.password)
    let phoneValid = regex.validateRegex(regex.phoneRegex, user.phone)
    let emailValid = regex.validateRegex(regex.emailRegex, user.email)
    let countryValid = regex.validateRegex(regex.countryRegex, user.countryName)
    let validate = firstValid && surValid && passValid && phoneValid && emailValid && countryValid

    if (validate) {
      let hash = await hashPassword(user.password);
      user.password = hash;
      user.fullname = user.firstname + " " + user.surname
      let country = await models.Countries.findOne({
        attributes: ["countryID"],
        where: {
          countryName: user.countryName
        }
      })
      delete user.countryName
      delete user.firstname
      delete user.surname
      await models.Users.create({ ...user, countryID: country.countryID });
      res.json({ err: false });
    } else throw new Error();

  } catch (err) {
    res.json({ err: true, mess: err.message });
  }
});

//check phone before registered
router.post("/validate-phone", async (req, res) => {
  try {
    let { phone } = req.body.data;
    let phoneValid = regex.validateRegex(regex.phoneRegex, phone)

    if (phoneValid) {
      let data = await models.Users.findOne({
        attributes: ["phone"],
        where: {
          phone
        }
      });

      if (data === null) res.json({ err: false });
      else throw new Error()

    } else throw new Error()
  } catch {
    res.json({ err: true });
  }
});


router.post("/validate-phone-email", async (req, res) => {
  try {
    let { phone, email } = req.body.data;
    let phoneValid = regex.validateRegex(regex.phoneRegex, phone)
    let emailValid = regex.validateRegex(regex.emailRegex, email)

    if (phoneValid && emailValid) {
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

    } else throw new Error()
  } catch (err) {
    res.json({ err: true });
  }
});

export default router;
