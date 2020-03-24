import db from "../connection"
import Sequelize from "sequelize"

const FoodNames = db.define(
  "tblFoodNames",
  {
    foodNameID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

export default FoodNames