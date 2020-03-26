import db from "../connection"
import Branches from './Branches'
import Sections from './Sections'
import Tables from './Tables'
import Cafes from './Cafes'

const CafeBranchSectionTables = db.define(
  "CafeBranchSectionTables",
  {},
  {
    tableName: "tblCafeBranchSectionTables"
  }
);

CafeBranchSectionTables.removeAttribute('id');

Cafes.hasMany(CafeBranchSectionTables, { foreignKey: { name: "cafeID", primaryKey: true }, allowNull: false });
CafeBranchSectionTables.belongsTo(Cafes, { foreignKey: { name: "cafeID", primaryKey: true }, allowNull: false });

Branches.hasMany(CafeBranchSectionTables, { foreignKey: { name: "branchID", primaryKey: true }, allowNull: false });
CafeBranchSectionTables.belongsTo(Branches, { foreignKey: { name: "branchID", primaryKey: true }, allowNull: false });

Sections.hasMany(CafeBranchSectionTables, { foreignKey: { name: "sectionID", primaryKey: true }, allowNull: false });
CafeBranchSectionTables.belongsTo(Sections, { foreignKey: { name: "sectionID", primaryKey: true }, allowNull: false });

Tables.hasMany(CafeBranchSectionTables, { foreignKey: { name: "tableID", primaryKey: true }, allowNull: false });
CafeBranchSectionTables.belongsTo(Tables, { foreignKey: { name: "tableID", primaryKey: true }, allowNull: false });

export default CafeBranchSectionTables