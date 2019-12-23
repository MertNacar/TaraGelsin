import db from "../connection"
import Sequelize from "sequelize"
import Users from './Users'
import Tables from './Tables'

const Orders = db.define(
  "tblOrders",
  {
    orderID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
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

    orderPoint: Sequelize.DECIMAL,

    orderNote: Sequelize.STRING,

    orderCalorie: {
      type: Sequelize.SMALLINT,
      allowNull: false
    },

    discount: {
      type: Sequelize.SMALLINT,
      defaultValue: 0
    }
  }
);

Users.hasMany(Orders, { foreignKey: 'userID' });
Orders.belongsTo(Users, { foreignKey: 'userID' });

Tables.hasMany(Orders, { foreignKey: 'tableID' });
Orders.belongsTo(Tables, { foreignKey: 'tableID' });

export default Orders