import db from "../connection"
import Sequelize from "sequelize"
import Cafes from './Cafes'
import Tables from './Tables'

const CafeTables = db.define(
  "tblCafeTables",
  {
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

Cafes.belongsToMany(Tables, { through: "tblCafeTables", foreignKey: 'cafeID', otherKey: 'tableID' });
Tables.belongsToMany(Cafes, { through: "tblCafeTables", foreignKey: 'tableID', otherKey: 'cafeID' });

export default CafeTables