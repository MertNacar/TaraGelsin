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

//validate for inputs
router.get("/credit-card", async (req, res) => {
  try {
    let userID = req.query.userID;
    let userValid = regex.validateRegex(regex.uuidRegex, userID)
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);

    if (validate && userValid) {
      let data = await models.CredCards.findAll({
        attributes: ["cardName", "cardNumber", "cardCvv", "cardDate", "cardPinNumber"],
        includeIgnoreAttributes: false,
        include: [{
          required: true,
          model: models.Users,
          where: {
            userID
          },
        }]
      });

      if (data !== null) res.json({ err: false, cards: data.dataValues });
      else throw new Error()

    } else throw new Error()
  } catch {
    res.json({ err: true });
  }
});

export default router;
