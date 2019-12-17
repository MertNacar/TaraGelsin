import db from "../connection"
import Sequelize from "sequelize"

export default Ingredients = db.define(
    "tblIngredients",
    {
        IngredientID: {
            primaryKey: true,
            type: Sequelize.UUIDV4
        },

        IngredientName: {
            type: Sequelize.STRING,
            allowNull: false
        },
    },
    {
        freezeTableName: true
    }
);

