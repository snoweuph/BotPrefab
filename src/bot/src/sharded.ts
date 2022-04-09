import discord, { Shard } from 'discord.js';

/* eslint-disable-next-line */
require('dotenv').config();

const manager = new discord.ShardingManager('./src/bot.ts', {
	token: process.env.DISCORD_BOT_TOKEN,
	totalShards: 2
});

manager.on('shardCreate', (shard: Shard) => {
	console.log(`[Manager] Launching shard ${shard.id}`);
})

manager.spawn();