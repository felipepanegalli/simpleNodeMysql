const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão do express
const mysql = require('mysql');

//Configuração do BodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Criação de um roteador
const router = express.Router();
router.get('/', (req, res) => res.json({message: 'Funcionando!'}));
app.use('/', router);

//Inicia o servidor
app.listen(port);
console.log('API funcionando');

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        port: '',
        user: 'root',
        password: '123456',
        database: 'nodemysql'
    });
    
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
        res.json(error);
        else
        res.json(results);
        connection.end();
        console.log('executou!');
    });
}

//Rotas
//Router para clientes
router.get('/clientes', (req, res) =>{
    execSQLQuery('SELECT * FROM Cliente', res);
});
//Router clientes by id
router.get('/clientes/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE ID=?' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Cliente' + filter, res);
});
//Router Deleta o cliente
router.delete('/clientes/:id', (req, res) =>{
    execSQLQuery('DELETE FROM Cliente WHERE ID=?' + parseInt(req.params.id), res);
});
//Router de adicionar cliente
router.post('/clientes', (req, res) =>{
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    execSQLQuery(`INSERT INTO Cliente(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
});
//Rota para atualização do cliente
router.patch('/clientes/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    execSQLQuery(`UPDATE Cliente SET Nome='${nome}', CPF='${cpf}' WHERE ID=${id}`, res);
})