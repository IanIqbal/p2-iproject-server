'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/bcryptjs');
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
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:{
        msg:`Email is already used`
      },
      validate:{
        notEmpty:{
          msg:"Email is required"
        },
        notNull:{
          msg:"Email is required"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Password is required"
        },
        notNull:{
          msg:"Password is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });


  User.beforeCreate((user)=>{
    user.password = hash(user.password)
  })
  return User;
};