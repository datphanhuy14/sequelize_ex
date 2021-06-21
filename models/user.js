'use strict';


module.exports = (sequelize, DataTypes)=>{
    let user = sequelize.define('user', {
        id : {
            type : DataTypes.BIGINT,
            autoIncrement : true,
            primaryKey : true
        },
        displayName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },

        password: {
        type: DataTypes.STRING
        }
    })
    //Khai bao quan he rang buoc
    // user.associate = (models) => {
    //     user.hasMany()
    // }
    return user;
}