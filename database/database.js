const Sequelize = require("sequelize");

const connection = new Sequelize("guiaperguntas","root","sasa2008",{
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;