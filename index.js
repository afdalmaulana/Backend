const mysql = require("mysql2")

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'expense_tracker',
    port: 3306
})

db.connect((err) => {
    if(err) console.log(err)
    else console.log("db connected")
})

// const queryString = 'insert into expense(notes, payment, subcategory) values("Uang Jajan", 10000, "Bayar Harian")';
const queryString = 'select * from expense';

db.query(queryString, (err, result) => {
    if(err) return console.log(err)
    else console.log(result)
})