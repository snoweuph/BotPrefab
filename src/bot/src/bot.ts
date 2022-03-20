import { config } from 'dotenv';
config();
import Bot from './base/types/bot';
import { loadEvents, loadCommands, loadButtonInteractions, loadAutocompleteInteractions } from './base/load';
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
)

import StateManager from './base/stateManager';

async function main() {
	while (typeof (StateManager.connection) == 'undefined') {
		await new Promise(r => setTimeout(r, 500));
	}
	await loadEvents(bot, '../events');
	console.log('[Index] Loaded events');
	await loadCommands(bot.commands, bot.commandCategories, bot.CategoryCommandsMap, '../interactions/commands');
	console.log('[Index] Loaded commands');
	await loadButtonInteractions(bot.buttonInteractions, '../interactions/buttons');
	console.log('[Index] Loaded button interactions');
	await loadAutocompleteInteractions(bot.autocompleteInteractions, '../interactions/autocomplete');
	console.log('[Index] Loaded autocomplete interactions');
	await bot.client.login(process.env.DISCORD_BOT_TOKEN);
	console.log(`[Index] Logged in as ${bot.client.user.tag}`);
}

main();