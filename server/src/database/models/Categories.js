import db from "../connection"
import Sequelize from "sequelize"
import Cafes from './Cafes'

export default Categories = db.define(
    "tblCategories",
    {
        categoryID: {
            primaryKey: true,
            type: Sequelize.UUIDV4
        },

        categoryName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        categoryImage: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true
    }
);

Cafes.hasMany(Categories, { foreignKey: 'cafeID' });
Categories.belongsTo(Cafes, { foreignKey: 'cafeID' });
