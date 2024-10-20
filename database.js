const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');


const db = mysql.createConnection({
    host: 'localhost',      
    user: 'root',           
    password: '',           
    database: 'company',    
    port: 3306              
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));


app.post('/employee', (req, res) => {
    const { emp_id, emp_name, dept_id, hire_date } = req.body;
    const query = 'INSERT INTO Employee (emp_id, emp_name, dept_id, hire_date) VALUES (?, ?, ?, ?)';
    db.query(query, [emp_id, emp_name, dept_id, hire_date], (err) => {
        if (err) throw err;
        res.json({ message: 'Employee added successfully' });
    });
});


app.put('/employee/:emp_id', (req, res) => {
    const { emp_name } = req.body;
    const query = 'UPDATE Employee SET emp_name = ? WHERE emp_id = ?';
    db.query(query, [emp_name, req.params.emp_id], (err) => {
        if (err) throw err;
        res.json({ message: 'Employee updated successfully' });
    });
});


app.delete('/employee/:emp_id', (req, res) => {
    const query = 'DELETE FROM Employee WHERE emp_id = ?';
    db.query(query, [req.params.emp_id], (err) => {
        if (err) throw err;
        res.json({ message: 'Employee deleted successfully' });
    });
});


app.get('/employee/:emp_id', (req, res) => {
    const query = 'SELECT * FROM Employee WHERE emp_id = ?';
    db.query(query, [req.params.emp_id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json({ employee: result[0] });
        } else {
            res.json({ message: 'Employee not found' });
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
