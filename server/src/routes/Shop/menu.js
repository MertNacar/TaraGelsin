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


router.get("/categories", async (req, res) => {
  try {
    let cafeID = req.query.cafeID;
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);

    if (validate) {
      let data = await models.Categories.findAll({
        attributes: ["categoryID", "categoryName", "categoryImagePath"],
        includeIgnoreAttributes: false,
        include: [{
          required: true,
          model: models.Cafes,
          where: {
            cafeID
          },
        }]
      });
      if (data !== null) {
        res.json({ err: false, categories: data });

      } else throw new Error()
    } else throw new Error()
  } catch (err) {
    res.json({ err: true, mess: err.message });
  }
});

export default router;
