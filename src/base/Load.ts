import { join } from 'path';
import { promises as fs } from 'fs';
import BaseEvent from './classes/BaseEvent';
import BaseCommand from './classes/BaseCommand';
import { Client as DiscordClient, Collection } from 'discord.js';
import Client from '../types/Client';
import BaseButtonInteraction from './classes/BaseButtonInteraction';
import BaseCommandCategory, { isBaseCommandCategory } from '../types/BaseCommandCategory';

async function loadEvents(client: Client, dir: string) {
    const filePath = join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(join(filePath, file));
        if (stat.isDirectory()) await loadEvents(client, join(dir, file));
        if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
        const Event = require(join(filePath, file)).default;
        if (!Event) continue;
        if (Event.prototype instanceof BaseEvent) {
            const event: BaseEvent = new Event();
            client.client.on(event.event, event.execute.bind(event, client));
        }
    }
}

async function loadCommands(commands: Collection<string, BaseCommand>, commadCategories: Array<BaseCommandCategory>, categoryCommandsMap: Map<BaseCommandCategory, Array<BaseCommand>>, dir: string, CurrentCategory?: BaseCommandCategory) {
    const filePath = join(__dirname, dir);
    const files = await fs.readdir(filePath);
    var folders = new Array<string>();
    var commandFiles = new Array<string>();
    let _currentCategory: any;
    for (const file of files) {
        const stat = await fs.lstat(join(filePath, file));
        if (stat.isDirectory()) folders.push(join(dir, file));
        if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
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

async function loadButtonInteractions(buttonInteractions: Collection<string, BaseButtonInteraction>, dir: string) {
    const filePath = join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(join(filePath, file));
        if (stat.isDirectory()) await loadButtonInteractions(buttonInteractions, join(dir, file));
        if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
        const ButtonInteraction = require(join(filePath, file)).default;
        if (!ButtonInteraction) continue;
        if (ButtonInteraction.prototype instanceof BaseButtonInteraction) {
            const buttonInteraction: BaseButtonInteraction = new ButtonInteraction();
            buttonInteractions.set(buttonInteraction.id, buttonInteraction);
        }
    }
}

export { loadEvents, loadCommands, loadButtonInteractions };