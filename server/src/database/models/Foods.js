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

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    foodCost: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },

    foodPreperationTime: {
      type: Sequelize.SMALLINT,
      allowNull: false
    },

    foodDescription: Sequelize.STRING,

    isNewFood: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },

    imagePath: {
      type: Sequelize.STRING,
      allowNull: false
    },

    foodCal: {
      type: Sequelize.SMALLINT,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

Categories.hasMany(Foods, { foreignKey: 'categoryID' });
Foods.belongsTo(Categories, { foreignKey: 'categoryID' });

Foods.belongsToMany(Ingredients, { through: "tblFoodIngredients" });
Ingredients.belongsToMany(Foods, { through: "tblFoodIngredients" });

Foods.belongsToMany(Extras, { through: "tblFoodExtras" });
Extras.belongsToMany(Foods, { through: "tblFoodExtras" });

export default Foods