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
	/**
	 * @param data - The Command itself, it's a new {@link SlashCommandBuilder}.
	 * @param cooldown - The cooldown for the command in Milliseconds.
	 * @param permissions - The permissions required to use the command. These will be merged with the {@link BaseCommandCategory | Category} permissions.
	 * @param guilds - The guilds The Command will be registered to. If not specified, it will be registered to all guilds. This wont work in The Dev Environment.
	 */
	constructor(data: SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'> | SlashCommandSubcommandsOnlyBuilder, cooldown?: number, permissions?: Array<PermissionResolvable>, guilds?: Array<GuildResolvable>) {
		this.data = data;
		this.cooldown = cooldown || 0;
		this.permissions = permissions || [];
		this.guilds = guilds || [];
	}
	/**
	 * This Function will be called when the Command is executed.
	 * @remarks Please use Async if possible.
	 * @param bot - The Bot Object itself {@link Bot} that stores a lot of useful information.
	 * @param interaction - The interaction that is being executed.
	 * @param options - The options for the command.
	 */
	abstract execute(bot: Bot, interaction: CommandInteraction<CacheType>, options: Readonly<Array<CommandInteractionOption<CacheType>>>): Promise<void>;
}