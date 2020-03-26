import db from "../connection"
import Sequelize from "sequelize"

const Plans = db.define(
  "Plans",
  {
    planID: {
      primaryKey: true,
      type: Sequelize.SMALLINT
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false
    },

    priceMonth: {
      type: Sequelize.DECIMAL(7, 2),
      allowNull: false
    },

    priceYear: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false
    },
  },
  {
    tableName: "tblPlans"
  }
);

export default Plans