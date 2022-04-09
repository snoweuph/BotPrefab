import mysql from 'mysql2/promise';
/**
 * @returns The connection to the database.
 */
export default mysql.createConnection({
	host: process.env.DISCORD_BOT_DB_HOST ? process.env.DISCORD_BOT_DB_HOST : 'localhost',
	port: +process.env.DISCORD_BOT_DB_PORT ? +process.env.DISCORD_BOT_DB_PORT : 3306,
	user: process.env.DISCORD_BOT_DB_USER ? process.env.DISCORD_BOT_DB_USER : 'root',
	password: process.env.DISCORD_BOT_DB_PASS ? process.env.DISCORD_BOT_DB_PASS : '',
	database: process.env.DISCORD_BOT_DB_NAME ? process.env.DISCORD_BOT_DB_NAME : 'discord_bot'
});
