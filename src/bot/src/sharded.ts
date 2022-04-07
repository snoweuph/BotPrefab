import discord, { Shard } from 'discord.js';

/* eslint-disable-next-line */
require('dotenv').config();

const manager = new discord.ShardingManager('./src/bot.ts', {
	token: process.env.DISCORD_BOT_TOKEN,
});

manager.on('shardCreate', (shard: Shard) => {
	console.log(`Launched shard ${shard.id}`);
})
manager.spawn();