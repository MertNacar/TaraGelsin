import db from "../connection"
import Sequelize from "sequelize"
import Foods from './Foods'
import Extras from './Extras'

const FoodExtras = db.define(
  "tblFoodExtras",
  {
    extraCost: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
  },
  {
    freezeTableName: true
  }
);

Foods.belongsToMany(Extras, { through: FoodExtras, sourceKey: 'foodID' });
Extras.belongsToMany(Foods, { through: FoodExtras, sourceKey: 'extraID' });