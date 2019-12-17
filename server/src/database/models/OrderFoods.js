import db from "../connection"
import Sequelize from "sequelize"
import Orders from './Orders'
import Foods from './Foods'

const OrderFoods = db.define(
  "tblOrderFoods",
  {
    foodCount: {
      type: Sequelize.SMALLINT,
      allowNull: false
    },
  },
  {
    freezeTableName: true
  }
);

Orders.belongsToMany(Foods, { through: OrderFoods, sourceKey: 'orderID' });
Foods.belongsToMany(Orders, { through: OrderFoods, sourceKey: 'foodID' });