import db from "../connection"
import Sequelize from "sequelize"
import Foods from './Foods'
import Ingredients from './Ingredients'

const FoodIngredients = db.define(
  "tblFoodIngredients",
  {
    ingredientQty: {
      type: Sequelize.CHAR,
      allowNull: false
    },
  },
  {
    freezeTableName: true
  }
);

Foods.belongsToMany(Ingredients, { through: FoodIngredients, sourceKey: 'foodID' });
Ingredients.belongsToMany(Foods, { through: FoodIngredients, sourceKey: 'ingredientID' });