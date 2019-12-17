import db from "../connection"
import Sequelize from "sequelize"
import Cafes from './Cafes'
export default Tables = db.define(
  "tblTables",
  {
    tableID: {
      primaryKey: true,
      type: Sequelize.UUIDV4
    },

    tableName: {
      type: Sequelize.STRING,
      allowNull: false
    },

    qrCodeImage: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);

Cafes.hasMany(Tables, { foreignKey: 'cafeID' });
Tables.belongsTo(Cafes, { foreignKey: 'cafeID' });
