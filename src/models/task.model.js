// src/models/task.model.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // A Task is assigned to a User (assignee)
      Task.belongsTo(models.User, {
        foreignKey: 'assignedTo',
        as: 'assignee',
      });

      // A Task is created by a User
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'creator',
      });
    }
  }

  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      status: {
        type: DataTypes.ENUM('pending', 'in progress', 'completed'),
        defaultValue: 'pending',
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      assignedTo: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'Tasks',
      timestamps: true,
    }
  );

  return Task;
};
