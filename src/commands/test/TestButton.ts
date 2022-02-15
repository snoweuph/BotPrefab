import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption, MessageActionRow, MessageButton } from 'discord.js';
import BaseCommand from '../../base/classes/BaseCommand';
import Client from '../../types/Client';

export default class TestButtonCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('testbutton')
                .setDescription('send a test button')
        );
    }

    async execute(client: Client, interaction: CommandInteraction<CacheType>, options: Readonly<CommandInteractionOption<CacheType>[]>): Promise<void> {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('test-id')
                    .setLabel('Test Button')
                    .setStyle('PRIMARY'),
            );

        await interaction.reply({ content: 'Test!', components: [row] });
    }
}