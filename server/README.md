### Restaurants
A web application based on Node.js and Angular to search for restaurants and cuisines.
#    

### Tools and Technologies
1. Node: **13.6.0**
2. Angular: **8.3.22**
3. Ionic: **5.4.15**
4. MySQL: **10.1.44**
5. SQLite: **3.31.1**
6. Ubuntu: **18.04.3 LTS**
# 

Please make sure you have the above mentioned softwares with the specified versions, though not strictly required.
#

### How to run?
1. Create a user in the mysql database using the following commands:
```
CREATE USER '<username>'@'%' IDENTIFIED BY '<password>';
GRANT ALL PRIVILEGES ON *.* TO '<username>'@'%';
```
2. Create a database using the following command:
```
CREATE DATABASE <database_name>;
```
3. Import the sql file from **server > db_scripts > restaurant.sql** into the database that you created in the 2nd step.

4. Open the **server > database.js** file and change the username, password and database_name that you created in the 1st and 2nd step.
```
var mysql = require('mysql');
var connection = mysql.createPool({
  connectionLimit: 100,

  host:'localhost',
  user:'<username>',
  password:'<password>',
  database:'<database_name>',

  port: 3306,
  debug: false,
  multipleStatements: true,
  queueLimit: 10000,
  acquireTimeout: 10000
});
module.exports.connection = connection;
```
5. Save the file and open the **server** directory in the terminal
6. Run the following commands
```
npm install
npm start
```
7. Now you’ll see something like **Server started: http://localhost:9500**
8. Change the port if required in the **server > config.json** file.

```
{
  "HOST":"http://localhost",
  "PORT": 9500
}
```    
9. Open the url mentioned in the console.
