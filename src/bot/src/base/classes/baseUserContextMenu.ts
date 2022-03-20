import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { ApplicationCommandType } from 'discord-api-types/v9';
import { CacheType, PermissionResolvable, UserContextMenuInteraction } from 'discord.js';
import Bot from '../types/bot';
import BaseContextMenu from './baseContextMenu';

export abstract class BaseUserContextMenu extends BaseContextMenu {

	constructor(name: string, cooldown?: number, permissions?: Array<PermissionResolvable>) {
		super(
			new ContextMenuCommandBuilder()
				.setName(name)
				// @ts-expect-error | @discordjs/builders is using a older version of discord-api-types, Instead of this, we could downgrade, but during reinstalling packages that can get out of sync
				.setType(ApplicationCommandType.User),
			cooldown,
			permissions
		);
	}

	isUserContextMenu(): boolean { return true; }
	isMessageContextMenu(): boolean { return false; }

	abstract execute(bot: Bot, interaction: UserContextMenuInteraction<CacheType>): Promise<void>;
}