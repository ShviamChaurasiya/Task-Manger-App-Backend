const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user.model')(sequelize, DataTypes);
db.Task = require('./task.model')(sequelize, DataTypes);

// Associations
db.User.hasMany(db.Task, { foreignKey: 'userId', as: 'createdTasks' });
db.Task.belongsTo(db.User, { foreignKey: 'userId', as: 'creator' });

db.User.hasMany(db.Task, { foreignKey: 'assignedTo', as: 'assignedTasks' });
db.Task.belongsTo(db.User, { foreignKey: 'assignedTo', as: 'assignee' });

module.exports = db;
