import { config } from 'dotenv';
config();
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Collection } from 'discord.js';
import BaseCommand from './base/classes/BaseCommand';
import { loadCommands } from './base/Load';

const Commands = new Collection<string, BaseCommand>();
const CommadCategories = new Array<string>();
const _commands = new Array();

(async () => {
    await loadCommands(Commands, CommadCategories, '../commands');
    console.log('[Register] Loaded Commands');
    for (const command of Commands) {
        _commands.push(command[1].data.toJSON());
    }
    const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
    try {
        console.log('[Register] Started refreshing Commands');
        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID, process.env.TEST_GUILD_ID),
            { body: _commands },
        );
        console.log('[Register] Successfully refreshed Commands');
    } catch (error) {
        console.error(error);
    }
})();