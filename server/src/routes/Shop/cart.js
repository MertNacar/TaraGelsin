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
router.get("/get-credit-cards", async (req, res) => {
  try {
    let userID = req.query.userID;
    let userValid = regex.validateRegex(regex.uuidRegex, userID)
    
    let token = req.headers.authorization.split(" ")[1];
    let tokenValid = jwt.validateToken(token);

    if (userValid && tokenValid) {
      let cards = await models.CredCards.findAll({
        attributes: ["name", "number", "cvv", "date"],
        includeIgnoreAttributes: false,
        include: [{
          required: true,
          model: models.Users,
          where: {
            userID
          },
        }]
      });

      if (cards !== null) res.json({ err: false, cards });
      else throw new Error()

    } else throw new Error()
  } catch {
    res.json({ err: true });
  }
});

export default router;
