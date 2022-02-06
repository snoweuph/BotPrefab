import { join } from 'path';
import { promises as fs } from 'fs';
import BaseEvent from './classes/BaseEvent';
import { Client } from 'discord.js';

async function loadEvents(client: Client<boolean>, dir: string) {
    const filePath = join(__dirname, dir);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(join(filePath, file));
        if (stat.isDirectory()) await loadEvents(client, join(dir, file));
        if (!(file.endsWith('.ts') || file.endsWith('.js'))) continue;
        const Event = require(join(filePath, file)).default;
        if (Event.prototype instanceof BaseEvent) {
            const event: BaseEvent = new Event();
            client.on(event.event, event.execute.bind(event, client));
        }
    }
}

export { loadEvents };