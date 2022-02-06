import { config } from 'dotenv';
config();
import Client from './types/Client';
import { Client as DiscordClient, Collection, Intents } from 'discord.js';
import { loadEvents, loadCommands } from './base/Load';
import BaseCommand from './base/classes/BaseCommand';

const client = new Client(
    new DiscordClient({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGES
        ]
    }),
    new Collection<string, BaseCommand>(),
    new Array<string>()
);

import StateManager from './base/StateManager';

async function main() {
    while (typeof (StateManager.connection) == 'undefined') {
        await new Promise(r => setTimeout(r, 500));
    }
    await loadEvents(client, '../events');
    console.log('[Index] Loaded Events');
    await loadCommands(client.commands, client.commadCategories, '../commands');
    console.log('[Index] Loaded Commands');
    await client.client.login(process.env.BOT_TOKEN);
    console.log(`[Index] Logged in as ${client.client.user.tag}`);
}

main();