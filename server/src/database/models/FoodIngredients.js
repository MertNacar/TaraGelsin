import db from "../connection"
import Sequelize from "sequelize"
import Foods from './Foods'
import Ingredients from './Ingredients'

const FoodIngredients = db.define(
  "tblFoodIngredients",
  {},
  { timestamps: false }
);

Foods.belongsToMany(Ingredients, { through: FoodIngredients, foreignKey: 'foodID', otherKey: 'ingredientID' });
Ingredients.belongsToMany(Foods, { through: FoodIngredients, foreignKey: 'ingredientID', otherKey: 'foodID' });

export default FoodIngredients