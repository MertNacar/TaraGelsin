import db from "../connection"
import Sequelize from "sequelize"

const CategoryNames = db.define(
  "CategoryNames",
  {
    categoryNameID: {
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
    tableName: "tblCategoryNames"
  }
);

export default CategoryNames