import db from "../connection"
import Sequelize from "sequelize"
import Orders from './Orders'
import Foods from './Foods'

const OrderDetails = db.define(
  "OrderDetails",
  {
    orderDetailID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    cost: {
      type: Sequelize.DECIMAL(8, 2),
      allowNull: false
    },

    quantity: {
      type: Sequelize.SMALLINT,
      allowNull: false
    }
  },
  {
    tableName: "tblOrderDetails"
  }
);

Orders.belongsToMany(Foods, { through: OrderDetails, foreignKey: 'orderID', otherKey: 'foodID' });
Foods.belongsToMany(Orders, { through: OrderDetails, foreignKey: 'foodID', otherKey: 'orderID' });

export default OrderDetails