const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define("pergunta",{ // Criação da tabela no banco de dados
    titulo:{
        type: Sequelize.STRING, // Tipo do campo
        allowNull: false // Não aceita valores nulos na tabela
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(()=>{ // Sincroniza essa tabela com o banco de dados
    console.log("Tabela criada!")
})

module.exports = Pergunta;