import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption, Collection } from 'discord.js';
import BaseCommand from '../../../../base/classes/baseCommand';
import StateManager from '../../../../base/stateManager';
import bot from '../../../../base/types/bot';
import EmbdType from '../../../../base/types/embdTypes';
import Embds from '../../../../base/utils/embds';

const enableWelcomeMessageFeature = new Map<string, boolean>();
const enableGoodbyeMessageFeature = new Map<string, boolean>();

export default class FeatureEnableCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('feature-enable')
                .setDescription('this is used to enable or disable specific features of the bot')
                .addStringOption(option =>
                    option
                        .setName('feature')
                        .setRequired(true)
                        .setDescription('the feature to enable or disable')
                        .addChoices([
                            ['Welcome Message', 'welcome-message'],
                            ['Goodbye Message', 'goodbye-message'],
                        ])
                )
                .addBooleanOption(option =>
                    option
                        .setName('enable')
                        .setDescription('whether to enable or disable the feature')
                        .setRequired(true)
                ),
            2 * 1000,
        );
    }

    async execute(bot: bot, interaction: CommandInteraction<CacheType>, options: ReadonlyArray<CommandInteractionOption<CacheType>>): Promise<void> {

        let variableName: string;
        let noChanges = false;

        switch (options[0].value) {
            case 'welcome-message':
                variableName = 'enableFeatureWelcomeMessage';
                if (enableWelcomeMessageFeature.get(interaction.guild.id) === options[1].value) noChanges = true;
                break;
            case 'goodbye-message':
                variableName = 'enableFeatureGoodbyeMessage';
                if (enableGoodbyeMessageFeature.get(interaction.guild.id) === options[1].value) noChanges = true;
                break;
            default:
                return;
        }

        if (noChanges) {
            const embd = await Embds.short(
                EmbdType.WARNING,
                `**Not ${options[1].value ? 'Enabled' : 'Disabled'} Feature ${options[0].value}**`,
                `The feature is already ${options[1].value ? 'Enabled' : 'Disabled'}`,
            )
            interaction.reply({ ephemeral: true, embeds: [embd] });
            return;
        }

        try {
            await StateManager.connection.query(
                `UPDATE GuildSettings SET ${variableName} = '${options[1].value ? 1 : 0}' WHERE guildId = '${interaction.guild.id}'`
            )
            StateManager.emit(`${variableName}Fetched`, interaction.guild.id, options[1].value);
            const embd = await Embds.short(
                EmbdType.NORMAL,
                `**${options[1].value ? 'Enabled' : 'Disabled'} Feature ${options[0].value}**`,
                `Succesfully ${options[1].value ? 'Enabled' : 'Disabled'}!`
            )
            interaction.reply({ ephemeral: true, embeds: [embd] });
        } catch (error) {
            console.log(error);
            const embd = await Embds.short(
                EmbdType.ERROR,
                `**Not ${options[1].value ? 'Enabled' : 'Disabled'} Feature ${options[0].value}**`,
                `There was some unexpected error during the process, please try again later. if the problem persists, please contact the developer.`
            )
            interaction.reply({ ephemeral: true, embeds: [embd] });
        }
    }
}

StateManager.on('enableFeatureWelcomeMessageFetched', (guildId, enabled) => {
    enableWelcomeMessageFeature.set(guildId, enabled);
});
StateManager.on('enableFeatureGoodbyeMessageFetched', (guildId, enabled) => {
    enableGoodbyeMessageFeature.set(guildId, enabled);
});