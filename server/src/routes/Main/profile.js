import {
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

    let token = req.headers.authorization.split(" ")[1];
    let tokenValid = jwt.validateToken(token);

    let validate = firstValid && surValid && phoneValid && emailValid && countryValid && tokenValid
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
          name: user.countryName
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

  } catch {
    res.json({ err: true });
  }
});

router.get("/credit-cards", async (req, res) => {
  try {
    let { userID } = req.query;
    let firstValid = regex.validateRegex(regex.uuidRegex, userID)

    let token = req.headers.authorization.split(" ")[1];
    let tokenValid = jwt.validateToken(token);

    if (firstValid && tokenValid) {

      let credCards = await models.CredCards.findAll({
        attributes: ["cardID", "name", "number"],
        includeIgnoreAttributes: false,
        include: [{
          required: true,
          model: models.Users,
          where: {
            userID
          },
        }]
      })

      res.json({ err: false, credCards });
    } else throw new Error();

  } catch {
    res.json({ err: true });
  }
});

router.post("/add-credit-card", async (req, res) => {
  try {
    let { name, number, date, cvv, userID } = req.body.data;
    let userValid = regex.validateRegex(regex.uuidRegex, userID)
    let nameValid = regex.validateRegex(regex.nameRegex, name)
    let numberValid = regex.validateRegex(regex.cardNumberRegex, number)
    let dateValid = regex.validateRegex(regex.cardDateRegex, date)
    let cvvValid = regex.validateRegex(regex.cardCvvRegex, cvv)

    let token = req.headers.authorization.split(" ")[1];
    let tokenValid = jwt.validateToken(token);

    if (userValid && nameValid && numberValid && dateValid && cvvValid && tokenValid) {

      let credCard = await models.CredCards.findOne({
        attributes: ["cardID"],
        where: {
          number
        }
      })
      if (credCard == null) {
        await models.CredCards.create({
          name, number, date, cvv, userID
        })
        res.json({ err: false });
      } else throw new Error()

    } else throw new Error();

  } catch {
    res.json({ err: true });
  }
});

router.get("/order-history", async (req, res) => {
  try {
    let { userID, page } = req.query;
    let userValid = regex.validateRegex(regex.uuidRegex, userID)
    let pageValid = regex.validateRegex(regex.pageRegex, page)

    let token = req.headers.authorization.split(" ")[1];
    let tokenValid = jwt.validateToken(token);

    if (userValid && pageValid && tokenValid) {
      let orders = await models.Orders.findAll({
        attributes: ["orderID", "cost", "createdAt"],
        limit: 10,
        offset: page * 10,
        order: [['createdAt', 'DESC']],
        include: [{
          required: true,
          model: models.Users,
          attributes: [],
          where: {
            userID
          }
        },
        {
          required: true,
          model: models.Cafes,
          attributes: ["name"]
        }]
      })
      res.json({ err: false, orders });
    } else throw new Error();
  } catch {
    res.json({ err: true });
  }
});

router.put("/change-password", async (req, res) => {
  try {
    let { phone, oldPassword, newPassword } = req.body.data;

    let phoneValid = regex.validateRegex(regex.phoneRegex, phone)
    let oldPassValid = regex.validateRegex(regex.passwordRegex, oldPassword)
    let newPassValid = regex.validateRegex(regex.passwordRegex, newPassword)

    let token = req.headers.authorization.split(" ")[1];
    let tokenValid = jwt.validateToken(token);

    if (phoneValid && oldPassValid && newPassValid && tokenValid) {
      let data = await models.Users.findOne({
        attributes: ["userID", "password"],
        where: {
          phone
        }
      });

      if (data !== null) {
        let validate = verifyPassword(oldPassword, data.password)

        if (validate) {
          let newHash = await hashPassword(newPassword)
          await data.update({ password: newHash }, { where: { userID: data.userID } });
          res.json({ err: false });

        } else throw new Error()

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

    let token = req.headers.authorization.split(" ")[1];
    let tokenValid = jwt.validateToken(token);

    if (phoneValid && tokenValid) {
      await client.verify.services(serviceSID)
        .verifications
        .create({ to: "+" + phone, channel: 'sms', locale: "tr" })

      res.json({ err: false })
    } else throw new Error()
  } catch {
    res.json({ err: true });
  }
});

router.post("/check-otp", async (req, res) => {
  try {
    let { phone, code } = req.body.data
    let phoneValid = regex.validateRegex(regex.phoneRegex, phone)
    let codeValid = regex.validateRegex(regex.otpRegex, code)

    let token = req.headers.authorization.split(" ")[1];
    let tokenValid = jwt.validateToken(token);

    if (phoneValid && codeValid && tokenValid) {

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
