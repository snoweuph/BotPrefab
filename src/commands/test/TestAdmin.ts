import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption } from 'discord.js';
import BaseCommand from '../../base/classes/BaseCommand';
import Client from '../../types/Client';

export default class TestAdminCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('testadmin')
                .setDescription('a command to test admin privileges'),
            5000
        );
    }

    async execute(client: Client, interaction: CommandInteraction<CacheType>, options: Readonly<CommandInteractionOption<CacheType>[]>): Promise<void> {
        interaction.reply('You have admin privileges');
    }
}