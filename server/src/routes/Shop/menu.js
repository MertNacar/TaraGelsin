import {
  jwt,
  models,
  regex
} from "../imports"

var express = require("express");
var router = express.Router();


router.get("/categories", async (req, res) => {
  try {
    let { cafeID, page } = req.query;
    let cafeValid = regex.validateRegex(regex.uuidRegex, cafeID)
    let pageValid = regex.validateRegex(regex.pageRegex, page)
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);

    if (validate && cafeValid && pageValid) {
      let categories = await models.Categories.findAll({
        attributes: ["categoryID", "imagePath"],
        /*limit: 3,
        offset: page * 3,*/
        where: {
          active: true
        },
        include: [{
          required: true,
          model: models.Cafes,
          attributes: [],
          where: {
            cafeID
          },
        },
        {
          required: true,
          model: models.CategoryNames,
          attributes: ["name"],
        }]
      });

      if (categories !== null) {
        res.json({ err: false, categories });
      } else throw new Error()
      
    } else throw new Error()
  } catch (err) {
    res.json({ err: true, mess: err.message });
  }
});

router.get("/categories/foods", async (req, res) => {
  try {
    let { categoryID, page } = req.query;
    let categoryValid = regex.validateRegex(regex.uuidRegex, categoryID)
    let pageValid = regex.validateRegex(regex.pageRegex, page)
    let token = req.headers.authorization.split(" ")[1];
    let validate = jwt.validateToken(token);

    if (validate && categoryValid && pageValid) {
      let foods = await models.Foods.findAll({
        attributes: ["foodID", "description", "isNewFood", "preperationTime", "imagePath", "calorie"],
        /*limit: 3,
        offset: page * 3,*/
        include: [{
          required: true,
          model: models.Categories,
          attributes:[],
          where: {
            categoryID
          },
        },
        {
          required: true,
          model: models.FoodNames,
          attributes: ["name"],
        },
        {
          required: true,
          model: models.Branches,
          attributes:["name"],
          through: {
            attributes: ["cost"],
            where: {
              onSale: true
            }
          }
        }]
      });

      if (foods !== null) {
        res.json({ err: false, foods });
      } else throw new Error()

    } else throw new Error()
  } catch (err) {
    res.json({ err: true, mess: err.message });
  }
});

router.get("/categories/foods/foodDetails", async (req, res) => {
  try {
    let foodID = req.query.foodID;
    let foodValid = regex.validateRegex(regex.uuidRegex, foodID)

    let token = req.headers.authorization.split(" ")[1];
    let tokenValid = jwt.validateToken(token);

    if (foodValid && tokenValid) {
      let food = await models.Foods.findOne({
        attributes: ["foodID"],
        where: {
          foodID
        },
        include: [{
          model: models.Ingredients,
          through: { attributes: [] }
        },
        {
          model: models.Extras,
          through: { attributes: [] }
        }]
      });

      if (food !== null) {
        res.json({ err: false, food });
      } else throw new Error()

    } else throw new Error()
  } catch (err) {
    res.json({ err: true });
  }
});

export default router;
