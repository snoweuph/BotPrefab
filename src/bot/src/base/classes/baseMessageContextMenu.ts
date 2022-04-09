import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { ApplicationCommandType } from 'discord-api-types/v9';
import { CacheType, MessageContextMenuInteraction, PermissionResolvable } from 'discord.js';
import Bot from '@baseTypes/bot';
import BaseContextMenu from '@classes/baseContextMenu';

export abstract class BaseMessageContextMenu extends BaseContextMenu {
	/**
	 * @param name - The name of the context menu. This is used to identify the context menu. only lowercase letters, numbers, and underscores are allowed.
	 * @param cooldown - The cooldown of the context menu in milliseconds.
	 * @param permissions - An array of permissions that are required to use the context menu.
	 */
	constructor(name: string, cooldown?: number, permissions?: Array<PermissionResolvable>) {
		super(
			new ContextMenuCommandBuilder()
				.setName(name)
				// @ts-expect-error | @discordjs/builders is using a older version of discord-api-types, Instead of this, we could downgrade, but during reinstalling packages that can get out of sync
				.setType(ApplicationCommandType.Message),
			cooldown,
			permissions
		);
	}
	/**
	 * This Function will be called when the context menu is executed.
	 * @remarks Please use Async if possible.
	 * @param bot - The Bot Object itself {@link Bot} that stores a lot of useful information.
	 * @param interaction - The interaction that is being executed.
	 */
	abstract execute(bot: Bot, interaction: MessageContextMenuInteraction<CacheType>): Promise<void>;
}