import db from "../connection"
import Foods from './Foods'
import Ingredients from './Ingredients'

const FoodIngredients = db.define(
  "FoodIngredients",
  {},
  {
    tableName: "tblFoodIngredients"
  }
);

Foods.belongsToMany(Ingredients, { through: FoodIngredients, foreignKey: 'foodID', otherKey: 'ingredientID' });
Ingredients.belongsToMany(Foods, { through: FoodIngredients, foreignKey: 'ingredientID', otherKey: 'foodID' });

export default FoodIngredients