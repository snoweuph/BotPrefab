import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { ApplicationCommandType } from 'discord-api-types/v9';
import { CacheType, MessageContextMenuInteraction, PermissionResolvable } from 'discord.js';
import Bot from '@baseTypes/bot';
import BaseContextMenu from '@classes/baseContextMenu';

export abstract class BaseMessageContextMenu extends BaseContextMenu {
	/**
	 * @param name - The Name of the Context Menu. This is used to identify the Context Menu. only lowercase letters, numbers, and underscores are allowed.
	 * @param cooldown - The Cooldown of the context menu in Milliseconds.
	 * @param permissions - An Array of permissions that are required to use the Context Menu.
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
	 * This Function will be called when the Context Menu is executed.
	 * @remarks Please use Async if possible.
	 * @param bot - The Bot Object itself {@link Bot} that stores a lot of useful data.
	 * @param interaction - The Interaction that is being executed.
	 */
	abstract execute(bot: Bot, interaction: MessageContextMenuInteraction<CacheType>): Promise<void>;
}