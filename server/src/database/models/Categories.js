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

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    imagePath: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

Cafes.hasMany(Categories, { foreignKey: 'cafeID' });
Categories.belongsTo(Cafes, { foreignKey: 'cafeID' });

export default Categories
