import db from "../connection"
import Sequelize from "sequelize"

const CafeOwners = db.define(
  "tblCafeOwners",
  {
    cafeOwnerID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    fullname: {
      type: Sequelize.STRING,
      allowNull: false
    },

    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

export default CafeOwners