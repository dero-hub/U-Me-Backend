const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('U_&_Me_butchery', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: '',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

 db.user = require('../models/user')(sequelize, Sequelize);
 db.roles = require('../models/user.roles')(sequelize, Sequelize);
 db.permission = require('../models/user.permissions')(sequelize, Sequelize);
//  db.transactions = require('../models/transactions.js')(sequelize, Sequelize);

db.user.belongsToMany(db.roles, {
  through: 'User_roles',
  foreignKey: 'userid', 
  otherKey: 'roleid'
});

db.roles.belongsToMany(db.user, {
  through: 'User_roles',
  foreignKey: 'roleid', 
  otherKey: 'userid'
});

db.roles.belongsToMany(db.permission, {
  through: 'role_permission',
  foreignKey: 'roleid',
  otherKey: 'permissionid'
});

db.user.belongsToMany(db.permission, {
  through: 'role_permission',
  foreignKey: 'userid', 
  otherKey: 'roleid'
});

db.permission.belongsToMany(db.user, {
  through: 'role_permission',
  foreignKey: null,
  otherKey: 'roleid'
});

db.permission.belongsToMany(db.roles, {
  through: 'role_permission',
  foreignKey: 'permissionid',
  otherKey: 'roleid'
});

db.ROLE = [ 'admin', 'staff', 'superAdmin'];
db.PERMISSIONS = [ 'create', 'view', 'update', 'delete'];

module.exports = db;