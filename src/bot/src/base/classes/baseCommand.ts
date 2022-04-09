import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction, CommandInteractionOption, GuildResolvable, PermissionResolvable } from 'discord.js';
import Bot from '@baseTypes/bot';
import BaseCommandCategory from '@baseTypes/baseCommandCategory';

export default abstract class BaseCommand {
	data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'> | SlashCommandSubcommandsOnlyBuilder;
	category: BaseCommandCategory;
	cooldown: number;
	permissions: Array<PermissionResolvable>;
	guilds: Array<GuildResolvable>;
	constructor(data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'> | SlashCommandSubcommandsOnlyBuilder, cooldown?: number, permissions?: Array<PermissionResolvable>, guilds?: Array<GuildResolvable>) {
		this.data = data;
		this.cooldown = cooldown || 0;
		this.permissions = permissions || [];
		this.guilds = guilds || [];
	}

	abstract execute(bot: Bot, interaction: CommandInteraction<CacheType>, options: Readonly<Array<CommandInteractionOption<CacheType>>>): Promise<void>;
}