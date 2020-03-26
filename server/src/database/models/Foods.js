import db from "../connection"
import Sequelize from "sequelize"
import FoodNames from './FoodNames'
import Categories from './Categories'

const Foods = db.define(
  "Foods",
  {
    foodID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    description: Sequelize.STRING(120),

    isNewFood: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },

    preperationTime: {
      type: Sequelize.SMALLINT,
      allowNull: false
    },

    imagePath: {
      type: Sequelize.STRING,
      allowNull: false
    },

    calorie: {
      type: Sequelize.SMALLINT,
      allowNull: false
    },

    discount: {
      type: Sequelize.SMALLINT,
      defaultValue: 0
    }
  },
  {
    tableName: "tblFoods"
  }
);

FoodNames.hasMany(Foods, { foreignKey: 'foodNameID', allowNull: false });
Foods.belongsTo(FoodNames, { foreignKey: 'foodNameID', allowNull: false });

Categories.hasMany(Foods, { foreignKey: 'categoryID', allowNull: false });
Foods.belongsTo(Categories, { foreignKey: 'categoryID', allowNull: false });

export default Foods