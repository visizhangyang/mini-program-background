const mysql=require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: '****',
    password: '********',
    database: '****'
});
module.exports=connection