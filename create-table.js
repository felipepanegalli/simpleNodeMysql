const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '',
    user: 'root',
    password: '123456',
    database: 'nodemysql'
});

/** Função que realiza o teste de conexão */
connection.connect(function(err){
    if(err) return console.log(err);
    console.log('Conectado');
    createTable(connection);
    addRows(connection);
});

/** Função que cria uma tabela se a mesma não existir */
function createTable(conn){
    const sql = "CREATE TABLE IF NOT EXISTS Cliente (\n"+
                "ID int not null AUTO_INCREMENT, \n"+
                "Nome varchar (150) NOT NULL, \n"+
                "CPF char(11) NOT NULL, \n"+
                "PRIMARY KEY (ID)\n"+
                ");";
    conn.query(sql, function(error, results, fields){
        if(error) return console.log(error);
        console.log('Tabela criada');
    });
}

/** Função geradora de dados MySql */
function addRows(conn){
    const sql = "INSERT INTO Cliente(Nome,CPF) VALUES ?";
    const values = [
        ['reg1', '12345678901'],
        ['reg2', '68642846824'],
        ['reg3', '06540313532'],
        ['reg4', '19861108444'],
        ['reg5', '63548740661']
    ];
    conn.query(sql, [values], function(error, results, fields){
        if(error) return console.log(error);
        console.log('Registros adicionados');
        conn.end();
    });
}


