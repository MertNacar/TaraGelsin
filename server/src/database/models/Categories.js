import db from "../connection"
import Sequelize from "sequelize"
import Cafes from './Cafes'

const Categories = db.define(
  "tblCategories",
  {
    categoryID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    categoryName: {
      type: Sequelize.STRING,
      allowNull: false
    },

    categoryImagePath: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

Cafes.hasMany(Categories, { foreignKey: 'cafeID', allowNull: false });
Categories.belongsTo(Cafes, { foreignKey: 'cafeID', allowNull: false });

export default Categories
