import { SlashCommandBuilder } from '@discordjs/builders';
import { ChannelType } from 'discord-api-types/v9';
import { CommandInteraction, CacheType, CommandInteractionOption } from 'discord.js';
import BaseCommand from '../../../../../base/classes/baseCommand';
import bot from '../../../../../base/types/bot';
import StateManager from '../../../../../base/stateManager';
import Embds from '../../../../../base/utils/embds';
import EmbdType from '../../../../../base/types/embdTypes';

const welcomeMessageChannels = new Map<string, string>();

export default class WelcomeMessageChannelCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('welcome-message-channel')
                .setDescription('the command to set the welcome message channel')
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('the channel to set the welcome message channel to')
                        .setRequired(true)
                        // @ts-expect-error | @discordjs/builders is using a older version of discord-api-types, Instead of this, we could downgrade, but during reinstalling packages that can get out of sync
                        .addChannelType(ChannelType.GuildText)
                )
        )
    }

    async execute(bot: bot, interaction: CommandInteraction<CacheType>, options: readonly CommandInteractionOption<CacheType>[]): Promise<void> {
        if (options[0].value == welcomeMessageChannels.get(interaction.guild.id)) {
            const embd = await Embds.short(
                EmbdType.WARNING,
                `**Not Changed**`,
                `The Channel is already set to <#${options[0].value}>`,
            )
            interaction.reply({ ephemeral: true, embeds: [embd] });
            return;
        }
        console.log(options[0].value)
        const querry = `UPDATE guilds SET welcomeMessageChannelId = '${options[0].value}' WHERE guildId = '${interaction.guild.id}'`;
        try {
            await StateManager.connection.query(querry);
            StateManager.emit('welcomeMessageChannelIdFetched', interaction.guild.id, options[0].value);
        } catch (error) {
            console.log(error);
            const embd = await Embds.short(
                EmbdType.ERROR,
                `**Error**`,
                `An error occured while trying to set the welcome message channel`,
            )
            interaction.reply({ ephemeral: true, embeds: [embd] });
        }
    }
}

StateManager.on('welcomeMessageChannelIdFetched', (guildId, channelId) => {
    welcomeMessageChannels.set(guildId, channelId);
});