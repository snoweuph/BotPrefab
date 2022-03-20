import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { PermissionResolvable } from 'discord.js';

export default abstract class BaseContextMenu {
	data: ContextMenuCommandBuilder;
	cooldown: number;
	permissions: Array<PermissionResolvable>;

	constructor(data: ContextMenuCommandBuilder, cooldown?: number, permissions?: Array<PermissionResolvable>) {
		this.data = data;
		this.cooldown = cooldown || 0;
		this.permissions = permissions || [];
	}

    abstract isUserContextMenu(): boolean;
    abstract isMessageContextMenu(): boolean;
}