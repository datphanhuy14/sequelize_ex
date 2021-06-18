'use strict';
// const {
//   Model
// } = require('sequelize');
//   class user extends Model { //Khai báo class rồi lại bọc trong 1 function ???????
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     // static associate(models) {
//     //   // define association here
//     // }
//   };
//   user.init({
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//   }, {
//     sequelize,
//     modelName: 'user',
//   });

module.exports = (sequelize, DataTypes)=>{
    let user = sequelize.define('user', {
        id : {
            type : DataTypes.BIGINT,
            autoIncrement : true,
            primaryKey : true
        },
        email: {
            type: DataTypes.STRING
        },
        password: DataTypes.STRING
    })
    //Khai bao quan he rang buoc
    // user.associate = (models) => {
    //     user.hasMany()
    // }
    return user;
}