import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction, CommandInteractionOption } from 'discord.js';
import Client from '../../types/Client';

export default abstract class BaseCommand {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'> | SlashCommandSubcommandsOnlyBuilder;
    category: string;
    cooldown: number;

    constructor(data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'> | SlashCommandSubcommandsOnlyBuilder, category: string, cooldown?: number) {
        this.data = data;
        this.category = category;
        this.cooldown = cooldown || 0;
    }

    abstract execute(client: Client, interaction: CommandInteraction<CacheType>, options: Readonly<CommandInteractionOption<CacheType>[]>): Promise<void>;
}