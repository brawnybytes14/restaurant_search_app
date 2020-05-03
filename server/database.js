var mysql = require('mysql');
var connection = mysql.createPool({
 connectionLimit: 100,
 
 host:'localhost',
 user:'rohit',
 password:'manipal123',
 database:'restaurant',

 port: 3306,
 debug: false,
 multipleStatements: true,
 queueLimit: 10000,
 acquireTimeout: 10000
});
module.exports.connection = connection;
