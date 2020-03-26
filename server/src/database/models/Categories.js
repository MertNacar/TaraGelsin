import db from "../connection"
import Sequelize from "sequelize"
import Cafes from './Cafes'
import CategoryNames from './CategoryNames'

const Categories = db.define(
  "Categories",
  {
    categoryID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    imagePath: {
      type: Sequelize.STRING,
      allowNull: false
    },

    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  },
  {
    tableName: "tblCategories"
  }
);

CategoryNames.hasMany(Categories, { foreignKey: 'categoryNameID', allowNull: false });
Categories.belongsTo(CategoryNames, { foreignKey: 'categoryNameID', allowNull: false });

Cafes.hasMany(Categories, { foreignKey: 'cafeID', allowNull: false });
Categories.belongsTo(Cafes, { foreignKey: 'cafeID', allowNull: false });

export default Categories
