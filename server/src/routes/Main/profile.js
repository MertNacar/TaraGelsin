import {
  Sequelize,
  Op,
  jwt,
  verifyPassword,
  hashPassword,
  regex,
  models
} from "../imports"

var express = require("express");
var router = express.Router();

router.put("/update-user", async (req, res) => {
  try {
    let { user, initial } = req.body.data;
    let firstValid = regex.validateRegex(regex.nameRegex, user.firstname)
    let surValid = regex.validateRegex(regex.nameRegex, user.surname)
    let phoneValid = regex.validateRegex(regex.phoneRegex, user.phoneCode + user.phone)
    let emailValid = regex.validateRegex(regex.emailRegex, user.email)
    let countryValid = regex.validateRegex(regex.countryRegex, user.countryName)

    let initfirstValid = regex.validateRegex(regex.nameRegex, initial.firstname)
    let initsurValid = regex.validateRegex(regex.nameRegex, initial.surname)
    let initphoneValid = regex.validateRegex(regex.phoneRegex, initial.phoneCode + initial.phone)
    let initemailValid = regex.validateRegex(regex.emailRegex, initial.email)
    let initcountryValid = regex.validateRegex(regex.countryRegex, initial.countryName)

    let validate = firstValid && surValid && phoneValid && emailValid && countryValid
      && initfirstValid && initsurValid && initphoneValid && initemailValid && initcountryValid

    if (validate) {

      let oldUser = await models.Users.findOne({
        attributes: ["userID"],
        where: {
          phone: initial.phoneCode + initial.phone,
          email: initial.email
        }
      })

      let country = await models.Countries.findOne({
        attributes: ["countryID"],
        where: {
          countryName: user.countryName
        }
      })

      user.fullname = user.firstname + " " + user.surname
      user.phone = user.phoneCode + user.phone
      delete user.phoneCode
      delete user.countryName
      delete user.firstname
      delete user.surname
      await oldUser.update(
        { ...user, countryID: country.countryID },
        { where: { userID: oldUser.userID } }
      );
      res.json({ err: false, user });
    } else throw new Error();

  } catch (err) {
    res.json({ err: true });
  }
});

export default router;
