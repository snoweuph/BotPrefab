import './utils/paths';
import { config } from 'dotenv';
config();
import Bot from '@base/types/bot';
import { loadEvents, loadCommands, loadButtons, loadSelectMenus, loadUserContextMenus, loadMessageContextMenus, loadAutocompleteInteractions } from '@base/load';
import { Client as DiscordClient, Intents } from 'discord.js';

const bot = new Bot(
	new DiscordClient({
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MEMBERS,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.DIRECT_MESSAGES
		]
	})
);
if (bot.client.shard) process.env.DISCORD_BOT_SHARD = bot.client.shard.ids.toString();
const prefix = process.env.DISCORD_BOT_SHARD ? `[Index:${process.env.DISCORD_BOT_SHARD}]: ` : '[Index]: ';

import StateManager from '@base/StateManager';

async function main() {
	while (typeof (StateManager.connection) == 'undefined') {
		await new Promise(r => setTimeout(r, 500));
	}
	await loadEvents(bot, '../events');
	console.log(`${prefix}Loaded events`);
	await loadCommands(bot.commands, bot.commandCategories, bot.categoryCommandsMap, '../interactions/commands');
	console.log(`${prefix}Loaded commands`);
	await loadButtons(bot.buttons, '../interactions/buttons');
	console.log(`${prefix}Loaded buttons`);
	await loadSelectMenus(bot.selectMenus, '../interactions/selectMenus');
	console.log(`${prefix}Loaded select menus`);
	await loadUserContextMenus(bot.userContextMenus, '../interactions/contextMenus');
	console.log(`${prefix}Loaded user context menus`);
	await loadMessageContextMenus(bot.messageContextMenus, '../interactions/contextMenus');
	console.log(`${prefix}Loaded message context menus`);
	await loadAutocompleteInteractions(bot.autocompleteInteractions, '../interactions/autocomplete');
	console.log(`${prefix}Loaded autocomplete interactions`);
	await bot.client.login(process.env.DISCORD_BOT_TOKEN);
	console.log(`${prefix}Logged in as ${bot.client.user.tag}`);
}

main();