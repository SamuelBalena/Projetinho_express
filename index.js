// Importando as Bibliotecas
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");

// Database
connection
    .authenticate() // Vai autenticar com o banco
    .then(()=>{ // Se o banco for conectado
        console.log("Conexão feita com o banco");
    })
    .catch((msgErro)=>{ // Se o banco não for conectado
        console.log(msgErro);
    });

// Estou dizendo para o Express usar o EJS como View Engine
app.set('view engine','ejs');
app.use(express.static('public'));

// Body-Parser
app.use(bodyParser.urlencoded({extended: false})) // Este comando que traduz o dados do formulário em js
app.use(bodyParser.json()); // Este comando permite ler dados enviados no formato json

// Rotas
app.get("/",(req,res)=>{
    Pergunta.findAll({ raw: true, order :[
        ["id","DESC"]
    ]}).then(pergunta =>{ // Traz os dados do banco de dados 
        res.render("index",{ // Mostra os dados no Front-end
            pergunta: pergunta
        });
    })
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res)=>{
    // Dados do Formulário
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    //Salvando no banco de Dados
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/");
    })
})

app.get("/pergunta/:id",(req,res) =>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if(pergunta != undefined){
            res.render("pergunta",{
                pergunta: pergunta
            });
        }else{
            res.render("/")
        }
    });
});

app.listen(4000,()=>{console.log("Servidor está rodando!")});