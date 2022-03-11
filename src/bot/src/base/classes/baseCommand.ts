import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction, CommandInteractionOption } from 'discord.js';
import Bot from '../types/bot';
import BaseCommandCategory from '../types/baseCommandCategory';

export default abstract class BaseCommand {
	data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'> | SlashCommandSubcommandsOnlyBuilder;
	category: BaseCommandCategory;
	cooldown: number;

	constructor(data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'> | SlashCommandSubcommandsOnlyBuilder, cooldown?: number) {
		this.data = data;
		this.cooldown = cooldown || 0;
	}

	abstract execute(bot: Bot, interaction: CommandInteraction<CacheType>, options: Readonly<CommandInteractionOption<CacheType>[]>): Promise<void>;
}