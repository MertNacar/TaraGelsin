import {
  Op,
  hashPassword,
  models,
  client,
  serviceSID,
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
          name: user.countryName
        }
      })
      delete user.countryName
      delete user.firstname
      delete user.surname
      await models.Users.create({ ...user, countryID: country.countryID });
      res.json({ err: false });
    } else throw new Error();

  } catch (err) {
    res.json({ err: true });
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

router.post("/send-otp", async (req, res) => {
  try {
    let { phone } = req.body.data
    let phoneValid = regex.validateRegex(regex.phoneRegex, phone)

    if (phoneValid) {
      await client.verify.services(serviceSID)
        .verifications
        .create({ to: "+" + phone, channel: 'sms', locale: "tr" })

      res.json({ err: false })
    } else throw new Error()
  } catch (err) {
    res.json({ err: true });
  }
});

router.post("/check-otp", async (req, res) => {
  try {
    let { phone, code } = req.body.data
    let phoneValid = regex.validateRegex(regex.phoneRegex, phone)
    let codeValid = regex.validateRegex(regex.otpRegex, code)
    if (phoneValid && codeValid) {

      let verify = await client.verify.services(serviceSID)
        .verificationChecks
        .create({ to: "+" + phone, code })

      if (verify.status === "approved") {
        res.json({ err: false });

      } else throw new Error()
    } else throw new Error()
  } catch {
    res.json({ err: true });
  }
});

export default router;
