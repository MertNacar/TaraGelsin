import db from "../connection"
import Sequelize from "sequelize"

const Extras = db.define(
  "tblExtras",
  {
    extraID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    extraName: {
      type: Sequelize.STRING,
      allowNull: false
    },

    extraCost: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
  },
  {
    timestamps: false
  }
);

export default Extras