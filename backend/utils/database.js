const Sequelize = require('sequelize')

const sequelize = new Sequelize("library_db", "my_user", "root", {
    dialect: "postgres",
    host: "localhost"
})

module.exports = sequelize