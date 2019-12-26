import db from "../connection"
import Sequelize from "sequelize"

const PaymentMethods = db.define(
  "tblPaymentMethods",
  {
    methodID: {
      primaryKey: true,
      type: Sequelize.SMALLINT
    },

    methodName: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

export default PaymentMethods