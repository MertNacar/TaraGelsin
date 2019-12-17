import db from "../connection"
import Sequelize from "sequelize"
import CredCards from './CredCards'
import Users from './Users'

export default Orders = db.define(
    "tblOrders",
    {
        orderID: {
            primaryKey: true,
            type: Sequelize.UUIDV4
        },

        cafeName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        tableName: {
            type: Sequelize.STRING,
            allowNull: false
        },

        orderStatus: {
            type: Sequelize.CHAR,
            defaultValue: '0'
        },

        paymentStatus: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },

        orderCost: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },

        orderCal: {
            type: Sequelize.SMALLINT,
            allowNull: false
        },

        orderNote: Sequelize.STRING
    },
    {
        freezeTableName: true
    }
);

CredCards.hasMany(Orders, { foreignKey: 'cardID' });
Orders.belongsTo(CredCards, { foreignKey: 'cardID' });

Users.hasMany(Orders, { foreignKey: 'userID' });
Orders.belongsTo(Users, { foreignKey: 'userID' });