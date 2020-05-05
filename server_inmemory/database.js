const sqlite3 = require('sqlite3').verbose();
exports.getConnection = function(){
    return new sqlite3.Database('./restaurant');
}