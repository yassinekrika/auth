import mysql from 'mysql'

const db =  mysql.createConnection({
    host: "localhost",
    user: "yassg4mer",
    password: "1234567890",
    database: "tp-mii"
})

export default db