import { config } from 'dotenv';
config();
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Collection } from 'discord.js';
import BaseCommand from './base/classes/baseCommand';
import { loadCommands, loadMessageContextMenus, loadUserContextMenus } from './base/load';
import BaseCommandCategory from './base/types/baseCommandCategory';
import { SlashCommandBuilder } from '@discordjs/builders';
import { BaseUserContextMenu } from './base/classes/baseUserContextMenu';
import { BaseMessageContextMenu } from './base/classes/baseMessageContextMenu ';

const Commands = new Collection<string, BaseCommand>();
const CommadCategories = new Array<BaseCommandCategory>();
const CommandsToCategoryMap = new Map<BaseCommandCategory, Array<BaseCommand>>();
const UserContextMenus = new Collection<string, BaseUserContextMenu>();
const MessageContextMenus = new Collection<string, BaseMessageContextMenu>();
const _commands = [];

(async () => {
	await loadCommands(Commands, CommadCategories, CommandsToCategoryMap, '../interactions/commands');
	console.log('[Register] Loaded Commands');
	await loadUserContextMenus(UserContextMenus, '../interactions/contextMenus');
	console.log('[Register] Loaded User Context Menus');
	await loadMessageContextMenus(MessageContextMenus, '../interactions/contextMenus');
	console.log('[Register] Loaded Message Context Menus');
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
		_commands.push(command[1].data.toJSON());
	}
	for (const contextMenu of UserContextMenus) {
		_commands.push(contextMenu[1].data.toJSON())
	}
	for (const contextMenu of MessageContextMenus) {
		_commands.push(contextMenu[1].data.toJSON())
	}
	const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);
	try {
		console.log('[Register] Started refreshing Commands');
		if (process.env.DISCORD_BOT_TEST_GUILD_ID) {
			/* eslint-disable-next-line */
			const result = await rest.put(
				Routes.applicationGuildCommands(process.env.DISCORD_BOT_ID, process.env.DISCORD_BOT_TEST_GUILD_ID),
				{ body: _commands },
			) as Array<unknown>;
			/*result.forEach((command) => {
				//search for command in _command
				if (Commands.find((c) => c.data.name === command.name).category == 'admin') {
					//TODO: add all commands that are inside the admin category to a list (ids) then make a put reqest to make them admin only
				}
			});
			*/
		} else {
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
		}
		console.log('[Register] Successfully refreshed Commands');
	} catch (error) {
		console.error(error);
	}
})();