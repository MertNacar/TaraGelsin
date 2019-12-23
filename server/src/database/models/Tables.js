import db from "../connection"
import Sequelize from "sequelize"
import Cafes from './Cafes'

const Tables = db.define(
  "tblTables",
  {
    tableID: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },

    tableName: {
      type: Sequelize.STRING,
      allowNull: false
    },

    qrCodeImagePath: {
      type: Sequelize.STRING,
      allowNull: false
    },

    qrCodeImageString: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
);

Cafes.hasMany(Tables, { foreignKey: 'cafeID' });
Tables.belongsTo(Cafes, { foreignKey: 'cafeID' });

export default Tables
