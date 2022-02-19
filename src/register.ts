import { config } from 'dotenv';
config();
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Collection } from 'discord.js';
import BaseCommand from './base/classes/BaseCommand';
import { loadCommands } from './base/Load';
import BaseCommandCategory from './base/types/BaseCommandCategory';
import { SlashCommandStringOption } from '@discordjs/builders';
import { SlashCommandBuilder } from '@discordjs/builders';

const Commands = new Collection<string, BaseCommand>();
const CommadCategories = new Array<BaseCommandCategory>();
const CommandsToCategoryMap = new Map<BaseCommandCategory, Array<BaseCommand>>();
const _commands = new Array();

(async () => {
    await loadCommands(Commands, CommadCategories, CommandsToCategoryMap, '../commands');
    console.log('[Register] Loaded Commands');
    for (const command of Commands) {
        if (command[0] === 'help') {
            let options: [name: string, value: string][] = new Array();
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
    const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
    try {
        console.log('[Register] Started refreshing Commands');
        if (process.env.TEST_GUILD_ID) {
            const result = await rest.put(
                Routes.applicationGuildCommands(process.env.BOT_ID, process.env.TEST_GUILD_ID),
                { body: _commands },
            ) as Array<any>;
            /*result.forEach((command) => {
                //search for command in _command
                if (Commands.find((c) => c.data.name === command.name).category == 'admin') {
                    //TODO: add all commands that are inside the admin category to a list (ids) then make a put reqest to make them admin only
                }
            });
            */

        } else {
            const result = await rest.put(
                Routes.applicationCommands(process.env.BOT_ID),
                { body: _commands },
            ) as Array<any>;
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