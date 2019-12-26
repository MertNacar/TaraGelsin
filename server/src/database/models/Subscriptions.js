import db from "../connection"
import Sequelize from "sequelize"

const Subscriptions = db.define(
  "tblSubscriptions",
  {
    subscriptionID: {
      primaryKey: true,
      type: Sequelize.SMALLINT
    },

    subscriptionName: {
      type: Sequelize.STRING,
      allowNull: false
    },

    subscriptionPriceYear: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false
    },
  },
  {
    timestamps: false
  }
);

export default Subscriptions