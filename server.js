const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'codingbootcamp',
        database: 'company_db'
    },
    console.log(`Connected to the classlist_db database.`)
);

// // Query database
// db.query('SELECT * FROM students', function (err, results) {
//     console.log(results);
//   });


app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
