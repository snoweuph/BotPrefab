import mysql from 'mysql2/promise';

export default mysql.createConnection({
    host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
    port: +process.env.DB_PORT ? +process.env.DB_PORT : 3306,
    user: process.env.DB_USER ? process.env.DB_USER : 'root',
    password: process.env.DB_PASS ? process.env.DB_PASS : '',
    database: process.env.DB_NAME ? process.env.DB_NAME : 'discord_bot'
});
