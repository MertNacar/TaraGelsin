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

//validate for inputs
router.get("/categories", async (req, res) => {
  try {
    let cafeID = req.query.cafeID;
    let data = await models.Categories.findAll({
      attributes: ["categoryID", "categoryName", "categoryImagePath",],
      include: [{
        required: true,
        model: models.Cafes,
        attributes: ["cafeID"],
        where: {
          cafeID
        },
      }]
    });
    if (data !== null) res.json({ err: false, categories: data.dataValues });
    else res.json({ err: true });
  } catch {
    res.json({ err: true });
  }
});

export default router;
