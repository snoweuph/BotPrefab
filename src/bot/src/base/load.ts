import { join } from 'path';
import { promises as fs } from 'fs';
import BaseEvent from '@classes/baseEvent';
import BaseCommand from '@classes/baseCommand';
import { Collection } from 'discord.js';
import Bot from '@baseTypes/bot';
import BaseButton from '@classes/baseButton';
import BaseCommandCategory, { isBaseCommandCategory } from '@baseTypes/baseCommandCategory';
import BaseAutocompleteInteraction from '@classes/baseAutocompleteInteraction';
import BaseSelectMenu from '@classes/baseSelectMenu';
import { BaseUserContextMenu } from '@classes/baseUserContextMenu';
import { BaseMessageContextMenu } from '@base/classes/baseMessageContextMenu';

async function loadEvents(bot: Bot, dir: string) {
	const filePath = join(__dirname, dir);
	const files = await fs.readdir(filePath);
	for (const file of files) {
		const stat = await fs.lstat(join(filePath, file));
		if (stat.isDirectory()) await loadEvents(bot, join(dir, file));
		if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
		/* eslint-disable-next-line */
		const Event = require(join(filePath, file)).default;
		if (!Event) continue;
		if (Event.prototype instanceof BaseEvent) {
			const event: BaseEvent = new Event();
			bot.client.on(event.event, event.execute.bind(event, bot));
		}
	}
}

async function loadCommands(commands: Collection<string, BaseCommand>, commadCategories: Array<BaseCommandCategory>, categoryCommandsMap: Map<BaseCommandCategory, Array<BaseCommand>>, dir: string, CurrentCategory?: BaseCommandCategory): Promise<number> {
	const filePath = join(__dirname, dir);
	const files = await fs.readdir(filePath);
	const folders = new Array<string>();
	const commandFiles = new Array<string>();
	let _currentCategory: BaseCommandCategory | undefined;
	for (const file of files) {
		const stat = await fs.lstat(join(filePath, file));
		if (stat.isDirectory()) folders.push(join(dir, file));
		if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
		/* eslint-disable-next-line */
		const RequiredFile = await require(join(filePath, file)).default;
		if (!RequiredFile) continue;
		if (RequiredFile.prototype instanceof BaseCommand) {
			commandFiles.push(join(filePath, file));
		}
		if (isBaseCommandCategory(RequiredFile)) {
			_currentCategory = RequiredFile;
		}
	}
	let code = 0;
	for (const path of folders) {
		const _code = await loadCommands(commands, commadCategories, categoryCommandsMap, path, _currentCategory || CurrentCategory);
		if (code != 1) code = _code;
	}
	if (!_currentCategory && !CurrentCategory) return;
	for (const file of commandFiles) {
		/* eslint-disable-next-line */
		const _RequiredFile = require(file).default;
		const command: BaseCommand = new _RequiredFile();
		command.category = _currentCategory || CurrentCategory;
		if (!commadCategories.find(category => category.uniqueId === command.category.uniqueId)) {
			commadCategories.push(command.category);
		}
		commands.set(command.data.name, command);
		if (!categoryCommandsMap.has(command.category)) categoryCommandsMap.set(command.category, new Array<BaseCommand>());
		categoryCommandsMap.get(command.category).push(command);
	}
	return code;
}

async function loadButtons(buttons: Collection<string, BaseButton>, dir: string) {
	const filePath = join(__dirname, dir);
	const files = await fs.readdir(filePath);
	for (const file of files) {
		const stat = await fs.lstat(join(filePath, file));
		if (stat.isDirectory()) await loadButtons(buttons, join(dir, file));
		if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
		/* eslint-disable-next-line */
		const ButtonInteraction = require(join(filePath, file)).default;
		if (!ButtonInteraction) continue;
		if (ButtonInteraction.prototype instanceof BaseButton) {
			const buttonInteraction: BaseButton = new ButtonInteraction();
			buttons.set(buttonInteraction.id, buttonInteraction);
		}
	}
}

async function loadSelectMenus(selectMenus: Collection<string, BaseSelectMenu>, dir: string) {
	const filePath = join(__dirname, dir);
	const files = await fs.readdir(filePath);
	for (const file of files) {
		const stat = await fs.lstat(join(filePath, file));
		if (stat.isDirectory()) await loadSelectMenus(selectMenus, join(dir, file));
		if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
		/* eslint-disable-next-line */
		const SelectMenu = require(join(filePath, file)).default;
		if (!SelectMenu) continue;
		if (SelectMenu.prototype instanceof BaseSelectMenu) {
			const selectMenu: BaseSelectMenu = new SelectMenu();
			selectMenus.set(selectMenu.id, selectMenu);
		}
	}
}

async function loadUserContextMenus(userContextMenus: Collection<string, BaseUserContextMenu>, dir: string) {
	const filePath = join(__dirname, dir);
	const files = await fs.readdir(filePath);
	for (const file of files) {
		const stat = await fs.lstat(join(filePath, file));
		if (stat.isDirectory()) await loadUserContextMenus(userContextMenus, join(dir, file));
		if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
		/* eslint-disable-next-line */
		const ContextMenu = require(join(filePath, file)).default;
		if (!ContextMenu) continue;
		if (ContextMenu.prototype instanceof BaseUserContextMenu) {
			const contextMenu: BaseUserContextMenu = new ContextMenu();
			userContextMenus.set(contextMenu.data.name, contextMenu);
		}
	}
}

async function loadMessageContextMenus(messageContextMenus: Collection<string, BaseMessageContextMenu>, dir: string) {
	const filePath = join(__dirname, dir);
	const files = await fs.readdir(filePath);
	for (const file of files) {
		const stat = await fs.lstat(join(filePath, file));
		if (stat.isDirectory()) await loadMessageContextMenus(messageContextMenus, join(dir, file));
		if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
		/* eslint-disable-next-line */
		const ContextMenu = require(join(filePath, file)).default;
		if (!ContextMenu) continue;
		if (ContextMenu.prototype instanceof BaseMessageContextMenu) {
			const contextMenu: BaseMessageContextMenu = new ContextMenu();
			messageContextMenus.set(contextMenu.data.name, contextMenu);
		}
	}
}

async function loadAutocompleteInteractions(autocompleteInteractions: Collection<string, BaseAutocompleteInteraction>, dir: string) {
	const filePath = join(__dirname, dir);
	const files = await fs.readdir(filePath);
	for (const file of files) {
		const stat = await fs.lstat(join(filePath, file));
		if (stat.isDirectory()) await loadAutocompleteInteractions(autocompleteInteractions, join(dir, file));
		if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
		/* eslint-disable-next-line */
		const AutocompleteInteraction = require(join(filePath, file)).default;
		if (!AutocompleteInteraction) continue;
		if (AutocompleteInteraction.prototype instanceof BaseAutocompleteInteraction) {
			const autocompleteInteraction: BaseAutocompleteInteraction = new AutocompleteInteraction();
			autocompleteInteractions.set(autocompleteInteraction.commandName, autocompleteInteraction);
		}
	}
}

export { loadEvents, loadCommands, loadButtons, loadSelectMenus, loadUserContextMenus, loadMessageContextMenus, loadAutocompleteInteractions };