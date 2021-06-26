/* eslint-disable consistent-return */
const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
// const employees = require('./data/employees.json');
const db = require('./database.js');

const corsOptions = {
  origin: 'https://ems-v1.herokuapp.com/',
  optionsSuccessStatus: 200,
};

// Adding BodyParser to parse the body of POST requests.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://ems-v1.herokuapp.com/');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// ROOT ENDPOINT
app.get('/', (req, res, next) => {
  res.json({ message: 'Ok' });
});

// GET ALL EMPLOYEES
app.get('/api/employees', cors(corsOptions), (req, res, next) => {
  const query = 'SELECT * FROM employees;';
  const params = [];
  return db.all(query, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200);
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

// GET ONE EMPLOYEE BY ID
app.get('/api/employees/:id', cors(corsOptions), (req, res, next) => {
  const query = `SELECT * FROM employees WHERE id = ?;`;
  const params = [req.params.id];
  return db.each(query, params, (err, row) => {
    if (err) {
      res.status(400).json({ status: 'bad', error: err });
      return;
    }
    res.status(200);
    res.json({
      message: 'success',
      data: row,
    });
  });
});

// CREATE NEW EMPLOYEE
// For code and assigned, they will be updated by admin on admin page in the future
// Code has a pattern, so logic for it will be added here in the future
app.post('/api/add/employees', cors(corsOptions), (req, res, next) => {
  const data = req.body;
  const errors = [];

  if (!data.fullName) {
    errors.push('No name specified');
  }

  if (!data.phoneNumber) {
    errors.push('No Phone Number specified');
  }

  if (!data.type) {
    errors.push('No type specified');
  }

  if (!data.currentMonthSalary) {
    errors.push('No Current Month Salary specified');
  }

  const query = `INSERT INTO employees (fullName, phoneNumber, type, startDate, daysInMonth, currentMonthSalary, mailAddres, gender) VALUES (?,?,?,?,?,?,?,?);`;

  const params = [
    data.fullName,
    data.phoneNumber,
    data.type,
    data.startDate,
    data.daysInMonth,
    data.currentMonthSalary,
    data.mailAddres,
    data.gender,
  ];

  return db.run(query, params, function(err, result) {
    if (err) {
      res.status(400).json({ status: 'bad', error: err });
      return;
    }
    res.status(200);
    res.json({
      message: 'success',
      data: data,
      id: this.lastID,
    });
  });
});

// EDIT EMPLOYEE by ID
app.patch(
  '/api/edit/employees/:id',
  cors(corsOptions),
  (req, res, next) => {
    const data = {
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      daysInMonth: req.body.daysInMonth,
      type: req.body.type
    };

    const query = `UPDATE employees SET 
    fullName = COALESCE(?, fullName),
    phoneNumber = COALESCE(?, phoneNumber),
    daysInMonth = COALESCE(?, daysInMonth),
    city = COALESCE(?, city), 
    type = COALESCE(?, type),
    WHERE id = ?;`;

    const params = [
      data.fullName,
      data.phoneNumber,
      data.daysInMonth,
      data.type,
    ];

    return db.run(query, params, function(err, result) {
      if (err) {
        res.status(400).json({ status: 'bad', error: err });
        return;
      }
      res.status(200);
      res.json({
        message: 'success',
        data: data,
        changes: this.changes,
      });
    });
  },
);

// DELETE ONE EMPLOYEE BY ID
app.delete('/api/employees/:id', cors(corsOptions), (req, res, next) => {
  const query = `DELETE FROM employees WHERE id = ?;`;
  return db.run(query, req.params.id, (err, row) => {
    if (err) {
      return res.status(400).json({ status: 'bad', error: err });
    }
    res.status(200);
    res.json({ message: 'deleted', changes: this.changes });
  });
});

// SERVER PORT
const HTTP_PORT = process.env.PORT || 8080;

// START SERVER
app.listen(HTTP_PORT, () => {
  console.log(
    'Job Dispatch API running on port %PORT%!'.replace(
      '%PORT%',
      HTTP_PORT,
    ),
  );
});
