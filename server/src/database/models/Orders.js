import db from "../connection"
import Sequelize from "sequelize"
import Users from './Users'
import Tables from './Tables'
import PaymentMethods from './PaymentMethods'

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
      allowNull: false
    },

    orderCost: {
      type: Sequelize.DECIMAL(12, 4),
      allowNull: false
    },

    orderPoint: Sequelize.DECIMAL(2, 1),

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

Users.hasMany(Orders, { foreignKey: 'userID', allowNull: false });
Orders.belongsTo(Users, { foreignKey: 'userID', allowNull: false });

Tables.hasMany(Orders, { foreignKey: 'tableID', allowNull: false });
Orders.belongsTo(Tables, { foreignKey: 'tableID', allowNull: false });

PaymentMethods.hasMany(Orders, { foreignKey: 'methodID', allowNull: false });
Orders.belongsTo(PaymentMethods, { foreignKey: 'methodID', allowNull: false });

export default Orders