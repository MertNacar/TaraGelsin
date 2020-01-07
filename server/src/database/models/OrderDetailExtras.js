import db from "../connection"
import Sequelize from "sequelize"
import Extras from './Extras'
import OrderDetails from './OrderDetails'

const OrderDetailExtras = db.define(
  "tblOrderDetailExtras",
  {

  },
  {
    timestamps: false
  }
);

Extras.belongsToMany(OrderDetails, { through: "tblOrderDetailExtras", foreignKey: 'extraID', otherKey: 'orderDetailID' });
OrderDetails.belongsToMany(Extras, { through: "tblOrderDetailExtras", foreignKey: 'orderDetailID', otherKey: 'extraID' });

export default OrderDetailExtras