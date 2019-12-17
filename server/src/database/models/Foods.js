import db from "../connection"
import Sequelize from "sequelize"
import Categories from './Categories'

export default Foods = db.define(
    "tblFoods",
    {
        foodID: {
            primaryKey: true,
            type: Sequelize.UUIDV4
        },

        foodName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        foodCost: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },

        foodImage: {
            type: Sequelize.STRING,
            allowNull: false
        },

        foodCal: {
            type: Sequelize.SMALLINT,
            allowNull: false
        }
    },
    {
        freezeTableName: true
    }
);

Categories.hasMany(Foods, { foreignKey: 'categoryID' });
Foods.belongsTo(Categories, { foreignKey: 'categoryID' });
