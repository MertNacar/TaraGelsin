import {
  Sequelize,
  Op,
  jwt,
  verifyPassword,
  hashPassword,
  models,
} from "../imports"

var express = require("express");
var router = express.Router();


router.get("/categories", async (req, res) => {
  try {
    let { cafeID, page } = req.query;
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);

    if (validate) {
      let data = await models.Categories.findAll({
        attributes: ["categoryID", "categoryName", "categoryImagePath"],
        includeIgnoreAttributes: false,
        limit: 3,
        offset: page * 3,
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
  } catch {
    res.json({ err: true });
  }
});

router.get("/categories/foods", async (req, res) => {
  try {
    let { categoryID, page } = req.query;
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);

    if (validate) {
      let data = await models.Foods.findAll({
        attributes: ["foodID", "foodName", "foodCost", "foodDescription", "isNewFood", "foodPreperationTime", "foodImagePath", "foodCal"],
        includeIgnoreAttributes: false,
        limit: 3,
        offset: page * 3,
        where: {
          foodOnSale: true
        },
        include: [{
          required: true,
          model: models.Categories,
          where: {
            categoryID
          },
        }]
      });
      if (data !== null) {
        res.json({ err: false, foods: data });

      } else throw new Error()
    } else throw new Error()
  } catch {
    res.json({ err: true });
  }
});

router.get("/categories/foods/foodDetails", async (req, res) => {
  try {
    let foodID = req.query.foodID;
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);

    if (validate) {
      let data = await models.Foods.findOne({
        attributes: ["foodID"],
        where: {
          foodID
        },
        include: [{
          model: models.Ingredients,
          through: { attributes: [] },
        },
        {
          through: { attributes: [] },
          model: models.Extras,
        }]
      });
      if (data !== null) {
        data.dataValues.ingredients = [...data.tblIngredients]
        data.dataValues.extras = [...data.tblExtras]
        delete data.dataValues.tblIngredients
        delete data.dataValues.tblExtras
        res.json({ err: false, food: data });

      } else throw new Error()
    } else throw new Error()
  } catch (err) {
    res.json({ err: true, errm: err.message });
  }
});

export default router;
