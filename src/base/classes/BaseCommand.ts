import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction, CommandInteractionOption } from 'discord.js';
import Client from '../../types/Client';

export default abstract class BaseCommand {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>;
    category: string;

    constructor(data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>, category: string) {
        this.data = data;
        this.category = category;
    }

    abstract execute(client: Client, interaction: CommandInteraction<CacheType>, options: Readonly<CommandInteractionOption<CacheType>[]>): Promise<void>;
}