const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo'
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    const query = 'INSERT INTO tasks (title) VALUES (?)';
    db.query(query, [title], (err, result) => {
      if (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ error: 'Error creating task' });
        return;
      }
      res.status(201).json({ id: result.insertId, title });
    });
  });
  
  
  app.get('/api/tasks', (req, res) => {
    const query = 'SELECT * FROM tasks';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Error fetching tasks' });
        return;
      }
      res.json(results);
    });
  });
  
