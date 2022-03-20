import { SlashCommandBuilder } from '@discordjs/builders';
import { ChannelType } from 'discord-api-types/v9';
import { CommandInteraction, CacheType, CommandInteractionOption } from 'discord.js';
import BaseCommand from '../../../../../base/classes/baseCommand';
import bot from '../../../../../base/types/bot';
import StateManager from '../../../../../base/stateManager';
import Embds from '../../../../../base/utils/embds';
import EmbdType from '../../../../../base/types/embdTypes';

const welcomeMessageTitles = new Map<string, string>();

export default class WelcomeMessageTitleCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('welcome-message-title')
                .setDescription('the command to set the welcome message title')
                .addStringOption(option =>
                    option
                        .setName('title')
                        .setRequired(true)
                        .setDescription('the title of the welcome message')
                ),
        )
    }

    async execute(bot: bot, interaction: CommandInteraction<CacheType>, options: readonly CommandInteractionOption<CacheType>[]): Promise<void> {
        //do all the needed stuff, dont forget to check if the strin is to long or contains sql injection
    }
}

StateManager.on('welcomeMessageTitleFetched', (guildId, title) => {
    welcomeMessageTitles.set(guildId, title);
});