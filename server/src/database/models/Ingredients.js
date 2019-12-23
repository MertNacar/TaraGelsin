import db from "../connection"
import Sequelize from "sequelize"

const Ingredients = db.define(
  "tblIngredients",
  {
    ingredientID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    ingredientName: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  {
    timestamps: false
  }
);

export default Ingredients