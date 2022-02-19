import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, CacheType, CommandInteractionOption } from 'discord.js';
import BaseCommand from '../../base/classes/BaseCommand';
import { run } from '../../modules/PingModule';
import Client from '../../base/types/Client';

export default class PingCommand extends BaseCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName('ping')
                .setDescription('returns the latency of the bot.')
        );
    }

    async execute(client: Client, interaction: CommandInteraction<CacheType>, options: Readonly<CommandInteractionOption<CacheType>[]>): Promise<void> {
        await run(client.client, interaction);
    }
}