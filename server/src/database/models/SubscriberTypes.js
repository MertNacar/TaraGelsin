import db from "../connection"
import Sequelize from "sequelize"

const SubscriberTypes = db.define(
  "tblSubscriberTypes",
  {
    subscriberTypeID: {
      primaryKey: true,
      type: Sequelize.SMALLINT
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  {
    timestamps: false
  }
);

export default SubscriberTypes