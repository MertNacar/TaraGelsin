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

router.get("/credit-cards", async (req, res) => {
  try {
    let { userID } = req.query;
    let firstValid = regex.validateRegex(regex.uuidRegex, userID)

    let token = req.headers.authorization.split(" ")[1];
    let tokenValid = jwt.validateToken(token);

    if (firstValid && tokenValid) {

      let credCards = await models.CredCards.findAll({
        attributes: ["cardID", "cardName", "cardNumber"],
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

  } catch (err) {
    res.json({ err: true, mess: err.message });
  }
});

router.post("/add-credit-card", async (req, res) => {
  try {
    let { cardName, cardNumber, cardCvv, cardDate, userID } = req.body.data;
    let nameValid = regex.validateRegex(regex.nameRegex, cardName)
    let numberValid = regex.validateRegex(regex.cardNumberRegex, cardNumber)
    let dateValid = regex.validateRegex(regex.cardDateRegex, cardDate)
    let cvvValid = regex.validateRegex(regex.cardCvvRegex, cardCvv)

    let token = req.headers.authorization.split(" ")[1];
    let tokenValid = jwt.validateToken(token);

    if (nameValid && numberValid && dateValid && cvvValid && tokenValid) {

      let credCard = await models.CredCards.findOne({
        attributes: ["cardID"],
        where: {
          cardNumber
        }
      })

      console.log('credCard', credCard)
      if (credCard == null) {
        await models.CredCards.create({
          cardName, cardNumber, cardDate, cardCvv, userID
        })
        res.json({ err: false });
      } else throw new Error()

    } else throw new Error();

  } catch (err) {
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
        attributes: ["orderID", "orderCost", "createdAt"],
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
          attributes: ["cafeName"]
        }]
      })
      res.json({ err: false, orders });
    } else throw new Error();
  } catch (err) {
    console.log('err.message', err.message)
    res.json({ err: true });
  }
});

export default router;
