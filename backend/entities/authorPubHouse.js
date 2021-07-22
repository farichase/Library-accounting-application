const {DataTypes} = require("sequelize")
const Sequelize = require('../utils/database')

const AuthorPubHouse = Sequelize.define("authorpubhouse", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    }
})

module.exports = AuthorPubHouse