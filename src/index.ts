import { config } from 'dotenv';
config();
import { Client, Collection, Intents } from 'discord.js';
import { loadEvents } from './base/Load';

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
});

async function main() {
    await loadEvents(client, '../events');
    await client.login(process.env.BOT_TOKEN);
}

main();