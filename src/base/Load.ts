import { join } from 'path';
import { promises as fs } from 'fs';
import BaseEvent from './classes/BaseEvent';
import BaseCommand from './classes/BaseCommand';
import { Client as DiscordClient, Collection } from 'discord.js';
import Client from '../types/Client';

async function loadEvents(client: Client, dir: string) {
    const filePath = join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(join(filePath, file));
        if (stat.isDirectory()) await loadEvents(client, join(dir, file));
        if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
        const Event = require(join(filePath, file)).default;
        if (Event.prototype instanceof BaseEvent) {
            const event: BaseEvent = new Event();
            client.client.on(event.event, event.execute.bind(event, client));
        }
    }
}

async function loadCommands(commands: Collection<string, BaseCommand>, commadCategories: Array<string>, dir: string) {
    const filePath = join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(join(filePath, file));
        if (stat.isDirectory()) await loadCommands(commands, commadCategories, join(dir, file));
        if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
        const Command = require(join(filePath, file)).default;
        if (Command.prototype instanceof BaseCommand) {
            const command: BaseCommand = new Command();
            const category = command.category;
            if (!commadCategories.includes(category)) commadCategories.push(category);
            commands.set(command.data.name, command);
        }
    }
}

export { loadEvents, loadCommands };