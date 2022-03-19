import { ButtonInteraction, CacheType, PermissionResolvable } from 'discord.js';
import Bot from '../types/bot';

export default abstract class BaseButtonInteraction {
	id: string;
	cooldown: number;
	permissions: Array<PermissionResolvable>;

	constructor(id: string, cooldown?: number, permissions?: Array<PermissionResolvable>) {
		this.id = id;
		this.cooldown = cooldown || 0;
		this.permissions = permissions || [];
	}

	abstract execute(bot: Bot, interaction: ButtonInteraction<CacheType>): Promise<void>;
}