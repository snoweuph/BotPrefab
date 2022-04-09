import ContextMenuTypes from '@base/types/ContextMenuTypes';
import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { PermissionResolvable } from 'discord.js';

export default abstract class BaseContextMenu {
	data: ContextMenuCommandBuilder;
	cooldown: number;
	permissions: Array<PermissionResolvable>;
	/**
	 * @param data - The Context menu itself, it's a new {@link ContextMenuCommandBuilder}.
	 * @param cooldown - The cooldown for the Context menu in Milliseconds.
	 * @param permissions - The permissions required to use the Context menu.
	 */
	constructor(data: ContextMenuCommandBuilder, cooldown?: number, permissions?: Array<PermissionResolvable>) {
		this.data = data;
		this.cooldown = cooldown || 0;
		this.permissions = permissions || [];
	}

	/**
	 * This is used to Differentiate between the different Context Menus.
	 */
	abstract ContextMenuType(): ContextMenuTypes;
}