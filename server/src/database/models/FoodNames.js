import db from "../connection"
import Sequelize from "sequelize"

const FoodNames = db.define(
  "FoodNames",
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
    tableName: "tblFoodNames"
  }
);

export default FoodNames