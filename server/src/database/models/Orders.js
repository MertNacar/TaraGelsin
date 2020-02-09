import db from "../connection"
import Sequelize from "sequelize"
import Users from './Users'
import Cafes from './Cafes'
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
      type: Sequelize.ENUM('-1', '0', '1', '2'),
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

    orderNote: Sequelize.STRING(120),

    orderComment: Sequelize.STRING(120),

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

Cafes.hasMany(Orders, { foreignKey: 'cafeID', allowNull: false });
Orders.belongsTo(Cafes, { foreignKey: 'cafeID', allowNull: false });

PaymentMethods.hasMany(Orders, { foreignKey: 'methodID', allowNull: false });
Orders.belongsTo(PaymentMethods, { foreignKey: 'methodID', allowNull: false });

export default Orders