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
        );
    }

    async execute(client: Client, interaction: CommandInteraction<CacheType>, options: Readonly<CommandInteractionOption<CacheType>[]>): Promise<void> {
        const category = client.commandCategories.find(c => c.uniqueId === options[0].value.toString());
        if (!category) {
            interaction.reply({
                content: 'This Category does not exist',
                ephemeral: true,
            });
            return;
        }
        if (client.CategoryCommandsMap.get(category).length <= 0) {
            interaction.reply({
                content: 'There are no Commands for this Category.',
                ephemeral: true,
            });
        }
        let fields: EmbedFieldData[] = [];
        for (const command of client.CategoryCommandsMap.get(category)) {
            fields.push({
                name: `__**${command.data.name}**__`,
                value: `${command.data.description}`,
            });
        }
        const embed = await Embeds.medium(
            EmbedType.NORMAL,
            `Help *-> ${category.displayName}*`,
            fields,
            client.client.user.avatarURL()
        );
        interaction.reply({ embeds: [embed] });
    }
}