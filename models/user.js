'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      // validate: {
      //   len: {
      //     args: [7, 42],
      //     msg: "The password length should be between 7 and 42 characters."
      //   }
      // }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        }
      }
    },
    date: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = models => {
    User.belongsTo(models.Task, {
      foreignKey: { name: 'TaskId', allowNull: true },
      onDelete: 'RESTRICT',
    })
  }
  User.beforeUpdate((user, options) => {
    user.dataValues.first_name = "Manukyan"
    user.dataValues.date = new Date()

    //  console.log(user.dataValues,'pppppppppppppppppppppp');
  });
  return User;
};