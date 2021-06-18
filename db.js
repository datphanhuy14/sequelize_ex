'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];
const db = {};
// console.log(JSON.stringify(config,2,2));
//Tạo 1 instant Sequelize mới và gán vào biến.
let sequelize = new Sequelize(config.database, config.username, config.password, config.options);
//chua cần phải set theo biến môi trường ( production, development, ...)

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }
// console.log(2222222222,sequelize);
fs
  .readdirSync(path.join(__dirname, './models'))
    // ko cần filter vì mình sẽ quy định trong folder này toàn bộ là lưu models
  // .filter(file => {
  //   return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  // })
  .forEach(file => {
    const model = require(path.join(__dirname,'./models', file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op; //Cái này dùng để đưa các điều kiện vào câu truy vấn của sequelize
module.exports = db;
