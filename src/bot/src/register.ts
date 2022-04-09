import './utils/paths'
import { config } from 'dotenv';
config();
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Collection } from 'discord.js';
import BaseCommand from '@base/classes/baseCommand';
import { loadCommands, loadMessageContextMenus, loadUserContextMenus } from '@base/load';
import BaseCommandCategory from '@base/types/baseCommandCategory';
import { SlashCommandBuilder } from '@discordjs/builders';
import { BaseUserContextMenu } from '@base/classes/baseUserContextMenu';
import { BaseMessageContextMenu } from '@base/classes/baseMessageContextMenu';

const Commands = new Collection<string, BaseCommand>();
const CommadCategories = new Array<BaseCommandCategory>();
const CommandsToCategoryMap = new Map<BaseCommandCategory, Array<BaseCommand>>();
const UserContextMenus = new Collection<string, BaseUserContextMenu>();
const MessageContextMenus = new Collection<string, BaseMessageContextMenu>();
//cant use RESTPostAPIApplicationCommandsJSONBody here because discord js version is nbot exacly the same as discord js rest version
const _commands = Array();
//cant use RESTPostAPIApplicationCommandsJSONBody here because discord js version is nbot exacly the same as discord js rest version
const _commandsGuildMap = new Map<string, Array<any>>();

(async () => {
	await loadCommands(Commands, CommadCategories, CommandsToCategoryMap, '../interactions/commands');
	console.log('[Register] Loaded Commands');
	await loadUserContextMenus(UserContextMenus, '../interactions/contextMenus');
	console.log('[Register] Loaded User Context Menus');
	await loadMessageContextMenus(MessageContextMenus, '../interactions/contextMenus');
	console.log('[Register] Loaded Message Context Menus');
	//initilizing array if in dev mode
	if (process.env.Environment == 'dev' && process.env.DISCORD_BOT_TEST_GUILD_ID) {
		_commandsGuildMap.set(process.env.DISCORD_BOT_TEST_GUILD_ID, []);
	}
	//Modifying the Options for the Help Command (Could do it on Runtime, but Precomputed is better)
	for (const command of Commands) {
		if (command[0] === 'help') {
			const options: Array<[name: string, value: string]> = [];
			for (const category of CommadCategories) {
				options.push([category.displayName, category.uniqueId]);
			}
			(command[1].data as SlashCommandBuilder).addStringOption((option) =>
				option
					.setName('category')
					.setRequired(true)
					.setDescription(
						'The category for which the commands should be displayed.'
					)
					.addChoices(options)
			);
		}
		if (process.env.Environment == 'dev' && process.env.DISCORD_BOT_TEST_GUILD_ID) {
			_commandsGuildMap.get(process.env.DISCORD_BOT_TEST_GUILD_ID).push(command[1].data);
			continue;
		}
		if (command[1].guilds.length > 0) {
			for (const guild of command[1].guilds) {
				if (!_commandsGuildMap.has(guild.toString())) {
					_commandsGuildMap.set(guild.toString(), []);
				}
				_commandsGuildMap.get(guild.toString()).push(command[1].data);
			}
			continue;
		}
		_commands.push(command[1].data.toJSON());
	}
	for (const contextMenu of UserContextMenus) {
		_commands.push(contextMenu[1].data.toJSON());
	}
	for (const contextMenu of MessageContextMenus) {
		_commands.push(contextMenu[1].data.toJSON());
	}
	const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);
	try {
		console.log('[Register] Started refreshing Commands');
		/* eslint-disable-next-line */
		const result = await rest.put(
			Routes.applicationCommands(process.env.DISCORD_BOT_ID),
			{ body: _commands },
		) as Array<unknown>;
		/*result.forEach((command) => {
			//search for command in _command
			if (Commands.find((c) => c.data.name === command.name).category == 'admin') {
				//TODO: add all commands that are inside the admin category to a list (ids) then make a put reqest to make them admin only
			}
		});
		*/
		for (const guildId of _commandsGuildMap.keys()) {
			const guildCommands = _commandsGuildMap.get(guildId);
			if (!guildCommands) continue;
			/* eslint-disable-next-line */
			const result = await rest.put(
				Routes.applicationGuildCommands(process.env.DISCORD_BOT_ID, guildId),
				{ body: guildCommands },
			) as Array<unknown>;
		}
		console.log('[Register] Successfully refreshed Commands');
	} catch (error) {
		console.error(error);
	}
	process.exit(0);
})();