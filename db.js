/**
 * Created by av on 12/7/17.
 */

const sequelize = require('sequelize');


const db = new sequelize('todolist', 'todolistuser', 'todo123456',{
    host: 'localhost',
    dialect: 'mysql'
});

const Todos = db.define('todos',{
    id:{
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    task: sequelize.DataTypes.STRING,
    done: sequelize.DataTypes.BOOLEAN
});


db.sync({alter:true}).then(function () {
    console.log("Database is ready");
});

module.exports = {
    Todos
};