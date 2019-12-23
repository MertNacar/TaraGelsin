import db from "../connection"
import Sequelize from "sequelize"
import Orders from './Orders'
import Foods from './Foods'

const OrderFoods = db.define(
  "tblOrderFoods",
  {
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

Orders.belongsToMany(Foods, { through: "tblOrderFoods", foreignKey: 'orderID', otherKey: 'foodID' });
Foods.belongsToMany(Orders, { through: "tblOrderFoods", foreignKey: 'foodID', otherKey: 'orderID' });

export default OrderFoods