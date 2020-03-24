import db from "../connection"
import Sequelize from "sequelize"

const CategoryNames = db.define(
  "tblCategoryNames",
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
    timestamps: false
  }
);

export default CategoryNames