import db from "../connection"
import Sequelize from "sequelize"
import CredCards from './CredCards'
import Users from './Users'
import Cafes from './Cafes'
import Tables from './Tables'

export default Orders = db.define(
  "tblOrders",
  {
    orderID: {
      primaryKey: true,
      type: Sequelize.UUIDV4
    },

    orderStatus: {
      type: Sequelize.ENUM('0', '1', '2'),
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

    orderNote: Sequelize.STRING,

    orderCal: {
      type: Sequelize.SMALLINT,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);

CredCards.hasMany(Orders, { foreignKey: 'cardID' });
Orders.belongsTo(CredCards, { foreignKey: 'cardID' });

Users.hasMany(Orders, { foreignKey: 'userID' });
Orders.belongsTo(Users, { foreignKey: 'userID' });

Cafes.hasMany(Orders, { foreignKey: 'cafeID' });
Orders.belongsTo(Cafes, { foreignKey: 'cafeID' });

Tables.hasMany(Orders, { foreignKey: 'tableID' });
Orders.belongsTo(Tables, { foreignKey: 'tableID' });