import { config } from 'dotenv';
config();
import Client from './base/types/Client';
import { Client as DiscordClient, Collection, Intents } from 'discord.js';
import { loadEvents, loadCommands, loadButtonInteractions } from './base/Load';

const client = new Client(
    new DiscordClient({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGES
        ]
    })
);

import StateManager from '../base/StateManager';

async function main() {
    while (typeof (StateManager.connection) == 'undefined') {
        await new Promise(r => setTimeout(r, 500));
    }
    await loadEvents(client, '../events');
    console.log('[Bot] Loaded Events');
    await loadCommands(client.commands, client.commandCategories, client.CategoryCommandsMap, '../commands');
    console.log('[Bot] Loaded Commands');
    await loadButtonInteractions(client.buttonInteractions, '../buttonInteractions');
    console.log('[Bot] Loaded ButtonInteractions');
    await client.client.login(process.env.BOT_TOKEN);
    console.log(`[Bot] Logged in as ${client.client.user.tag}`);
}

export default main;