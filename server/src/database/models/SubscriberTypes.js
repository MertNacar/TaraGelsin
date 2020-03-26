import db from "../connection"
import Sequelize from "sequelize"

const SubscriberTypes = db.define(
  "SubscriberTypes",
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
    tableName: "tblSubscriberTypes"
  }
);

export default SubscriberTypes