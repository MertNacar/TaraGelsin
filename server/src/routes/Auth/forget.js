import {
  hashPassword,
  models,
  regex,
  client,
  serviceSID
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
      let user = await models.Users.findOne({
        attributes: ["userID", "fullname", "phone", "deviceID", "email"],
        where: {
          email,
          phone
        }
      });

      if (user !== null) res.json({ err: false, user });
      else throw new Error()

    } else throw new Error()
  } catch {
    res.json({ err: true });
  }
});

router.put("/change-password", async (req, res) => {
  try {
    let { phone, password } = req.body.data;
    let phoneValid = regex.validateRegex(regex.phoneRegex, phone)
    let passValid = regex.validateRegex(regex.passwordRegex, password)

    if (phoneValid && passValid) {
      let user = await models.Users.findOne({
        attributes: ["userID"],
        where: {
          phone
        }
      });

      if (user !== null) {
        let hash = await hashPassword(password)
        await user.update({ password: hash }, { where: { userID: user.userID } });
        res.json({ err: false });
      } else throw new Error()

    } else throw new Error()
  } catch {
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
