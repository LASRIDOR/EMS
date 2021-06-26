const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('server/repo/issta.db');

const tableCheckQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='employees';`;
const createTableQuery = `CREATE TABLE IF NOT EXISTS employees(
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  fullName VARCHAR(20) NOT NULL, 
  phoneNumber VARCHAR(20) NOT NULL, 
  type VARCHAR(20) NOT NULL, 
  startDate VARCHAR(20) NULL, 
  daysInMonth VARCHAR(20) NOT NULL, 
  currentMonthSalary VARCHAR(20) NULL, 
  mailAddres VARCHAR(20) NULL, 
  gender VARCHAR(6) NULL);`;
 const insertQuery = `INSERT INTO employees (fullName, phoneNumber, type, startDate, daysInMonth, currentMonthSalary, mailAddres, gender) VALUES (?,?,?,?,?,?,?,?);`;

db.all(tableCheckQuery, function(err, rows) {
  if (err) {
    console.error(err.message);
    throw err;
  }
  console.log('Length of rows is: ', rows.length);
  if (!rows.length) {
    db.run(createTableQuery);
    console.log("'Employees' table is Successfully created.");
     
  } else {

     db.run(insertQuery, [
      "Dor Lasri",
      "0508912345",
      "Manager",
      "10/10/2020",
      "30",
      "5000",
      "lasridor@gmail.com",
      "M"
     ]);
  }
});

module.exports = db;
