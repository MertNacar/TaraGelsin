import db from "../connection"
import Branches from './Branches'
import Sections from './Sections'
import Tables from './Tables'

const BranchSectionTables = db.define(
  "tblBranchSectionTables",
  {}
);

BranchSectionTables.removeAttribute('id');

Branches.hasMany(BranchSectionTables, { foreignKey: { name: "branchID", primaryKey: true }, allowNull: false });
BranchSectionTables.belongsTo(Branches, { foreignKey: { name: "branchID", primaryKey: true }, allowNull: false });

Sections.hasMany(BranchSectionTables, { foreignKey: { name: "sectionID", primaryKey: true }, allowNull: false });
BranchSectionTables.belongsTo(Sections, { foreignKey: { name: "sectionID", primaryKey: true }, allowNull: false });

Tables.hasMany(BranchSectionTables, { foreignKey: { name: "tableID", primaryKey: true }, allowNull: false });
BranchSectionTables.belongsTo(Tables, { foreignKey: { name: "tableID", primaryKey: true }, allowNull: false });

export default BranchSectionTables