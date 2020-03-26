import db from "../connection"
import Foods from './Foods'
import Extras from './Extras'

const FoodExtras = db.define(
  "FoodExtras",
  {},
  {
    tableName: "tblFoodExtras"
  }
);

Foods.belongsToMany(Extras, { through: FoodExtras, foreignKey: 'foodID', otherKey: 'extraID' });
Extras.belongsToMany(Foods, { through: FoodExtras, foreignKey: 'extraID', otherKey: 'foodID' });

export default FoodExtras