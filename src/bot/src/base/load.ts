import { join } from 'path';
import { promises as fs } from 'fs';
import BaseEvent from './classes/baseEvent';
import BaseCommand from './classes/baseCommand';
import { Collection } from 'discord.js';
import Bot from './types/bot';
import BaseButton from './classes/baseButton';
import BaseCommandCategory, { isBaseCommandCategory } from './types/baseCommandCategory';
import BaseAutocompleteInteraction from './classes/baseAutocompleteInteraction';

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

async function loadCommands(commands: Collection<string, BaseCommand>, commadCategories: Array<BaseCommandCategory>, categoryCommandsMap: Map<BaseCommandCategory, Array<BaseCommand>>, dir: string, CurrentCategory?: BaseCommandCategory) {
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
		const RequiredFile = require(join(filePath, file)).default;
		if (!RequiredFile) continue;
		if (RequiredFile.prototype instanceof BaseCommand) {
			commandFiles.push(join(filePath, file));
		}
		if (isBaseCommandCategory(RequiredFile)) {
			_currentCategory = RequiredFile;
		}
	}
	for (const path of folders) {
		await loadCommands(commands, commadCategories, categoryCommandsMap, path, _currentCategory);
	}
	if (!_currentCategory || CurrentCategory) return;
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
		categoryCommandsMap
	}
}

async function loadButtonInteractions(buttonInteractions: Collection<string, BaseButton>, dir: string) {
	const filePath = join(__dirname, dir);
	const files = await fs.readdir(filePath);
	for (const file of files) {
		const stat = await fs.lstat(join(filePath, file));
		if (stat.isDirectory()) await loadButtonInteractions(buttonInteractions, join(dir, file));
		if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
		/* eslint-disable-next-line */
		const ButtonInteraction = require(join(filePath, file)).default;
		if (!ButtonInteraction) continue;
		if (ButtonInteraction.prototype instanceof BaseButton) {
			const buttonInteraction: BaseButton = new ButtonInteraction();
			buttonInteractions.set(buttonInteraction.id, buttonInteraction);
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

export { loadEvents, loadCommands, loadButtonInteractions, loadAutocompleteInteractions };