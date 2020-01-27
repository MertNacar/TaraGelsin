import db from "../connection"
import Sequelize from "sequelize"
import Orders from './Orders'
import Foods from './Foods'

const OrderDetails = db.define(
  "tblOrderDetails",
  {
    orderDetailID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    foodQuantity: {
      type: Sequelize.SMALLINT,
      allowNull: false
    },

    foodDiscount: {
      type: Sequelize.SMALLINT,
      allowNull: false
    },

  },
  {
    timestamps: false
  }
);

Orders.belongsToMany(Foods, { through: OrderDetails, foreignKey: 'orderID', otherKey: 'foodID' });
Foods.belongsToMany(Orders, { through: OrderDetails, foreignKey: 'foodID', otherKey: 'orderID' });

export default OrderDetails