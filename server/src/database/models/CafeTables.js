import db from "../connection"
import Sequelize from "sequelize"
import Cafes from './Cafes'
import Tables from './Tables'

const CafeTables = db.define(
  "tblCafeTables",
  {}
);

Cafes.belongsToMany(Tables, { through: CafeTables, foreignKey: 'cafeID', otherKey: 'tableID' });
Tables.belongsToMany(Cafes, { through: CafeTables, foreignKey: 'tableID', otherKey: 'cafeID' });

export default CafeTables