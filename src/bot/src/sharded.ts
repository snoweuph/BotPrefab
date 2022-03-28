import { Shard } from "discord.js";

require('dotenv').config();
const DiscordJS = require('discord.js');

const manager = new DiscordJS.ShardingManager('./bot.ts', {
    token: process.env.DISCORD_BOT_TOKEN,

});

manager.on('shardCreate', (shard: Shard) => {
    console.log(`Launched shard ${shard.id}`);
})

manager.spawn();