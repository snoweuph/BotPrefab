import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction, CommandInteractionOption, PermissionResolvable } from 'discord.js';
import Bot from '@baseTypes/bot';
import BaseCommandCategory from '@baseTypes/baseCommandCategory';

export default abstract class BaseCommand {
	data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'> | SlashCommandSubcommandsOnlyBuilder;
	category: BaseCommandCategory;
	cooldown: number;
	permissions: Array<PermissionResolvable>;

	constructor(data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'> | SlashCommandSubcommandsOnlyBuilder, cooldown?: number, permissions?: Array<PermissionResolvable>) {
		this.data = data;
		this.cooldown = cooldown || 0;
		this.permissions = permissions || [];
	}

	abstract execute(bot: Bot, interaction: CommandInteraction<CacheType>, options: Readonly<Array<CommandInteractionOption<CacheType>>>): Promise<void>;
}