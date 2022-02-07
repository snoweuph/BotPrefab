import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption, EmbedFieldData } from 'discord.js';
import BaseCommand from '../../base/classes/BaseCommand';
import Client from '../../types/Client';
import Embeds from '../../utils/Embeds';
import EmbedType from '../../types/EmbedTypes';

export default class HelpCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('help')
                .setDescription('gives a list of all command functions.')
                .addStringOption((option) =>
                    option
                        .setName('category')
                        .setRequired(true)
                        .setDescription(
                            'The category for which the commands should be displayed.'
                        )
                        .addChoices([
                            ['Default', 'default']
                        ])
                ),
            'default'
        );
    }

    async execute(client: Client, interaction: CommandInteraction<CacheType>, options: Readonly<CommandInteractionOption<CacheType>[]>): Promise<void> {
        const category = options[0].value.toString();
        if (!client.commadCategories.includes(category)) {
            interaction.reply({
                content: 'This Category does not exist',
                ephemeral: true,
            });
            return;
        }
        let validCommandArray = [];
        for (const command of client.commands) {
            if (command[1].category == category) {
                validCommandArray.push(command);
            }
        }
        if (validCommandArray.length <= 0) {
            interaction.reply({
                content: 'There are no Commands for this Category.',
                ephemeral: true,
            });
        }
        let fields: EmbedFieldData[] = [];
        for (const command of validCommandArray) {
            fields.push({
                name: `__**${command[1].data.name}**__`,
                value: `${command[1].data.description}`,
            });
        }
        const TitleCategory = category.charAt(0).toUpperCase() + category.slice(1);
        const embed = await Embeds.medium(
            EmbedType.NORMAL,
            `Help *-> ${TitleCategory}*`,
            fields,
            client.client.user.avatarURL()
        );
        interaction.reply({ embeds: [embed] });
    }
}