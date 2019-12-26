import db from "../connection"
import Sequelize from "sequelize"
import Categories from './Categories'
import Ingredients from './Ingredients'
import Extras from './Extras'

const Foods = db.define(
  "tblFoods",
  {
    foodID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    foodName: {
      type: Sequelize.STRING,
      allowNull: false
    },

    foodCost: {
      type: Sequelize.DECIMAL(10, 4),
      allowNull: false
    },

    foodDescription: Sequelize.STRING(120),

    isNewFood: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },

    foodPreperationTime: {
      type: Sequelize.SMALLINT,
      allowNull: false
    },

    foodImagePath: {
      type: Sequelize.STRING,
      allowNull: false
    },

    foodCal: {
      type: Sequelize.SMALLINT,
      allowNull: false
    },

    foodOnSale: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }

  }
);

Categories.hasMany(Foods, { foreignKey: 'categoryID', allowNull: false });
Foods.belongsTo(Categories, { foreignKey: 'categoryID', allowNull: false });

Foods.belongsToMany(Ingredients, { through: "tblFoodIngredients", allowNull: false });
Ingredients.belongsToMany(Foods, { through: "tblFoodIngredients", allowNull: false });

Foods.belongsToMany(Extras, { through: "tblFoodExtras", allowNull: false });
Extras.belongsToMany(Foods, { through: "tblFoodExtras", allowNull: false });

export default Foods