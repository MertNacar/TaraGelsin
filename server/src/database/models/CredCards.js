import db from "../connection"
import Sequelize from "sequelize"

export const CredCards = db.define(
    "tblCredCards",
    {
        cardID: {
            primaryKey: true,
            type: Sequelize.UUIDV4
        },

        cardName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        cardNumber: {
            type: Sequelize.STRING,
            allowNull: false
        },

        cardCvv: {
            type: Sequelize.CHAR,
            allowNull: false
        },

        cardDate: {
            type: Sequelize.CHAR,
            allowNull: false
        },
    },
    {
        freezeTableName: true
    }
);

Orders.hasMany(CredCards, { foreignKey: 'orderID' });
CredCards.belongsTo(Orders, { foreignKey: 'countryCode' });